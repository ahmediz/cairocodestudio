import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/ui/image-upload';
import { ProjectOutputDTO } from '../dtos/projectsOutputDTO';

const projectFormSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(5, 'Description is required'),
  image: z.string().min(1, 'Image path or URL is required'),
  link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  routerLink: z.string().optional(),
  isFeatured: z.boolean().default(false),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: ProjectOutputDTO | null;
  onSubmit: (data: ProjectFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export function ProjectDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isSubmitting,
}: ProjectDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      slug: '',
      title: '',
      description: '',
      image: '',
      link: '',
      routerLink: '',
      isFeatured: false,
      order: 0,
      isActive: true,
    },
  });

  const isFeatured = watch('isFeatured');
  const isActive = watch('isActive');

  useEffect(() => {
    if (initialData) {
      reset({
        slug: initialData.slug,
        title: initialData.title,
        description: initialData.description,
        image: initialData.image,
        link: initialData.link || '',
        routerLink: initialData.routerLink || '',
        isFeatured: initialData.isFeatured,
        order: initialData.order,
        isActive: initialData.isActive,
      });
    } else {
      reset({
        slug: '',
        title: '',
        description: '',
        image: '',
        link: '',
        routerLink: '',
        isFeatured: false,
        order: 0,
        isActive: true,
      });
    }
  }, [initialData, reset, open]);

  const handleFormSubmit = async (values: ProjectFormValues) => {
    try {
      await onSubmit(values);
      onOpenChange(false);
    } catch {
      // Toast error is handled by mutation in projects.query.ts
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Project' : 'Add Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-2 min-w-0 w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Project Title *</label>
              <Input placeholder="e.g. Ceel" {...register('title')} />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Slug (unique ID) *</label>
              <Input placeholder="e.g. ceel" {...register('slug')} />
              {errors.slug && (
                <p className="text-xs text-destructive">{errors.slug.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Description *</label>
            <Textarea
              rows={3}
              placeholder="Brief project summary..."
              {...register('description')}
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <ImageUpload
            label="Thumbnail Image *"
            folder="projects"
            value={watch('image')}
            onChange={(url) => setValue('image', url, { shouldValidate: true })}
            error={errors.image?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Live Website Link</label>
              <Input
                placeholder="https://example.com"
                {...register('link')}
              />
              {errors.link && (
                <p className="text-xs text-destructive">{errors.link.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Display Order</label>
              <Input
                type="number"
                {...register('order', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={isFeatured}
                onCheckedChange={(checked) => setValue('isFeatured', checked)}
              />
              <span className="text-sm font-medium">
                {isFeatured ? 'Featured on Home' : 'Normal'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={isActive}
                onCheckedChange={(checked) => setValue('isActive', checked)}
              />
              <span className="text-sm font-medium">
                {isActive ? 'Active (Published)' : 'Hidden'}
              </span>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
