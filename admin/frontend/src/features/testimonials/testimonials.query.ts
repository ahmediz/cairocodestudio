import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { CreateTestimonialInputDTO, UpdateTestimonialInputDTO } from './dtos/testimonialsInputDTO';
import { TestimonialOutputDTO } from './dtos/testimonialsOutputDTO';

export function useTestimonials() {
  const queryClient = useQueryClient();

  const testimonialsQuery = useQuery<TestimonialOutputDTO[]>({
    queryKey: ['testimonials'],
    queryFn: () => apiClient<TestimonialOutputDTO[]>('/api/testimonials'),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateTestimonialInputDTO) =>
      apiClient<TestimonialOutputDTO>('/api/testimonials', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTestimonialInputDTO }) =>
      apiClient<TestimonialOutputDTO>(`/api/testimonials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient<{ success: boolean }>(`/api/testimonials/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });

  return {
    testimonials: testimonialsQuery.data ?? [],
    isLoading: testimonialsQuery.isLoading,
    isError: testimonialsQuery.isError,
    error: testimonialsQuery.error,
    createTestimonial: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateTestimonial: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteTestimonial: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
