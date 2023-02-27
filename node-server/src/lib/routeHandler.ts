import { Request, Response } from 'express'

export const routeHandler =
  <T extends { status: number }>(
    routerHandler: (req: Request, res: Response) => Promise<T>
  ) =>
  async (req: Request, res: Response) => {
    try {
      let { status, ...body } = await routerHandler(req, res)
      if (!res.headersSent) res.status(status).json(body)
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
