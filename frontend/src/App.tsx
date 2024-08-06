import './App.css'
import { useEffect, useState } from 'react'
import { Note } from './models/note'

function App() {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await fetch('/api/notes', {
          method: 'GET'
        })
        const data = await response.json()
        if (data) setNotes(data)
      } catch (error) {
        console.error(error)
        alert(error)
      }
    }

    getNotes()
  }, [])

  return <div className="App">{JSON.stringify(notes)}</div>
}

export default App
