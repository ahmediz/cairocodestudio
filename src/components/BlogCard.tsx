import Image from 'next/image';
import Link from 'next/link';
import { BlogPostOutputDTO } from '@/features/blog/dtos/blogOutputDTO';

interface BlogCardProps {
  post: BlogPostOutputDTO;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="h-full flex flex-col bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <Link
        href={`/blog/category/${post.category.slug}`}
        className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary hover:underline w-fit"
      >
        {post.category.name}
      </Link>

      <Link href={`/blog/${post.slug}`}>
        <h3 className="mt-2 text-xl font-bold font-antonio text-gray-900 hover:text-primary transition-colors">
          {post.title}
        </h3>
      </Link>

      <p className="mt-2 mb-4 text-sm text-gray-600 line-clamp-3 flex-1">
        {post.excerpt}
      </p>

      <Link
        href={`/blog/${post.slug}`}
        className="text-sm font-semibold text-primary hover:underline"
      >
        Read more
      </Link>
    </article>
  );
}
