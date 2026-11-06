interface ProjectQuoteProps {
  quote: string;
  author: string;
  role: string;
}

export function ProjectQuote({ quote, author, role }: ProjectQuoteProps) {
  if (!quote.trim()) return null;

  return (
    <section className="py-12 md:py-20 bg-gray-50 border-y border-gray-100">
      <figure className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <blockquote className="text-2xl md:text-3xl font-antonio font-bold leading-snug text-gray-900">
          “{quote}”
        </blockquote>
        {(author || role) && (
          <figcaption className="text-sm text-gray-600">
            {author}
            {author && role ? ' · ' : ''}
            {role}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
