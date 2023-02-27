import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Creator } from '../models/creator'

export const CreatorLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body
    const creator = await Creator.findOne({ where: { email } })

    const validPassword = !creator
      ? false
      : await bcrypt.compare(password, creator.password)

    if (!(creator && validPassword)) {
      res.status(401).json({ message: 'Invalid user or password' })
    } else {
      const token = jwt.sign(
        { id: creator.id, email: creator.email },
        creator.secret,
        { expiresIn: '5h' }
      )
      res.status(200).json({ message: 'Login successful', token })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
