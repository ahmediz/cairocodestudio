import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '../projects.query';
import { ProjectOutputDTO } from '../dtos/projectsOutputDTO';
import { ProjectDialog } from './ProjectDialog';

export function ProjectsView() {
  const {
    projects,
    isLoading,
    createProject,
    isCreating,
    updateProject,
    isUpdating,
    deleteProject,
  } = useProjects();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectOutputDTO | null>(
    null
  );

  const handleEdit = (item: ProjectOutputDTO) => {
    setSelectedProject(item);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedProject(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  const handleSubmit = async (values: any) => {
    if (selectedProject) {
      await updateProject({ id: selectedProject.id, data: values });
    } else {
      await createProject(values);
    }
  };

  const columns: ColumnDef<ProjectOutputDTO>[] = [
    {
      accessorKey: 'title',
      header: 'Title & Slug',
      cell: ({ row }) => (
        <div>
          <div className="font-semibold text-gray-900">{row.original.title}</div>
          <div className="font-mono text-xs text-muted-foreground">
            {row.original.slug}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <p className="max-w-xs line-clamp-2 text-sm text-gray-600">
          {row.original.description}
        </p>
      ),
    },
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) => (
        <span className="font-mono text-xs text-gray-500 truncate max-w-[120px] block">
          {row.original.image}
        </span>
      ),
    },
    {
      accessorKey: 'link',
      header: 'Live Link',
      cell: ({ row }) =>
        row.original.link ? (
          <a
            href={row.original.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Visit <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        ),
    },
    {
      accessorKey: 'isFeatured',
      header: 'Featured',
      cell: ({ row }) => (
        <Badge variant={row.original.isFeatured ? 'default' : 'outline'}>
          {row.original.isFeatured ? 'Featured' : 'Standard'}
        </Badge>
      ),
    },
    {
      accessorKey: 'order',
      header: 'Order',
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? 'success' : 'secondary'}>
          {row.original.isActive ? 'Published' : 'Hidden'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(row.original)}
            className="h-8 w-8 p-0"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects (Our Portfolio)</h2>
          <p className="text-sm text-muted-foreground">
            Manage agency projects displayed in "Our Portfolio" section and page.
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Project
        </Button>
      </div>

      {isLoading ? (
        <div className="h-32 flex items-center justify-center text-muted-foreground">
          Loading projects...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={projects}
          searchKey="title"
          searchPlaceholder="Search projects by title..."
        />
      )}

      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialData={selectedProject}
        onSubmit={handleSubmit}
        isSubmitting={isCreating || isUpdating}
      />
    </div>
  );
}
