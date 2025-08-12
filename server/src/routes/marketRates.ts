import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../middleware/auth'

const prisma = new PrismaClient()
export const marketRatesRouter = Router()

marketRatesRouter.get('/', async (req, res) => {
  const cropId = req.query.cropId ? Number(req.query.cropId) : undefined
  const location = req.query.location as string | undefined
  const rates = await prisma.marketRate.findMany({
    where: { cropId, location: location ? { contains: location, mode: 'insensitive' } : undefined },
    orderBy: { date: 'desc' },
    include: { crop: true },
  })
  res.json(rates)
})

const rateSchema = z.object({ cropId: z.number(), location: z.string(), pricePerKg: z.number() })

marketRatesRouter.post('/', requireAuth(['ADMIN', 'OFFICER']), async (req, res) => {
  const parsed = rateSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())
  const rate = await prisma.marketRate.create({ data: parsed.data })
  res.json(rate)
})