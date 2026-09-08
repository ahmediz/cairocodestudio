export interface SettingsOutputDTO {
  id: string;
  email: string;
  phone: string;
  whatsapp?: string | null;
  address: string;
  workingHours?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  github?: string | null;
  behance?: string | null;
  dribbble?: string | null;
  createdAt: string;
  updatedAt: string;
}
