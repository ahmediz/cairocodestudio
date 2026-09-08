import { fetchServer } from '@/lib/api';
import { SettingsOutputDTO } from './dtos/settingsOutputDTO';

const defaultSettings: SettingsOutputDTO = {
  id: 'default',
  email: 'hello@cairocodestudio.com',
  phone: '+201000 60 9719',
  whatsapp: '+201000609719',
  address: 'Nasr City, Cairo, Egypt',
  workingHours: 'Sun - Thu: 9:00 AM - 6:00 PM',
  facebook: 'https://www.facebook.com/cairocodestudio',
  instagram: 'https://www.instagram.com/cairocodestudio',
  linkedin: 'https://www.linkedin.com/company/cairo-code-studio/',
  twitter: null,
  github: null,
  behance: null,
  dribbble: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export async function getSettings(): Promise<SettingsOutputDTO> {
  try {
    const settings = await fetchServer<SettingsOutputDTO>('/api/settings', {
      revalidate: 60,
      tags: ['settings'],
    });
    return settings || defaultSettings;
  } catch (error) {
    console.error('Failed to get settings from API, using default settings:', error);
    return defaultSettings;
  }
}
