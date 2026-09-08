import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useClients } from '../clients.query';
import { ClientOutputDTO } from '../dtos/clientsOutputDTO';
import { ClientDialog } from './ClientDialog';

export function ClientsView() {
  const {
    clients,
    isLoading,
    createClient,
    isCreating,
    updateClient,
    isUpdating,
    deleteClient,
  } = useClients();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientOutputDTO | null>(
    null
  );

  const handleEdit = (item: ClientOutputDTO) => {
    setSelectedClient(item);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedClient(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      await deleteClient(id);
    }
  };

  const handleSubmit = async (values: any) => {
    if (selectedClient) {
      await updateClient({ id: selectedClient.id, data: values });
    } else {
      await createClient(values);
    }
  };

  const columns: ColumnDef<ClientOutputDTO>[] = [
    {
      accessorKey: 'name',
      header: 'Client Name',
      cell: ({ row }) => (
        <div className="font-semibold text-gray-900">{row.original.name}</div>
      ),
    },
    {
      accessorKey: 'logo',
      header: 'Logo Path',
      cell: ({ row }) => (
        <span className="font-mono text-xs text-gray-500">{row.original.logo}</span>
      ),
    },
    {
      accessorKey: 'alt',
      header: 'Alt Text',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {row.original.alt || '—'}
        </span>
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
          <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
          <p className="text-sm text-muted-foreground">
            Manage client logos featured in the "Clients we're proud we've worked with" scroll bar.
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Client
        </Button>
      </div>

      {isLoading ? (
        <div className="h-32 flex items-center justify-center text-muted-foreground">
          Loading clients...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={clients}
          searchKey="name"
          searchPlaceholder="Search client by name..."
        />
      )}

      <ClientDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialData={selectedClient}
        onSubmit={handleSubmit}
        isSubmitting={isCreating || isUpdating}
      />
    </div>
  );
}
