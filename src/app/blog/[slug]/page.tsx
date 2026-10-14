import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/features/blog/blog.service';
import { sanitizeBlogHtml } from '@/lib/sanitizeHtml';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post || !post.isActive) {
    return { title: 'Post not found | Cairo Code Studio' };
  }
  return {
    title: `${post.title} | Cairo Code Studio`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: 'article',
    },
  };
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.isActive) {
    notFound();
  }

  const safeBody = sanitizeBlogHtml(post.body);

  return (
    <article className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <div className="space-y-4">
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="text-xs font-semibold uppercase tracking-wide text-primary hover:underline"
          >
            {post.category.name}
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold font-antonio text-gray-900">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600">{post.excerpt}</p>
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt}
              className="block text-sm text-gray-400"
            >
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: safeBody }}
        />

        <div className="pt-8 border-t">
          <Link
            href="/blog"
            className="text-sm font-semibold text-primary hover:underline"
          >
            ← Back to blog
          </Link>
        </div>
      </div>
    </article>
  );
}
