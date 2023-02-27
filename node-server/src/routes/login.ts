import express from 'express'
import { CreatorLogin } from '../handlers/login'
import { routeHandler } from '../lib/routeHandler'

const loginRouter = express.Router()

loginRouter.post('/', routeHandler(CreatorLogin))

export default loginRouter
