import { HomeSection } from '@/components/HomeSection';

interface ProjectTechPillsProps {
  items: string[];
}

export function ProjectTechPills({ items }: ProjectTechPillsProps) {
  if (items.length === 0) return null;

  return (
    <HomeSection title="Built with">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
          >
            {item}
          </span>
        ))}
      </div>
    </HomeSection>
  );
}
