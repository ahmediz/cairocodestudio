import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import crypto from "crypto";

function isValidRevalidationSecret(providedSecret: string | null): boolean {
  const expectedSecret = process.env.REVALIDATION_SECRET?.replace(/^["']|["']$/g, "").trim();
  if (!expectedSecret || !providedSecret) {
    return false;
  }

  const cleanProvided = providedSecret.replace(/^["']|["']$/g, "").trim();
  const providedBuffer = Buffer.from(cleanProvided);
  const expectedBuffer = Buffer.from(expectedSecret);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
}

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get("x-revalidate-secret");

    if (!isValidRevalidationSecret(secret)) {
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
  const secret = request.headers.get("x-revalidate-secret");
  const tag = request.nextUrl.searchParams.get("tag");
  const path = request.nextUrl.searchParams.get("path");

  if (!isValidRevalidationSecret(secret)) {
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
