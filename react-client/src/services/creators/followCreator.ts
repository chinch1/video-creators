import axios, { AxiosError } from 'axios'

const backendUrl = process.env.NODE_BACKEND_URL || 'http://localhost:3001'

export default async function creatorFollow(
  creatorToFollowId: string,
  followOrUnfollow: boolean,
  creatorSession: any,
  onError: (error: any) => void
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${creatorSession.token}`,
      },
    }

    const creatorFollowBody = {
      creatorToFollowId,
      follow: followOrUnfollow,
    }
    const response = await axios.post(
      `${backendUrl}/api/creators/${creatorSession.creatorId}/following`,
      creatorFollowBody,
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
