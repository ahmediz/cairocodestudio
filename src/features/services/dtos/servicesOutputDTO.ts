export interface ServiceBenefit {
  title: string;
  description: string;
  image: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  bullets: string[];
  image: string;
}

export interface ServiceStep {
  title: string;
  description: string;
  image: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServiceOutputDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroImage: string;
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: ServiceBenefit[];
  features: ServiceFeature[];
  processTitle: string;
  processIntro: string;
  howItWorks: ServiceStep[];
  statsTitle: string;
  statsIntro: string;
  stats: ServiceStat[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesPageDTO {
  items: ServiceOutputDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
