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
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/ui/image-upload';
import { ClientOutputDTO } from '../dtos/clientsOutputDTO';

const clientFormSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
  logo: z.string().min(1, 'Logo URL or filename is required'),
  alt: z.string().optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

interface ClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: ClientOutputDTO | null;
  onSubmit: (data: ClientFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export function ClientDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isSubmitting,
}: ClientDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: '',
      logo: '',
      alt: '',
      order: 0,
      isActive: true,
    },
  });

  const isActive = watch('isActive');

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        logo: initialData.logo,
        alt: initialData.alt || '',
        order: initialData.order,
        isActive: initialData.isActive,
      });
    } else {
      reset({
        name: '',
        logo: '',
        alt: '',
        order: 0,
        isActive: true,
      });
    }
  }, [initialData, reset, open]);

  const handleFormSubmit = async (values: ClientFormValues) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Client' : 'Add Client'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Client Name *</label>
            <Input placeholder="e.g. King Faisal Hospital" {...register('name')} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <ImageUpload
            label="Client Logo *"
            folder="clients"
            value={watch('logo')}
            onChange={(url) => setValue('logo', url, { shouldValidate: true })}
            error={errors.logo?.message}
          />

          <div className="space-y-1">
            <label className="text-sm font-medium">Alt Text</label>
            <Input placeholder="e.g. King Faisal Hospital Logo" {...register('alt')} />
          </div>

          <div className="grid grid-cols-2 gap-4 items-center pt-2">
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
                {isActive ? 'Active' : 'Hidden'}
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
