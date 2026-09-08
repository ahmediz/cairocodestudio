export interface ProjectOutputDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  link: string | null;
  routerLink: string | null;
  isFeatured: boolean;
  order: number;
  isActive: boolean;
}
