import { NextFunction, Request, RequestHandler, Response } from 'express'
import { ValidationError } from 'sequelize'

export const middlewareErrorHandler =
  (routerHandler: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await routerHandler(req, res, next)
    } catch (error: any) {
      const internalError = error.hasOwnProperty('status')
        ? (error as { status: number })
        : {
            status: 500,
            message: 'An unexpected exception has occurred.',
            meta: { route: req.originalUrl, error },
          }

      console.error(error)

      if (!res.headersSent)
        res.status(internalError.status).json({ error: internalError })
    }
  }

export const handleValidationError = async <T>(callback: () => Promise<T>) => {
  try {
    return await callback()
  } catch (error) {
    if (error instanceof ValidationError)
      throw {
        status: 400,
        message: error.message,
        name: error.name,
        errors: error.errors,
      }
    else throw error
  }
}
