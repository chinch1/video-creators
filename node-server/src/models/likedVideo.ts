import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  CreatedAt,
} from 'sequelize-typescript'
import { Creator } from './creator'
import { Video } from './video'

@Table({
  tableName: 'liked_videos',
})
export class LikedVideo extends Model {
  @ForeignKey(() => Creator)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  creatorId!: string

  @ForeignKey(() => Video)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  videoId!: string

  @CreatedAt
  createdAt!: Date
}
