import { Note } from '../models/note'
import { fecthData } from '../utils/FetchData'

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

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fecthData(`/api/notes/${noteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
  return response.json()
}

export async function deleteNote(noteId: string): Promise<void> {
  await fecthData(`/api/notes/${noteId}`, {
    method: 'DELETE'
  })
}
