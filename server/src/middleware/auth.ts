import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../env'

export type AuthPayload = { userId: number; role: string }

export function createToken(payload: AuthPayload): string {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: '7d' })
}

export function requireAuth(roles?: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const token = header.slice(7)
    try {
      const payload = jwt.verify(token, env.jwtSecret) as AuthPayload
      ;(req as any).auth = payload
      if (roles && roles.length > 0 && !roles.includes(payload.role)) {
        return res.status(403).json({ error: 'Forbidden' })
      }
      next()
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }
  }
}