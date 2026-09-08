import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTestimonials } from '../testimonials.query';
import { TestimonialOutputDTO } from '../dtos/testimonialsOutputDTO';
import { TestimonialDialog } from './TestimonialDialog';

export function TestimonialsView() {
  const {
    testimonials,
    isLoading,
    createTestimonial,
    isCreating,
    updateTestimonial,
    isUpdating,
    deleteTestimonial,
  } = useTestimonials();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<TestimonialOutputDTO | null>(null);

  const handleEdit = (item: TestimonialOutputDTO) => {
    setSelectedTestimonial(item);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedTestimonial(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      await deleteTestimonial(id);
    }
  };

  const handleSubmit = async (values: any) => {
    if (selectedTestimonial) {
      await updateTestimonial({ id: selectedTestimonial.id, data: values });
    } else {
      await createTestimonial(values);
    }
  };

  const columns: ColumnDef<TestimonialOutputDTO>[] = [
    {
      accessorKey: 'name',
      header: 'Client Name',
      cell: ({ row }) => (
        <div>
          <div className="font-semibold text-gray-900">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">{row.original.company}</div>
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Quote',
      cell: ({ row }) => (
        <p className="max-w-md line-clamp-2 text-sm text-gray-600">
          "{row.original.description}"
        </p>
      ),
    },
    {
      accessorKey: 'logo',
      header: 'Logo',
      cell: ({ row }) => (
        <div className="flex items-center gap-2 max-w-[180px]">
          <div className="h-8 w-8 rounded border bg-gray-50 shrink-0 overflow-hidden flex items-center justify-center">
            <img
              src={row.original.logo}
              alt={row.original.name}
              className="h-full w-full object-contain p-0.5"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <span
            className="font-mono text-xs text-gray-500 truncate block flex-1"
            title={row.original.logo}
          >
            {row.original.logo}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-xs font-semibold">
          {row.original.rating}
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        </div>
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
          {row.original.isActive ? 'Active' : 'Hidden'}
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
          <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-sm text-muted-foreground">
            Manage customer feedback displayed in the "Trusted Clients" section on the website.
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      {isLoading ? (
        <div className="h-32 flex items-center justify-center text-muted-foreground">
          Loading testimonials...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={testimonials}
          searchKey="name"
          searchPlaceholder="Search by client name..."
        />
      )}

      <TestimonialDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialData={selectedTestimonial}
        onSubmit={handleSubmit}
        isSubmitting={isCreating || isUpdating}
      />
    </div>
  );
}
