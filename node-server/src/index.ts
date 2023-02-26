import express, { NextFunction } from 'express'
import dotenv from 'dotenv'
import connection from './db/connection'
import creatorsRouter from './routes/creators'
import videosRouter from './routes/videos'

dotenv.config()

const PORT = process.env.PORT_DEVELOPMENT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/videos', videosRouter)
app.use('/api/creators', creatorsRouter)

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: NextFunction
  ) => {
    res.status(500).json({ message: err.message })
  }
)

connection
  .sync()
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.log('Error: ', err)
  })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
