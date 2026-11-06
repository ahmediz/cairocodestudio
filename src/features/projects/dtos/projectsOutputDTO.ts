export interface ProjectGalleryItem {
  image: string;
  alt: string;
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectOutputDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  link: string | null;
  isFeatured: boolean;
  order: number;
  isActive: boolean;
  client: string;
  industry: string;
  year: string;
  role: string;
  challengeTitle: string;
  challengeBody: string;
  challengeImage: string;
  solutionTitle: string;
  solutionBody: string;
  solutionImage: string;
  solutionBullets: string[];
  gallery: ProjectGalleryItem[];
  techStack: string[];
  stats: ProjectStat[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  createdAt?: string;
  updatedAt?: string;
}
