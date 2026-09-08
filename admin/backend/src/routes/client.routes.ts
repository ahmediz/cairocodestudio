import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { createClientSchema, updateClientSchema } from '../schemas/client.schema.js';

export const clientRouter = Router();

// GET all clients (optional filter: activeOnly)
clientRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { activeOnly } = req.query;
    const where = activeOnly === 'true' ? { isActive: true } : {};
    const clients = await prisma.client.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(clients);
  } catch (error) {
    console.error('Failed to get clients:', error);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

// GET single client
clientRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: req.params.id },
    });
    if (!client) {
      res.status(404).json({ error: 'Client not found' });
      return;
    }
    res.json(client);
  } catch (error) {
    console.error('Failed to get client:', error);
    res.status(500).json({ error: 'Failed to fetch client' });
  }
});

// CREATE client
clientRouter.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = createClientSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }
    const client = await prisma.client.create({
      data: parsed.data,
    });
    res.status(201).json(client);
  } catch (error) {
    console.error('Failed to create client:', error);
    res.status(500).json({ error: 'Failed to create client' });
  }
});

// UPDATE client
clientRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const parsed = updateClientSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }
    const client = await prisma.client.update({
      where: { id: req.params.id },
      data: parsed.data,
    });
    res.json(client);
  } catch (error) {
    console.error('Failed to update client:', error);
    res.status(500).json({ error: 'Failed to update client' });
  }
});

// DELETE client
clientRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.client.delete({
      where: { id: req.params.id },
    });
    res.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Failed to delete client:', error);
    res.status(500).json({ error: 'Failed to delete client' });
  }
});
