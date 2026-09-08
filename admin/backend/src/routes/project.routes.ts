import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema';
import { triggerRevalidation } from '../utils/revalidate';

export const projectRouter = Router();

// GET all projects (optional filter: activeOnly, featuredOnly)
projectRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { activeOnly, featuredOnly } = req.query;
    const where: any = {};
    if (activeOnly === 'true') where.isActive = true;
    if (featuredOnly === 'true') where.isFeatured = true;

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(projects);
  } catch (error) {
    console.error('Failed to get projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET single project by id or slug
projectRouter.get('/:idOrSlug', async (req: Request, res: Response) => {
  try {
    const { idOrSlug } = req.params;
    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    console.error('Failed to get project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// CREATE project
projectRouter.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = createProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }

    // Check slug uniqueness
    const existing = await prisma.project.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      res.status(400).json({ errors: { slug: ['Slug must be unique'] } });
      return;
    }

    const project = await prisma.project.create({
      data: parsed.data,
    });
    await triggerRevalidation(['projects', project.slug], ['/', '/portfolio']);
    res.status(201).json(project);
  } catch (error) {
    console.error('Failed to create project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// UPDATE project
projectRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const parsed = updateProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }

    // Check slug uniqueness if updating slug
    if (parsed.data.slug) {
      const existing = await prisma.project.findUnique({
        where: { slug: parsed.data.slug },
      });
      if (existing && existing.id !== req.params.id) {
        res.status(400).json({ errors: { slug: ['Slug is already taken'] } });
        return;
      }
    }

    const existingProject = await prisma.project.findUnique({
      where: { id: req.params.id },
      select: { slug: true },
    });

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: parsed.data,
    });

    const tags = ['projects', project.slug];
    if (existingProject?.slug && existingProject.slug !== project.slug) {
      tags.push(existingProject.slug);
    }
    await triggerRevalidation(tags, ['/', '/portfolio']);

    res.json(project);
  } catch (error) {
    console.error('Failed to update project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE project
projectRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const existingProject = await prisma.project.findUnique({
      where: { id: req.params.id },
      select: { slug: true },
    });

    await prisma.project.delete({
      where: { id: req.params.id },
    });

    const tags = ['projects'];
    if (existingProject?.slug) {
      tags.push(existingProject.slug);
    }
    await triggerRevalidation(tags, ['/', '/portfolio']);

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Failed to delete project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

