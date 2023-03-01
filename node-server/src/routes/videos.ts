import express from 'express'
import {
  createVideo,
  getAllVideos,
  updateVideo,
  deleteVideo,
  publishVideo,
  getVideoById,
} from '../handlers/videos'
import { middlewareErrorHandler } from '../lib/errorHandler'
import { routeHandler } from '../lib/routeHandler'
import { JWTMiddleware } from '../middleware/authentication'

const videosRouter = express.Router()

videosRouter.use(middlewareErrorHandler(JWTMiddleware))

videosRouter.get('/', routeHandler(getAllVideos))
videosRouter.get('/:id', routeHandler(getVideoById))
videosRouter.post('/', routeHandler(createVideo))
videosRouter.put('/:id', routeHandler(updateVideo))
videosRouter.put('/:id/publish', routeHandler(publishVideo))
videosRouter.delete('/:id', routeHandler(deleteVideo))

export default videosRouter
