import express from 'express'
import {
  createCreator,
  getAllCreators,
  getCreatorById,
  updateCreator,
  deleteCreator,
  likeVideo,
  creatorFollow,
} from '../handlers/creators'
import { middlewareErrorHandler } from '../lib/errorHandler'
import { routeHandler } from '../lib/routeHandler'
import { JWTMiddleware } from '../middleware/authentication'

const creatorsRouter = express.Router()

// Open routes
creatorsRouter.post('/', routeHandler(createCreator))

// Protected routes
creatorsRouter.use(middlewareErrorHandler(JWTMiddleware))

creatorsRouter.get('/', routeHandler(getAllCreators))
creatorsRouter.get('/:id', routeHandler(getCreatorById))
creatorsRouter.post('/:id/likedVideos', routeHandler(likeVideo))
creatorsRouter.post('/:id/following', routeHandler(creatorFollow))
creatorsRouter.put('/:id', routeHandler(updateCreator))
creatorsRouter.delete('/:id', routeHandler(deleteCreator))

export default creatorsRouter
