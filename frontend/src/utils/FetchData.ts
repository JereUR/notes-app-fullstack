import {
  ConflictError,
  NotFoundError,
  ServerError,
  UnauthorizedError
} from '../errors/http_errors'

export async function fecthData(input: RequestInfo, init?: RequestInit) {
  try {
    const response = await fetch(input, init)
    if (response.ok) {
      return response
    } else {
      const errorBody = await response.json()
      const errorMessage = errorBody.error

      if (response.status === 401) {
        throw new UnauthorizedError(errorMessage)
      } else if (response.status === 409) {
        throw new ConflictError(errorMessage)
      } else if (response.status === 404) {
        throw new NotFoundError(errorMessage)
      } else if (response.status === 500) {
        throw new ServerError(errorMessage)
      } else {
        throw new Error(
          `Request failed with status: ${response.status} message: ${errorMessage}`
        )
      }
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
