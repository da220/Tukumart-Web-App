import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret',
  sessionSecret: process.env.SESSION_SECRET ?? 'session-secret',
  nodeEnv: process.env.NODE_ENV ?? 'development',
}