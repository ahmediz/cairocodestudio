export interface InquiryOutputDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'contact' | 'lets_talk' | string;
  status: 'pending' | 'contacted' | 'closed' | string;
  createdAt: string;
  updatedAt: string;
}
