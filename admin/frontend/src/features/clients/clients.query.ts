import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { apiClient } from '@/lib/apiClient';
import { CreateClientInputDTO, UpdateClientInputDTO } from './dtos/clientsInputDTO';
import { ClientOutputDTO } from './dtos/clientsOutputDTO';

export function useClients() {
  const queryClient = useQueryClient();

  const clientsQuery = useQuery<ClientOutputDTO[]>({
    queryKey: ['clients'],
    queryFn: () => apiClient<ClientOutputDTO[]>('/api/clients'),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateClientInputDTO) =>
      apiClient<ClientOutputDTO>('/api/clients', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client created successfully!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to create client');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClientInputDTO }) =>
      apiClient<ClientOutputDTO>(`/api/clients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client updated successfully!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to update client');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient<{ success: boolean }>(`/api/clients/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client deleted successfully!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to delete client');
    },
  });


  return {
    clients: clientsQuery.data ?? [],
    isLoading: clientsQuery.isLoading,
    isError: clientsQuery.isError,
    error: clientsQuery.error,
    createClient: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateClient: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteClient: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
