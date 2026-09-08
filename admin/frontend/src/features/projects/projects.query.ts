import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { CreateProjectInputDTO, UpdateProjectInputDTO } from './dtos/projectsInputDTO';
import { ProjectOutputDTO } from './dtos/projectsOutputDTO';

export function useProjects() {
  const queryClient = useQueryClient();

  const projectsQuery = useQuery<ProjectOutputDTO[]>({
    queryKey: ['projects'],
    queryFn: () => apiClient<ProjectOutputDTO[]>('/api/projects'),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateProjectInputDTO) =>
      apiClient<ProjectOutputDTO>('/api/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectInputDTO }) =>
      apiClient<ProjectOutputDTO>(`/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient<{ success: boolean }>(`/api/projects/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    projects: projectsQuery.data ?? [],
    isLoading: projectsQuery.isLoading,
    isError: projectsQuery.isError,
    error: projectsQuery.error,
    createProject: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateProject: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteProject: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
