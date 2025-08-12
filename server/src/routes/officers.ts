import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const officersRouter = Router()

officersRouter.get('/', async (req, res) => {
  const q = (req.query.q as string | undefined)?.trim()
  const region = (req.query.region as string | undefined)?.trim()
  const officers = await prisma.officer.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { user: { name: { contains: q, mode: 'insensitive' } } },
                { specialization: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {},
        region ? { region: { contains: region, mode: 'insensitive' } } : {},
      ],
    },
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { user: { name: 'asc' } },
  })
  res.json(officers)
})