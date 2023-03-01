import axios, { AxiosError } from 'axios'

const backendUrl = process.env.NODE_BACKEND_URL || 'http://localhost:3001'

export default async function likeVideo(
  videoId: string,
  creatorSession: any,
  likeOrDislike: boolean,
  onError: (error: any) => void
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${creatorSession.token}`,
      },
    }

    const videoBody = {
      videoId,
      like: likeOrDislike,
    }
    const response = await axios.post(
      `${backendUrl}/api/creators/${creatorSession.creatorId}/likedVideos`,
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
