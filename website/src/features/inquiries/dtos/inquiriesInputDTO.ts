export interface ContactSubmissionInputDTO {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type?: 'contact' | 'lets_talk';
}

export interface ContactSubmissionResponseDTO {
  success: boolean;
  message: string;
  inquiryId?: string;
}
