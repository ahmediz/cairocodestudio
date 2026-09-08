import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Trash2 } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useInquiries } from '../inquiries.query';
import { InquiryOutputDTO } from '../dtos/inquiriesOutputDTO';
import { InquiryDetailModal } from './InquiryDetailModal';

export function InquiriesView() {
  const {
    inquiries,
    isLoading,
    updateStatus,
    isUpdatingStatus,
    deleteInquiry,
  } = useInquiries();

  const [selectedInquiry, setSelectedInquiry] = useState<InquiryOutputDTO | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleView = (item: InquiryOutputDTO) => {
    setSelectedInquiry(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      await deleteInquiry(id);
    }
  };

  const handleUpdateStatus = async (
    id: string,
    status: 'pending' | 'contacted' | 'closed'
  ) => {
    const updated = await updateStatus({ id, data: { status } });
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(updated);
    }
  };

  const columns: ColumnDef<InquiryOutputDTO>[] = [
    {
      accessorKey: 'name',
      header: 'Sender',
      cell: ({ row }) => (
        <div>
          <div className="font-semibold text-gray-900">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.phone}</span>
      ),
    },
    {
      accessorKey: 'subject',
      header: 'Subject & Message',
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-sm text-gray-900 truncate max-w-xs">
            {row.original.subject}
          </div>
          <div className="text-xs text-muted-foreground truncate max-w-xs">
            {row.original.message}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Source',
      cell: ({ row }) => (
        <Badge variant="outline" className="text-xs">
          {row.original.type === 'lets_talk' ? "Let's Talk" : 'Contact Form'}
        </Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            variant={
              status === 'contacted'
                ? 'success'
                : status === 'closed'
                ? 'secondary'
                : 'warning'
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
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
            onClick={() => handleView(row.original)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
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
          <h2 className="text-2xl font-bold tracking-tight">Inquiries & Leads</h2>
          <p className="text-sm text-muted-foreground">
            View submissions from the Contact Us page and the "Let's Talk" modal.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="h-32 flex items-center justify-center text-muted-foreground">
          Loading inquiries...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={inquiries}
          searchKey="name"
          searchPlaceholder="Search by sender name..."
        />
      )}

      <InquiryDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        inquiry={selectedInquiry}
        onUpdateStatus={handleUpdateStatus}
        isUpdating={isUpdatingStatus}
      />
    </div>
  );
}
