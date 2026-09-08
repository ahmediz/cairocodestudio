import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: 'projects' | 'clients' | 'testimonials' | string;
  label?: string;
  error?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = 'uploads',
  label = 'Image (Uploaded to Neon & Optimized to AVIF)',
  error,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isManualInput, setIsManualInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

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
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setUploadError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    setUploadError(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
          {label}
          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
            <Sparkles className="h-2.5 w-2.5" /> AVIF
          </span>
        </label>
        <button
          type="button"
          onClick={() => setIsManualInput(!isManualInput)}
          className="text-xs text-muted-foreground hover:text-primary underline"
        >
          {isManualInput ? 'Upload file instead' : 'Enter URL / path manually'}
        </button>
      </div>

      {isManualInput ? (
        <div className="space-y-1">
          <Input
            placeholder="https://... or /images/..."
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
          <p className="text-[11px] text-muted-foreground">
            Direct path or CDN URL
          </p>
        </div>
      ) : value ? (
        <div className="relative rounded-xl border border-gray-200 p-2 bg-gray-50 flex items-center gap-3">
          <div className="relative h-16 w-20 rounded-lg overflow-hidden bg-white border shrink-0 flex items-center justify-center">
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
          <div className="flex-1 min-w-0">
            <div className="text-xs font-mono text-gray-800 truncate">
              {value}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Stored on Neon Object Storage (.avif)
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
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
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
              <div className="text-xs font-medium text-gray-600">
                Converting to AVIF & uploading to Neon Storage...
              </div>
            </div>
          ) : (
            <>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Upload className="h-4 w-4" />
              </div>
              <div className="text-xs font-semibold text-gray-800">
                Click to upload image
              </div>
              <div className="text-[11px] text-gray-500">
                PNG, JPG, WebP (Automatically converted to AVIF)
              </div>
            </>
          )}
        </div>
      )}

      {(error || uploadError) && (
        <p className="text-xs text-destructive">
          {error || uploadError}
        </p>
      )}
    </div>
  );
}
