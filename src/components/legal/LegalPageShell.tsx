import React from 'react';

interface LegalPageShellProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPageShell({
  title,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <div className="py-12 md:py-20">
      <article className="max-w-3xl mx-auto px-4">
        <header className="space-y-3 mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold font-antonio text-primary">
            {title}
          </h1>
          <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
        </header>
        <div className="legal-content space-y-8 text-gray-700 leading-relaxed">
          {children}
        </div>
      </article>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold font-antonio text-gray-900">{title}</h2>
      {children}
    </section>
  );
}
