import { useEffect, useState } from 'react'

import styles from './styles/NotePage.module.css'
import { Note as NoteModel } from './models/note'
import Note from './components/Note'
import { Col, Container, Row } from 'react-bootstrap'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

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
