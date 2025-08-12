import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../middleware/auth'

const prisma = new PrismaClient()
export const notificationsRouter = Router()

notificationsRouter.get('/', requireAuth(), async (req, res) => {
  const auth = (req as any).auth
  const items = await prisma.notification.findMany({
    where: { OR: [{ userId: auth.userId }, { userId: null }] },
    orderBy: { createdAt: 'desc' },
  })
  res.json(items)
})

const notifySchema = z.object({ title: z.string(), body: z.string(), userId: z.number().optional() })

notificationsRouter.post('/', requireAuth(['ADMIN', 'OFFICER']), async (req, res) => {
  const parsed = notifySchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())
  const n = await prisma.notification.create({ data: parsed.data })
  res.json(n)
})

notificationsRouter.post('/:id/read', requireAuth(), async (req, res) => {
  const id = Number(req.params.id)
  const n = await prisma.notification.update({ where: { id }, data: { isRead: true } })
  res.json(n)
})