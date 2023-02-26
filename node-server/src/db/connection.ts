import { Sequelize } from 'sequelize-typescript'
import { Creator } from '../models/creator'
import { LikedVideo } from '../models/likedVideo'
import { Video } from '../models/video'

const connection = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'video-creators',
  models: [Video, Creator, LikedVideo],
  logging: false,
})

export default connection
