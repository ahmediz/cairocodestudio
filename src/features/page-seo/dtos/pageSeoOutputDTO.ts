export type PageSeoKey =
  | 'home'
  | 'about'
  | 'services'
  | 'projects'
  | 'blog'
  | 'contact'
  | 'faq'
  | 'privacy-policy'
  | 'terms-and-conditions'
  | 'cookie-policy';

export interface PageSeoOutputDTO {
  id: string;
  pageKey: PageSeoKey;
  label: string;
  path: string;
  title: string;
  description: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}
