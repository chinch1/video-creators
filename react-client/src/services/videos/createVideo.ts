import axios, { AxiosError } from 'axios'
import { getVideos } from './getVideos'

const backendUrl = process.env.NODE_BACKEND_URL || 'http://localhost:3001'

interface IVideoData {
  title: string
  description: string
  url: string
}

export default async function createVideo(
  videoData: IVideoData,
  creatorSession: any,
  onError: (error: any) => void
) {
  try {
    // Getting all the videos from the backend

    const videos = await getVideos(creatorSession.token, onError)

    const config = {
      headers: {
        Authorization: `Bearer ${creatorSession.token}`,
      },
    }

    // Checking if the video already exists
    const videoExists = videos.some((video: any) => video.url === videoData.url)
    if (videoExists) {
      await onError('This video already exists')
      return null
    }

    // Creating a new video
    const videoBody = {
      ...videoData,
      creatorId: creatorSession.creatorId,
    }
    const response = await axios.post(
      `${backendUrl}/api/videos`,
      videoBody,
      config
    )
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.error
      await onError(errorMessage)
    }
    return null
  }
}
