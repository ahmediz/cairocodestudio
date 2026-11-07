export interface FaqItemOutputDTO {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  showOnHome: boolean;
  showOnServicePages: boolean;
  showOnProjectPages: boolean;
  showOnBlogPages: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type FaqPlacement = 'home' | 'services' | 'projects' | 'blog';
