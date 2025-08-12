import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'
import session from 'express-session'
import { env } from './env'

AdminJS.registerAdapter({ Database, Resource })

export function buildAdmin(prisma: PrismaClient) {
  const admin = new AdminJS({
    branding: {
      companyName: 'SOCAA Admin',
    },
    resources: [
      { resource: { model: prisma.user, client: prisma }, options: { properties: { passwordHash: { isVisible: false } } } },
      { resource: { model: prisma.officer, client: prisma } },
      { resource: { model: prisma.crop, client: prisma } },
      { resource: { model: prisma.advisory, client: prisma } },
      { resource: { model: prisma.marketRate, client: prisma } },
      { resource: { model: prisma.notification, client: prisma } },
    ],
    rootPath: '/admin',
  })

  const router = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => {
        // Simple hardcoded admin credentials for demo; for production, check DB
        if (email === 'admin@socaa.local' && password === 'admin123') return { email }
        return null
      },
      cookiePassword: env.sessionSecret,
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
      secret: env.sessionSecret,
    } as session.SessionOptions
  )

  return { admin, router }
}