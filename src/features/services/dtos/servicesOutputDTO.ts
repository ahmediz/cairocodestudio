export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceOutputDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  overview: string;
  includedItems: string[];
  howItWorks: ServiceStep[];
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
