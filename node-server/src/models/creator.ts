import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript'
import { CreatorFollower } from './creatorFollower'
import { LikedVideo } from './likedVideo'
import { Video } from './video'

@Table({
  tableName: 'creators',
})
export class Creator extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string

  @Column({
    type: DataType.ENUM('student', 'teacher'),
    allowNull: false,
  })
  type!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  photo!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  secret!: string

  @CreatedAt
  createdAt!: Date

  @UpdatedAt
  updatedAt!: Date

  @HasMany(() => Video)
  videos!: Video[]

  @BelongsToMany(() => Video, () => LikedVideo)
  likedVideos!: Video[]

  @BelongsToMany(
    () => Creator,
    () => CreatorFollower,
    'followerId',
    'creatorId'
  )
  following!: Creator[]

  @BelongsToMany(
    () => Creator,
    () => CreatorFollower,
    'creatorId',
    'followerId'
  )
  followers!: Creator[]
}
