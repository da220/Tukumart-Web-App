import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { env } from './env'
import { authRouter } from './routes/auth'
import { cropsRouter } from './routes/crops'
import { advisoriesRouter } from './routes/advisories'
import { marketRatesRouter } from './routes/marketRates'
import { notificationsRouter } from './routes/notifications'
import { officersRouter } from './routes/officers'
import { buildAdmin } from './admin'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/auth', authRouter)
app.use('/crops', cropsRouter)
app.use('/advisories', advisoriesRouter)
app.use('/market-rates', marketRatesRouter)
app.use('/notifications', notificationsRouter)
app.use('/officers', officersRouter)

const { admin, router } = buildAdmin(prisma)
app.use(admin.options.rootPath, router)

app.listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port}`)
  console.log(`Admin on http://localhost:${env.port}${admin.options.rootPath}`)
})