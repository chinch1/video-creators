import axios, { AxiosError } from 'axios'

const backendUrl = process.env.NODE_BACKEND_URL || 'http://localhost:3001'

interface ISignUpCreatorData {
  name: string
  type: string
  email: string
  password: string
}

export default async function signup(
  inputs: ISignUpCreatorData,
  onError: (error: any) => void
) {
  try {
    const response = await axios.post(`${backendUrl}/api/creators`, inputs)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.error
      await onError(errorMessage)
    }
    return null
  }
}
