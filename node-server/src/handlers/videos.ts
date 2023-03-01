import { Request } from 'express'
import { handleValidationError } from '../lib/errorHandler'
import { Video } from '../models/video'

export const createVideo = async (req: Request) => {
  await handleValidationError(async () => await Video.create(req.body))
  return { message: 'Video created', status: 201 }
}

export const deleteVideo = async (req: Request) => {
  const { id } = req.params
  const videoToDelete = await Video.findByPk(id)

  if (!videoToDelete) throw { message: 'Video not found', status: 404 }

  await Video.destroy({ where: { id } })
  return { message: 'Video deleted', status: 204 }
}

export const getAllVideos = async () => {
  const videos = await Video.findAll()
  return { message: 'Videos retrieved', data: videos, status: 200 }
}

export const getVideoById = async (req: Request) => {
  const { id } = req.params
  const video = await Video.findByPk(id)
  return { message: 'Video retrieved', data: video, status: 200 }
}

export const updateVideo = async (req: Request) => {
  const { id } = req.params
  await handleValidationError(
    async () => await Video.update(req.body, { where: { id } })
  )

  return { message: 'Video updated', status: 204 }
}

export const publishVideo = async (req: Request) => {
  const { id } = req.params
  const video = await Video.findByPk(id)

  if (!video) throw { message: 'Video not found', status: 404 }

  video.published = !video.published
  await video.save()

  return { message: 'Video published', status: 204 }
}
