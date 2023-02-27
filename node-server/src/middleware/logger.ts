import { NextFunction, Request, Response } from 'express'

export default function Logging(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  console.log(`Incoming ${req.method} request at route ${req.originalUrl}`)
  next()
}
