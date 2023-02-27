import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript'
import { Creator } from './creator'
import { LikedVideo } from './likedVideo'

@Table({
  tableName: 'videos',
})
export class Video extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id!: string

  @ForeignKey(() => Creator)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  creatorId!: string

  @BelongsTo(() => Creator)
  creator!: Creator

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  url!: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  published!: boolean

  @CreatedAt
  createdAt!: Date

  @UpdatedAt
  updatedAt!: Date

  @BelongsToMany(() => Creator, () => LikedVideo)
  likedByCreator!: Creator[]
}
