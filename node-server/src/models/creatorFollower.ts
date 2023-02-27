import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  CreatedAt,
} from 'sequelize-typescript'
import { Creator } from './creator'

@Table({
  tableName: 'creator_followers',
})
export class CreatorFollower extends Model {
  @ForeignKey(() => Creator)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  creatorId!: string

  @ForeignKey(() => Creator)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  followerId!: string

  @CreatedAt
  createdAt!: Date
}
