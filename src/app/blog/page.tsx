import React from 'react';
import { Metadata } from 'next';
import { BlogPostsInfinite } from '@/components/BlogPostsInfinite';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { getBlogPostsPage } from '@/features/blog/blog.service';

export const metadata: Metadata = {
  title: 'Blog | Cairo Code Studio',
  description:
    'Insights, product engineering notes, and updates from Cairo Code Studio.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const firstPage = await getBlogPostsPage({ page: 1, limit: 9 });

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold font-antonio text-primary">
            Blog
          </h1>
          <p className="text-gray-600 text-lg">
            Practical notes on building modern web and mobile products.
          </p>
        </div>

        <QueryProvider>
          <BlogPostsInfinite initialPage={firstPage} />
        </QueryProvider>
      </div>
    </div>
  );
}
