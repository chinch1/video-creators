import { Sequelize } from 'sequelize-typescript'
import { Creator } from '../models/creator'
import { CreatorFollower } from '../models/creatorFollower'
import { LikedVideo } from '../models/likedVideo'
import { Video } from '../models/video'

const connection = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: Number(process.env.POSTGRES_DOCKER_USERNAME) || 5432,
  username: process.env.POSTGRES_DOCKER_USERNAME || 'postgres',
  password: process.env.POSTGRES_DOCKER_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DOCKER_DB_NAME || 'video-creators',
  models: [Video, Creator, LikedVideo, CreatorFollower],
  logging: false,
})

export default connection
