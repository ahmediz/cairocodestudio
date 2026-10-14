'use client';

import React, { useEffect, useRef } from 'react';
import { BlogCard } from '@/components/BlogCard';
import { useBlogPostsInfinite } from '@/features/blog/blog.query';
import { BlogPostsPageDTO } from '@/features/blog/dtos/blogOutputDTO';

interface BlogPostsInfiniteProps {
  categorySlug?: string;
  initialPage: BlogPostsPageDTO;
}

export function BlogPostsInfinite({
  categorySlug,
  initialPage,
}: BlogPostsInfiniteProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useBlogPostsInfinite(categorySlug, initialPage);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const posts = data?.pages.flatMap((p) => p.items) ?? [];

  if (isError && posts.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        Could not load posts. Please try again later.
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">No posts yet.</div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      <div ref={sentinelRef} className="h-8 flex items-center justify-center">
        {isFetchingNextPage && (
          <span className="text-sm text-gray-500">Loading more…</span>
        )}
      </div>
    </div>
  );
}
