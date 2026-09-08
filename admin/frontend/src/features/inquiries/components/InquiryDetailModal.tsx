import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, Tag } from 'lucide-react';
import { InquiryOutputDTO } from '../dtos/inquiriesOutputDTO';

interface InquiryDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inquiry: InquiryOutputDTO | null;
  onUpdateStatus: (id: string, status: 'pending' | 'contacted' | 'closed') => Promise<void>;
  isUpdating: boolean;
}

export function InquiryDetailModal({
  open,
  onOpenChange,
  inquiry,
  onUpdateStatus,
  isUpdating,
}: InquiryDetailModalProps) {
  if (!inquiry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <DialogTitle className="text-xl">{inquiry.subject}</DialogTitle>
            <Badge
              variant={
                inquiry.status === 'contacted'
                  ? 'success'
                  : inquiry.status === 'closed'
                  ? 'secondary'
                  : 'warning'
              }
            >
              {inquiry.status.toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-3">
          <div className="rounded-lg bg-gray-50 p-3 space-y-2 border">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-900">{inquiry.name}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(inquiry.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
              <a
                href={`mailto:${inquiry.email}`}
                className="flex items-center gap-1 hover:text-primary underline"
              >
                <Mail className="h-3.5 w-3.5" />
                {inquiry.email}
              </a>
              <a
                href={`tel:${inquiry.phone}`}
                className="flex items-center gap-1 hover:text-primary underline"
              >
                <Phone className="h-3.5 w-3.5" />
                {inquiry.phone}
              </a>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Tag className="h-3.5 w-3.5" />
                Type: {inquiry.type === 'lets_talk' ? "Let's Talk Modal" : 'Contact Form'}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Message
            </label>
            <div className="rounded-md border p-3 text-sm text-gray-800 bg-white min-h-[100px] whitespace-pre-wrap">
              {inquiry.message}
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Update Status
            </label>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={inquiry.status === 'pending' ? 'default' : 'outline'}
                disabled={isUpdating || inquiry.status === 'pending'}
                onClick={() => onUpdateStatus(inquiry.id, 'pending')}
              >
                Pending
              </Button>
              <Button
                size="sm"
                variant={inquiry.status === 'contacted' ? 'default' : 'outline'}
                disabled={isUpdating || inquiry.status === 'contacted'}
                onClick={() => onUpdateStatus(inquiry.id, 'contacted')}
              >
                Contacted
              </Button>
              <Button
                size="sm"
                variant={inquiry.status === 'closed' ? 'default' : 'outline'}
                disabled={isUpdating || inquiry.status === 'closed'}
                onClick={() => onUpdateStatus(inquiry.id, 'closed')}
              >
                Closed
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
