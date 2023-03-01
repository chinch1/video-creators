import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import connection from './db/connection'
import Logging from './middleware/logger'
import creatorsRouter from './routes/creators'
import loginRouter from './routes/login'
import videosRouter from './routes/videos'

dotenv.config()

const PORT = process.env.NODE_BACKEND_PORT_DEVELOPMENT || 3001
const app = express()

app.use(cors())

// Middlewares for parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware for logging
app.use(Logging)

// Routes
app.use('/api/videos', videosRouter)
app.use('/api/creators', creatorsRouter)
app.use('/api/login', loginRouter)

// Database connection
connection
  .sync()
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.log('Error: ', err)
  })

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
