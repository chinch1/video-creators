import axios, { AxiosError } from 'axios'

const backendUrl = process.env.NODE_BACKEND_URL || 'http://localhost:3001'

interface ILoginCreatorData {
  email: string
  password: string
}

export default async function login(
  inputs: ILoginCreatorData,
  onError: (error: any) => void
) {
  try {
    const response = await axios.post(`${backendUrl}/api/login`, inputs)
    const {
      creatorId,
      token,
      photo,
    }: { creatorId: string; token: string; photo: string } = response.data
    return { creatorId, token, photo }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.error.message
      await onError(errorMessage)
    }
    return null
  }
}
