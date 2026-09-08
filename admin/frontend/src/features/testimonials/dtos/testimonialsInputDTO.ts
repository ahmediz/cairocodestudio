export interface CreateTestimonialInputDTO {
  name: string;
  company: string;
  description: string;
  rating?: number;
  logo: string;
  logoAlt?: string;
  order?: number;
  isActive?: boolean;
}

export type UpdateTestimonialInputDTO = Partial<CreateTestimonialInputDTO>;
