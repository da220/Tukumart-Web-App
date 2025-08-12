import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../middleware/auth'

const prisma = new PrismaClient()
export const advisoriesRouter = Router()

advisoriesRouter.get('/', async (req, res) => {
  const cropId = req.query.cropId ? Number(req.query.cropId) : undefined
  const advisories = await prisma.advisory.findMany({
    where: { cropId },
    orderBy: { createdAt: 'desc' },
    include: { crop: true, author: { select: { id: true, name: true } } },
  })
  res.json(advisories)
})

const advisorySchema = z.object({
  title: z.string().min(3),
  content: z.string().min(5),
  cropId: z.number().optional(),
})

advisoriesRouter.post('/', requireAuth(['ADMIN', 'OFFICER']), async (req, res) => {
  const parsed = advisorySchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())
  const auth = (req as any).auth
  const advisory = await prisma.advisory.create({
    data: { ...parsed.data, authorId: auth.userId },
  })
  res.json(advisory)
})