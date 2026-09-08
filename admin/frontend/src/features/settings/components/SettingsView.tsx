import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Share2,
  Save,
  Loader2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSettings } from '../settings.query';
import { UpdateSettingsInputDTO } from '../dtos/settingsInputDTO';


const optionalUrl = z
  .string()
  .trim()
  .url('Must be a valid URL starting with http:// or https://')
  .optional()
  .or(z.literal(''))
  .nullable();

const settingsSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().min(1, 'Phone number is required'),
  whatsapp: z.string().trim().optional().or(z.literal('')).nullable(),
  address: z.string().trim().min(1, 'Address is required'),
  workingHours: z.string().trim().optional().or(z.literal('')).nullable(),
  facebook: optionalUrl,
  instagram: optionalUrl,
  linkedin: optionalUrl,
  twitter: optionalUrl,
  github: optionalUrl,
  behance: optionalUrl,
  dribbble: optionalUrl,
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export function SettingsView() {
  const { settings, isLoading, updateSettings, isUpdating } = useSettings();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      email: '',
      phone: '',
      whatsapp: '',
      address: '',
      workingHours: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      twitter: '',
      github: '',
      behance: '',
      dribbble: '',
    },
  });

  useEffect(() => {
    if (settings) {
      reset({
        email: settings.email || '',
        phone: settings.phone || '',
        whatsapp: settings.whatsapp || '',
        address: settings.address || '',
        workingHours: settings.workingHours || '',
        facebook: settings.facebook || '',
        instagram: settings.instagram || '',
        linkedin: settings.linkedin || '',
        twitter: settings.twitter || '',
        github: settings.github || '',
        behance: settings.behance || '',
        dribbble: settings.dribbble || '',
      });
    }
  }, [settings, reset]);

  const onSubmit = async (values: SettingsFormValues) => {
    const payload: UpdateSettingsInputDTO = {
      email: values.email,
      phone: values.phone,
      whatsapp: values.whatsapp || null,
      address: values.address,
      workingHours: values.workingHours || null,
      facebook: values.facebook || null,
      instagram: values.instagram || null,
      linkedin: values.linkedin || null,
      twitter: values.twitter || null,
      github: values.github || null,
      behance: values.behance || null,
      dribbble: values.dribbble || null,
    };

    try {
      await updateSettings(payload);
    } catch {
      // Toast notification is automatically emitted by the query mutation
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Loading site settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-antonio tracking-tight text-gray-900">
            Contact & Social Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your company contact details and active social profile links displayed across the website.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isUpdating}
          className="gap-2 shrink-0 shadow-sm"
        >
          {isUpdating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Contact Information Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Mail className="h-5 w-5" />
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </div>
            <CardDescription>
              Primary communication channels displayed on the contact page and website.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  Primary Email *
                </label>
                <Input
                  placeholder="e.g. hello@cairocodestudio.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  Primary Phone *
                </label>
                <Input
                  placeholder="e.g. +201000 60 9719"
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  WhatsApp Number (Optional)
                </label>
                <Input
                  placeholder="e.g. +201000609719"
                  {...register('whatsapp')}
                />
                {errors.whatsapp && (
                  <p className="text-xs text-destructive">{errors.whatsapp.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  Working Hours (Optional)
                </label>
                <Input
                  placeholder="e.g. Sun - Thu: 9:00 AM - 6:00 PM"
                  {...register('workingHours')}
                />
                {errors.workingHours && (
                  <p className="text-xs text-destructive">{errors.workingHours.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                Office Address *
              </label>
              <Input
                placeholder="e.g. Nasr City, Cairo, Egypt"
                {...register('address')}
              />
              {errors.address && (
                <p className="text-xs text-destructive">{errors.address.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Share2 className="h-5 w-5" />
              <CardTitle className="text-lg">Social Media & Online Presence</CardTitle>
            </div>
            <CardDescription>
              Links to your official social profiles. Leave any platform empty if you do not wish to display it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  Facebook URL
                </label>
                <Input
                  placeholder="https://www.facebook.com/..."
                  {...register('facebook')}
                />
                {errors.facebook && (
                  <p className="text-xs text-destructive">{errors.facebook.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  Instagram URL
                </label>
                <Input
                  placeholder="https://www.instagram.com/..."
                  {...register('instagram')}
                />
                {errors.instagram && (
                  <p className="text-xs text-destructive">{errors.instagram.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  LinkedIn URL
                </label>
                <Input
                  placeholder="https://www.linkedin.com/company/..."
                  {...register('linkedin')}
                />
                {errors.linkedin && (
                  <p className="text-xs text-destructive">{errors.linkedin.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  X (Twitter) URL
                </label>
                <Input
                  placeholder="https://x.com/..."
                  {...register('twitter')}
                />
                {errors.twitter && (
                  <p className="text-xs text-destructive">{errors.twitter.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  GitHub URL
                </label>
                <Input
                  placeholder="https://github.com/..."
                  {...register('github')}
                />
                {errors.github && (
                  <p className="text-xs text-destructive">{errors.github.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  Behance URL
                </label>
                <Input
                  placeholder="https://www.behance.net/..."
                  {...register('behance')}
                />
                {errors.behance && (
                  <p className="text-xs text-destructive">{errors.behance.message}</p>
                )}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  Dribbble URL
                </label>
                <Input
                  placeholder="https://dribbble.com/..."
                  {...register('dribbble')}
                />
                {errors.dribbble && (
                  <p className="text-xs text-destructive">{errors.dribbble.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Save Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isUpdating || !isDirty}
            className="gap-2 px-6 shadow-sm"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
