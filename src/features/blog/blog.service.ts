import { fetchServer } from '@/lib/api';
import {
  BlogCategoryOutputDTO,
  BlogPostOutputDTO,
  BlogPostsPageDTO,
} from './dtos/blogOutputDTO';

export async function getBlogPostsPage(options: {
  page: number;
  limit?: number;
  categorySlug?: string;
}): Promise<BlogPostsPageDTO> {
  const limit = options.limit ?? 9;
  const params = new URLSearchParams({
    page: String(options.page),
    limit: String(limit),
    activeOnly: 'true',
  });
  if (options.categorySlug) {
    params.set('categorySlug', options.categorySlug);
  }

  try {
    return await fetchServer<BlogPostsPageDTO>(
      `/api/blog/posts?${params.toString()}`,
      {
        revalidate: 60,
        tags: options.categorySlug
          ? ['blog', 'blog-posts', options.categorySlug]
          : ['blog', 'blog-posts'],
      }
    );
  } catch (error) {
    console.error('Failed to get blog posts:', error);
    return { items: [], total: 0, page: options.page, limit, totalPages: 1 };
  }
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostOutputDTO | null> {
  try {
    return await fetchServer<BlogPostOutputDTO>(`/api/blog/posts/${slug}`, {
      revalidate: 60,
      tags: ['blog', 'blog-posts', slug],
    });
  } catch (error) {
    console.error(`Failed to get blog post (${slug}):`, error);
    return null;
  }
}

export async function getBlogCategoryBySlug(
  slug: string
): Promise<BlogCategoryOutputDTO | null> {
  try {
    return await fetchServer<BlogCategoryOutputDTO>(
      `/api/blog/categories/${slug}`,
      {
        revalidate: 60,
        tags: ['blog', 'blog-categories', slug],
      }
    );
  } catch (error) {
    console.error(`Failed to get blog category (${slug}):`, error);
    return null;
  }
}

export async function getBlogCategories(): Promise<BlogCategoryOutputDTO[]> {
  try {
    return await fetchServer<BlogCategoryOutputDTO[]>(
      '/api/blog/categories?activeOnly=true',
      {
        revalidate: 60,
        tags: ['blog', 'blog-categories'],
      }
    );
  } catch (error) {
    console.error('Failed to get blog categories:', error);
    return [];
  }
}

/** Fetches every active post across pages (API max limit is 50). */
export async function getAllActiveBlogPosts(): Promise<BlogPostOutputDTO[]> {
  const limit = 50;
  const firstPage = await getBlogPostsPage({ page: 1, limit });
  const posts = [...firstPage.items];

  for (let page = 2; page <= firstPage.totalPages; page++) {
    const nextPage = await getBlogPostsPage({ page, limit });
    posts.push(...nextPage.items);
  }

  return posts;
}
