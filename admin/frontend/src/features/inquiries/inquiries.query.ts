import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { UpdateInquiryStatusInputDTO } from './dtos/inquiriesInputDTO';
import { InquiryOutputDTO } from './dtos/inquiriesOutputDTO';

export function useInquiries() {
  const queryClient = useQueryClient();

  const inquiriesQuery = useQuery<InquiryOutputDTO[]>({
    queryKey: ['inquiries'],
    queryFn: () => apiClient<InquiryOutputDTO[]>('/api/inquiries'),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateInquiryStatusInputDTO;
    }) =>
      apiClient<InquiryOutputDTO>(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient<{ success: boolean }>(`/api/inquiries/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });

  return {
    inquiries: inquiriesQuery.data ?? [],
    isLoading: inquiriesQuery.isLoading,
    isError: inquiriesQuery.isError,
    error: inquiriesQuery.error,
    updateStatus: updateStatusMutation.mutateAsync,
    isUpdatingStatus: updateStatusMutation.isPending,
    deleteInquiry: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
