interface ProjectMetaStripProps {
  client: string;
  industry: string;
  year: string;
  role: string;
}

export function ProjectMetaStrip({
  client,
  industry,
  year,
  role,
}: ProjectMetaStripProps) {
  const items = [
    { label: 'Client', value: client },
    { label: 'Industry', value: industry },
    { label: 'Year', value: year },
    { label: 'Role', value: role },
  ].filter((item) => item.value.trim().length > 0);

  if (items.length === 0) return null;

  return (
    <section className="border-y border-gray-100 bg-white">
      <dl className="max-w-7xl mx-auto px-4 py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.label} className="space-y-1">
            <dt className="text-xs font-semibold uppercase tracking-wide text-primary">
              {item.label}
            </dt>
            <dd className="text-sm md:text-base font-medium text-gray-900">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
