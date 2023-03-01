import axios, { AxiosError } from 'axios'

const backendUrl = process.env.NODE_BACKEND_URL || 'http://localhost:3001'

export const getVideo = async (
  token: string,
  videoId: string | undefined,
  onError: (error: any) => void
) => {
  try {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const data = await axios.get(
      `${backendUrl}/api/videos/${videoId}`,
      axiosConfig
    )

    return data.data.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.error
      await onError(errorMessage)
    }
    return null
  }
}
