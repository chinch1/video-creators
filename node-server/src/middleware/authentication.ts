import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { Creator } from '../models/creator'

export const JWTMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Get the auth header
  const auth = req.get('Authorization')
  if (!auth) throw { message: 'No auth header', status: 401 }

  // Split the auth header into scheme and token
  const [authScheme, token] = auth?.trim().split(' ') ?? []

  if (authScheme !== 'Bearer')
    throw {
      message: `Wrong auth scheme, expected Bearer, given: ${authScheme}`,
      status: 401,
    }

  if (!token) throw { message: 'No token provided', status: 401 }

  // Decode the token
  let decoded: JwtPayload | null = null

  try {
    decoded = jwt.decode(token) as JwtPayload
  } catch {
    throw { message: 'Invalid decoded token', status: 401 }
  }

  if (!decoded) throw { message: 'Invalid decoded token', status: 401 }

  // Get the creator from the database using the id from the token
  const userId = decoded.id
  const creator = await Creator.findOne({ where: { id: userId } })

  if (!creator?.secret) throw { message: 'No secret found', status: 401 }

  // Verify the token using the creator secret
  try {
    jwt.verify(token, creator?.secret)
  } catch {
    throw { message: 'Invalid token', status: 401 }
  }

  next()
}
