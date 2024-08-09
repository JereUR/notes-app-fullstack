export async function fecthData(input: RequestInfo, init?: RequestInit) {
  try {
    const response = await fetch(input, init)
    if (response.ok) {
      return response
    } else {
      const errorBody = await response.json()
      const errorMessage = errorBody.error
      throw Error(errorMessage)
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
