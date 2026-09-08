export interface CreateClientInputDTO {
  name: string;
  logo: string;
  alt?: string | null;
  order?: number;
  isActive?: boolean;
}

export type UpdateClientInputDTO = Partial<CreateClientInputDTO>;
