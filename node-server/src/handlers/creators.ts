import { Request } from 'express'
import { Creator } from '../models/creator'
import bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { handleValidationError } from '../lib/errorHandler'
import jwt from 'jsonwebtoken'

export const createCreator = async (req: Request) => {
  // Password encryption
  const salt = await bcrypt.genSalt(10)
  req.body.password = await bcrypt.hash(req.body.password, salt)

  // Creating secret
  req.body.secret = crypto.randomBytes(64).toString('base64')

  // Creating new creator
  const creator = await handleValidationError(
    async () => await Creator.create(req.body)
  )

  // Creating token
  const token = jwt.sign(
    { id: creator.id, email: creator.email },
    creator.secret,
    { expiresIn: '5h' }
  )

  return { message: 'Creator created', token, status: 201 }
}

export const deleteCreator = async (req: Request) => {
  const { id } = req.params
  const creatorToDelete = await Creator.findByPk(id)

  if (!creatorToDelete) throw { message: 'Creator not found', status: 404 }

  await Creator.destroy({ where: { id } })
  return { message: 'Creator deleted', data: creatorToDelete, status: 204 }
}

export const getAllCreators = async () => {
  const creators = await Creator.findAll({
    attributes: { exclude: ['password', 'secret'] },
  })

  return { message: 'Creators retrieved', data: creators, status: 200 }
}

export const getCreatorById = async (req: Request) => {
  const { id } = req.params
  const creator = await Creator.findByPk(id, {
    include: ['videos', 'likedVideos', 'followers', 'following'],
    attributes: {
      exclude: ['password', 'secret'],
    },
  })

  if (!creator) throw { message: 'Creator not found', status: 404 }
  return { message: 'Creator retrieved', data: creator, status: 200 }
}

export const updateCreator = async (req: Request) => {
  const { id } = req.params

  await handleValidationError(
    async () => await Creator.update(req.body, { where: { id } })
  )

  return { message: 'Creator updated', status: 204 }
}

export const likeVideo = async (req: Request) => {
  const { id } = req.params
  const { like, videoId } = req.body

  const creator = await Creator.findByPk(id)

  if (!creator) throw { message: 'Creator not found', status: 404 }

  if (like) await creator!.$add('likedVideos', videoId)
  else await creator!.$remove('likedVideos', videoId)

  return {
    message: `Video ${(!like && 'un') || ''}liked`,
    status: 200,
  }
}

export const creatorFollow = async (req: Request) => {
  const { id: creatorFollowingId } = req.params
  const { follow, creatorToFollowId } = req.body

  const creatorWhoFollows = await Creator.findByPk(creatorFollowingId)
  const creatorFollowed = await Creator.findByPk(creatorToFollowId)

  if (!creatorWhoFollows || !creatorFollowed)
    throw {
      message: `Creator ${
        !creatorWhoFollows ? 'following' : 'to follow'
      } not found`,
      status: 404,
    }

  if (creatorFollowingId === creatorToFollowId)
    throw { message: 'You cannot follow yourself', status: 400 }

  if (follow) {
    await creatorWhoFollows!.$add('following', creatorToFollowId)
  } else {
    await creatorWhoFollows!.$remove('following', creatorToFollowId)
  }

  return { message: `Creator ${(!follow && 'un') || ''}followed`, status: 200 }
}
