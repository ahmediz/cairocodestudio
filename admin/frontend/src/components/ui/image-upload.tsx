import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Sparkles, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: 'projects' | 'clients' | 'testimonials' | string;
  label?: string;
  error?: string;
}

const getFileName = (url: string): string => {
  try {
    const raw = url.split('/').pop() || url;
    return decodeURIComponent(raw);
  } catch {
    return url;
  }
};

export function ImageUpload({
  value,
  onChange,
  folder = 'uploads',
  label = 'Image (Uploaded to Neon & Optimized to AVIF)',
  error,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isManualInput, setIsManualInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`/api/upload?folder=${encodeURIComponent(folder)}`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to upload image');
      }

      const data = await res.json();
      onChange(data.url);
      toast.success('Image uploaded and optimized to AVIF!');
    } catch (err: unknown) {
      console.error('Image upload failed:', err);
      const message = err instanceof Error ? err.message : 'Image upload failed. Please try again.';
      toast.error(message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };


  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="space-y-2 w-full min-w-0">
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 truncate">
          {label}
          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full shrink-0">
            <Sparkles className="h-2.5 w-2.5" /> AVIF
          </span>
        </label>
        <button
          type="button"
          onClick={() => setIsManualInput(!isManualInput)}
          className="text-xs text-muted-foreground hover:text-primary underline shrink-0"
        >
          {isManualInput ? 'Upload file instead' : 'Enter URL / path manually'}
        </button>
      </div>

      {isManualInput ? (
        <div className="space-y-1 w-full min-w-0">
          <Input
            placeholder="https://... or /images/..."
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full"
          />
          <p className="text-[11px] text-muted-foreground">
            Direct path or CDN URL
          </p>
        </div>
      ) : value ? (
        <div className="relative rounded-xl border border-gray-200 p-2.5 bg-gray-50 flex items-center gap-3 w-full min-w-0 overflow-hidden">
          <div className="relative h-16 w-20 rounded-lg overflow-hidden bg-white border shrink-0 flex items-center justify-center shadow-xs">
            <img
              src={value}
              alt="Uploaded preview"
              className="h-full w-full object-contain p-1"
              onError={(e) => {
                // If relative path not resolved locally, show placeholder icon
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <ImageIcon className="h-6 w-6 text-gray-300 absolute -z-10" />
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <div
              className="text-xs font-semibold text-gray-900 truncate"
              title={getFileName(value)}
            >
              {getFileName(value)}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Sparkles className="h-3 w-3 text-emerald-600 shrink-0" />
              <span className="text-[10px] text-emerald-600 font-medium truncate">
                Neon S3 / AVIF Optimized
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-gray-200/60 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive shrink-0"
              title="Remove image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 hover:border-primary rounded-xl p-4 text-center cursor-pointer transition-colors bg-white hover:bg-gray-50 flex flex-col items-center justify-center gap-1.5"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-1.5 py-2">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
              <div className="text-xs font-medium text-gray-700">
                Optimizing to AVIF & Uploading to Neon...
              </div>
            </div>
          ) : (
            <>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Upload className="h-4 w-4" />
              </div>
              <div className="text-xs font-medium text-gray-800">
                Click to choose image
              </div>
              <div className="text-[10px] text-muted-foreground">
                PNG, JPG, WebP (Automatically converted to AVIF)
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
