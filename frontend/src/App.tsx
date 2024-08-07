import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import styles from './styles/NotePage.module.css'
import { Note as NoteModel } from './models/note'
import Note from './components/Note'
import * as NotesApi from './network/notes_api'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  useEffect(() => {
    async function getNotes() {
      try {
        const notes = await NotesApi.fecthNotes()
        setNotes(notes)
      } catch (error) {
        console.error(error)
        alert(error)
      }
    }

    getNotes()
  }, [])

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default App
