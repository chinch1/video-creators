import axios, { AxiosError } from 'axios'

const backendUrl = process.env.NODE_BACKEND_URL || 'http://localhost:3001'

export const publishVideo = async (
  videoId: string,
  creatorSession: any,
  onError: (error: any) => void
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${creatorSession.token}`,
      },
    }

    const response = await axios.put(
      `${backendUrl}/api/videos/${videoId}/publish`,
      {},
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
