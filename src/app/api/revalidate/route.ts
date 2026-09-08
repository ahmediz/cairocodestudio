import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const rawSecret =
      request.headers.get("x-revalidate-secret") ||
      request.nextUrl.searchParams.get("secret");
    const secret = rawSecret ? rawSecret.replace(/^["']|["']$/g, "").trim() : "";

    const rawExpected =
      process.env.REVALIDATION_SECRET ||
      "5b18345512118c9686bd6367cfcde95d0b3ad4c7699279b14ac3ae5c719751c3";
    const expectedSecret = rawExpected.replace(/^["']|["']$/g, "").trim();

    if (!secret || secret !== expectedSecret) {
      return NextResponse.json(
        { error: "Invalid or missing revalidation secret token" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { tags, tag, paths, path } = body;

    const tagsToRevalidate: string[] = [];
    if (Array.isArray(tags)) {
      tagsToRevalidate.push(...tags.filter((t): t is string => typeof t === "string" && t.trim().length > 0));
    } else if (typeof tag === "string" && tag.trim()) {
      tagsToRevalidate.push(tag.trim());
    }

    for (const t of tagsToRevalidate) {
      try {
        revalidateTag(t);
      } catch (err) {
        console.error(`Error revalidating tag "${t}":`, err);
      }
    }

    const pathsToRevalidate: string[] = [];
    if (Array.isArray(paths)) {
      pathsToRevalidate.push(...paths.filter((p): p is string => typeof p === "string" && p.trim().length > 0));
    } else if (typeof path === "string" && path.trim()) {
      pathsToRevalidate.push(path.trim());
    }

    for (const p of pathsToRevalidate) {
      try {
        revalidatePath(p);
      } catch (err) {
        console.error(`Error revalidating path "${p}":`, err);
      }
    }

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      paths: pathsToRevalidate,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation handler error:", error);
    return NextResponse.json(
      { error: "Failed to process revalidation request" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const rawSecret = request.nextUrl.searchParams.get("secret");
  const secret = rawSecret ? rawSecret.replace(/^["']|["']$/g, "").trim() : "";
  const tag = request.nextUrl.searchParams.get("tag");
  const path = request.nextUrl.searchParams.get("path");

  const rawExpected =
    process.env.REVALIDATION_SECRET ||
    "5b18345512118c9686bd6367cfcde95d0b3ad4c7699279b14ac3ae5c719751c3";
  const expectedSecret = rawExpected.replace(/^["']|["']$/g, "").trim();

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json(
      { error: "Invalid or missing revalidation secret token" },
      { status: 401 }
    );
  }

  if (tag) {
    try {
      revalidateTag(tag);
    } catch (err) {
      console.error(`Error revalidating tag "${tag}":`, err);
    }
  }

  if (path) {
    try {
      revalidatePath(path);
    } catch (err) {
      console.error(`Error revalidating path "${path}":`, err);
    }
  }

  return NextResponse.json({
    revalidated: true,
    tag: tag || null,
    path: path || null,
    timestamp: Date.now(),
  });
}
