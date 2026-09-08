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
import { TestimonialOutputDTO } from '../dtos/testimonialsOutputDTO';

const testimonialFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  description: z.string().min(5, 'Description quote must be at least 5 characters'),
  rating: z.number().min(1).max(5).default(5),
  logo: z.string().min(1, 'Logo is required'),
  logoAlt: z.string().optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

interface TestimonialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: TestimonialOutputDTO | null;
  onSubmit: (data: TestimonialFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export function TestimonialDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isSubmitting,
}: TestimonialDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: '',
      company: '',
      description: '',
      rating: 5,
      logo: '',
      logoAlt: '',
      order: 0,
      isActive: true,
    },
  });

  const isActive = watch('isActive');

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        company: initialData.company,
        description: initialData.description,
        rating: initialData.rating,
        logo: initialData.logo,
        logoAlt: initialData.logoAlt || '',
        order: initialData.order,
        isActive: initialData.isActive,
      });
    } else {
      reset({
        name: '',
        company: '',
        description: '',
        rating: 5,
        logo: '',
        logoAlt: '',
        order: 0,
        isActive: true,
      });
    }
  }, [initialData, reset, open]);

  const handleFormSubmit = async (values: TestimonialFormValues) => {
    try {
      await onSubmit(values);
      onOpenChange(false);
    } catch {
      // Toast error is handled by mutation in testimonials.query.ts
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Testimonial' : 'Add Testimonial'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-2 min-w-0 w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Client Name *</label>
              <Input placeholder="e.g. Mridul Pandey" {...register('name')} />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Company *</label>
              <Input placeholder="e.g. Secugile" {...register('company')} />
              {errors.company && (
                <p className="text-xs text-destructive">{errors.company.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Quote / Testimonial *</label>
            <Textarea
              rows={3}
              placeholder="Client feedback and recommendation..."
              {...register('description')}
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <ImageUpload
            label="Client Logo *"
            folder="testimonials"
            value={watch('logo')}
            onChange={(url) => setValue('logo', url, { shouldValidate: true })}
            error={errors.logo?.message}
          />

          <div className="space-y-1">
            <label className="text-sm font-medium">Logo Alt</label>
            <Input placeholder="e.g. Secugile Logo" {...register('logoAlt')} />
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="space-y-1">
              <label className="text-sm font-medium">Display Order</label>
              <Input
                type="number"
                {...register('order', { valueAsNumber: true })}
              />
            </div>
            <div className="flex items-center space-x-2 pt-5">
              <Switch
                checked={isActive}
                onCheckedChange={(checked) => setValue('isActive', checked)}
              />
              <span className="text-sm font-medium">
                {isActive ? 'Active (Visible)' : 'Hidden'}
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
