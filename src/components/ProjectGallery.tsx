import Image from 'next/image';
import { ProjectGalleryItem } from '@/features/projects/dtos/projectsOutputDTO';
import { HomeSection } from '@/components/HomeSection';

interface ProjectGalleryProps {
  items: ProjectGalleryItem[];
}

export function ProjectGallery({ items }: ProjectGalleryProps) {
  if (items.length === 0) return null;

  const mosaic = items.length > 1;

  return (
    <HomeSection
      title="Selected screens"
      className="bg-gray-50 border-y border-gray-100"
    >
      <div
        className={
          mosaic
            ? 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full'
            : 'w-full'
        }
      >
        {items.map((item, index) => (
          <div
            key={`${item.image}-${index}`}
            className={`relative w-full overflow-hidden rounded-3xl bg-gray-100 ${
              mosaic && index === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[16/10]'
            }`}
          >
            <Image
              src={item.image}
              alt={item.alt || 'Project screenshot'}
              fill
              className="object-cover"
              sizes={
                mosaic && index === 0
                  ? '100vw'
                  : '(max-width: 768px) 100vw, 50vw'
              }
            />
          </div>
        ))}
      </div>
    </HomeSection>
  );
}
