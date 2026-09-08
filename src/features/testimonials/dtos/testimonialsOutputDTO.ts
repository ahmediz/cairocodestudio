export interface TestimonialOutputDTO {
  id: string;
  name: string;
  company: string;
  description: string;
  rating: number;
  logo: string;
  logoAlt: string | null;
  order: number;
  isActive: boolean;
}
