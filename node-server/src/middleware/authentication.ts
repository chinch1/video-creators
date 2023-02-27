import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { Creator } from '../models/creator'

export const JWTMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the auth header
  const auth = req.get('Authorization')
  if (!auth) return res.status(401).json({ message: 'No auth header' })

  // Split the auth header into scheme and token
  const [authScheme, token] = auth?.trim().split(' ') ?? []

  if (authScheme !== 'Bearer')
    return res.status(401).json({
      message: `Wrong auth scheme, expected Bearer, given: ${authScheme}`,
    })

  if (!token) return res.status(401).json({ message: 'No token provided' })

  // Decode the token
  let decoded: JwtPayload | null = null

  try {
    decoded = jwt.decode(token) as JwtPayload
  } catch {
    return res.status(401).json({ message: 'Invalid decoded token' })
  }

  if (!decoded)
    return res.status(401).json({ message: 'Invalid decoded token' })

  // Get the creator from the database using the id from the token
  const userId = decoded.id
  const creator = await Creator.findOne({ where: { id: userId } })

  if (!creator?.secret)
    return res.status(401).json({ message: 'No secret found' })

  // Verify the token using the creator secret
  try {
    jwt.verify(token, creator?.secret)
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }

  return next()
}
