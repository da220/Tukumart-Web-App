import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../middleware/auth'

const prisma = new PrismaClient()
export const cropsRouter = Router()

cropsRouter.get('/', async (_req, res) => {
  const crops = await prisma.crop.findMany({ orderBy: { name: 'asc' } })
  res.json(crops)
})

const cropSchema = z.object({ name: z.string().min(2), description: z.string().optional() })

cropsRouter.post('/', requireAuth(['ADMIN', 'OFFICER']), async (req, res) => {
  const parsed = cropSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())
  const crop = await prisma.crop.create({ data: parsed.data })
  res.json(crop)
})

cropsRouter.put('/:id', requireAuth(['ADMIN', 'OFFICER']), async (req, res) => {
  const parsed = cropSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())
  const id = Number(req.params.id)
  const crop = await prisma.crop.update({ where: { id }, data: parsed.data })
  res.json(crop)
})

cropsRouter.delete('/:id', requireAuth(['ADMIN']), async (req, res) => {
  const id = Number(req.params.id)
  await prisma.crop.delete({ where: { id } })
  res.json({ ok: true })
})