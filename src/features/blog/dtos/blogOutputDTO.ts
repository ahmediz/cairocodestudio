export interface BlogCategoryOutputDTO {
  id: string;
  name: string;
  slug: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostCategoryRef {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface BlogPostOutputDTO {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  categoryId: string;
  category: BlogPostCategoryRef;
  order: number;
  isActive: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostsPageDTO {
  items: BlogPostOutputDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
