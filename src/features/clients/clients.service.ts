import { fetchServer } from '@/lib/api';
import { ClientOutputDTO } from './dtos/clientsOutputDTO';

export async function getClients(): Promise<ClientOutputDTO[]> {
  try {
    return await fetchServer<ClientOutputDTO[]>('/api/clients?activeOnly=true', {
      revalidate: 60, // Cache for 60 seconds
      tags: ['clients'],
    });
  } catch (error) {
    console.error('Failed to get clients from API:', error);
    return [];
  }
}
