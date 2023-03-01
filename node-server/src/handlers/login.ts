import { Request } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Creator } from '../models/creator'

export const CreatorLogin = async (req: Request) => {
  const { email, password } = req.body
  const creator: Creator | null = await Creator.findOne({ where: { email } })

  const validPassword = !creator
    ? false
    : await bcrypt.compare(password, creator.password)

  if (!(creator && validPassword))
    throw { message: 'Invalid user or password', status: 401 }
  else {
    const token = jwt.sign(
      { id: creator.id, email: creator.email },
      creator.secret,
      { expiresIn: '5h' }
    )

    return {
      message: 'Login successful',
      creatorId: creator.id,
      token,
      photo: creator.photo,
      status: 200,
    }
  }
}
