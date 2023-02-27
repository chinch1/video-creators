import express from 'express'
import { CreatorLogin } from '../controller/login'

const loginRouter = express.Router()

loginRouter.post('/', CreatorLogin)

export default loginRouter
