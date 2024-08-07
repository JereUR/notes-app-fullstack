import { Note } from '../models/note'

async function fecthData(input: RequestInfo, init?: RequestInit) {
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

export async function fecthNotes(): Promise<Note[]> {
  const response = await fecthData('/api/notes', {
    method: 'GET'
  })
  return response.json()
}

export interface NoteInput {
  title: string
  text?: string
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fecthData('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
  return response.json()
}
