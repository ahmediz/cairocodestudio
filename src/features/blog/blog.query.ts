'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { BlogPostsPageDTO } from './dtos/blogOutputDTO';

const PAGE_SIZE = 9;

async function fetchPostsPage(
  page: number,
  categorySlug?: string
): Promise<BlogPostsPageDTO> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(PAGE_SIZE),
    activeOnly: 'true',
  });
  if (categorySlug) params.set('categorySlug', categorySlug);

  const res = await fetch(`/api/blog/posts?${params.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to load posts');
  }
  return res.json();
}

export function useBlogPostsInfinite(
  categorySlug?: string,
  initialPage?: BlogPostsPageDTO
) {
  return useInfiniteQuery({
    queryKey: ['blog-posts-infinite', categorySlug ?? 'all'],
    queryFn: ({ pageParam }) => fetchPostsPage(pageParam, categorySlug),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.page < last.totalPages ? last.page + 1 : undefined,
    initialData: initialPage
      ? { pages: [initialPage], pageParams: [1] }
      : undefined,
  });
}

export { PAGE_SIZE };
