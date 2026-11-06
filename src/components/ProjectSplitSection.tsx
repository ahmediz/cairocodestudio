import Image from 'next/image';

interface ProjectSplitSectionProps {
  title: string;
  body: string;
  image?: string;
  bullets?: string[];
  imageFirst?: boolean;
}

export function ProjectSplitSection({
  title,
  body,
  image,
  bullets = [],
  imageFirst = false,
}: ProjectSplitSectionProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <article className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {image ? (
            <div className={imageFirst ? undefined : 'md:order-2'}>
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100 shadow-sm">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          ) : null}
          <div className={`space-y-4 ${image && imageFirst ? 'md:order-2' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-extrabold font-antonio text-gray-900">
              {title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {body}
            </p>
            {bullets.length > 0 && (
              <ul className="space-y-2 list-disc ps-5 text-gray-600">
                {bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
