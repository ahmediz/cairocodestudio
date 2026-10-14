import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostsInfinite } from '@/components/BlogPostsInfinite';
import { QueryProvider } from '@/components/providers/QueryProvider';
import {
  getBlogCategoryBySlug,
  getBlogPostsPage,
} from '@/features/blog/blog.service';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getBlogCategoryBySlug(slug);
  if (!category || !category.isActive) {
    return { title: 'Category not found | Cairo Code Studio' };
  }
  return {
    title: `${category.name} | Blog | Cairo Code Studio`,
    description: `Posts in ${category.name} from Cairo Code Studio.`,
  };
}

export const revalidate = 60;

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getBlogCategoryBySlug(slug);

  if (!category || !category.isActive) {
    notFound();
  }

  const firstPage = await getBlogPostsPage({
    page: 1,
    limit: 9,
    categorySlug: slug,
  });

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Category
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-antonio text-primary">
            {category.name}
          </h1>
        </div>

        <QueryProvider>
          <BlogPostsInfinite categorySlug={slug} initialPage={firstPage} />
        </QueryProvider>
      </div>
    </div>
  );
}
