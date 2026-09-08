import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { apiClient } from '@/lib/apiClient';
import { UpdateSettingsInputDTO } from './dtos/settingsInputDTO';
import { SettingsOutputDTO } from './dtos/settingsOutputDTO';

export function useSettings() {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery<SettingsOutputDTO>({
    queryKey: ['settings'],
    queryFn: () => apiClient<SettingsOutputDTO>('/api/settings'),
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateSettingsInputDTO) =>
      apiClient<SettingsOutputDTO>('/api/settings', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Settings updated successfully!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to update settings');
    },
  });


  return {
    settings: settingsQuery.data,
    isLoading: settingsQuery.isLoading,
    isError: settingsQuery.isError,
    error: settingsQuery.error,
    updateSettings: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
