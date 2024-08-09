import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import { useEffect, useState } from 'react'

import AddEditNoteDialog from './AddEditNoteDialog'
import stylesUtils from '../styles/utils.module.css'
import styles from '../styles/NotePage.module.css'
import * as NotesApi from '../network/notes_api'
import { Note as NoteModel } from '../models/note'
import Note from './Note'

const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [notesLoading, setNotesLoading] = useState<boolean>(true)
  const [showNotesLoadingError, setShowNotesLoadingError] =
    useState<boolean>(false)
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] =
    useState<boolean>(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

  useEffect(() => {
    async function getNotes() {
      try {
        setShowNotesLoadingError(false)
        setNotesLoading(true)
        const notes = await NotesApi.fecthNotes()
        setNotes(notes)
      } catch (error) {
        console.error(error)
        setShowNotesLoadingError(true)
      } finally {
        setNotesLoading(false)
      }
    }

    getNotes()
  }, [])

  async function deleteNote(note: NoteModel) {
    if (
      window.confirm(`Are you sure you want to delete the note: ${note.title}?`)
    ) {
      try {
        await NotesApi.deleteNote(note._id)
        setNotes(notes.filter((n) => n._id !== note._id))
      } catch (error) {
        console.error(error)
        alert(error)
      }
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            note={note}
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClicked={deleteNote}
            className={styles.note}
          />
        </Col>
      ))}
    </Row>
  )
  return (
    <>
      <Button
        className={`m-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddEditNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && (
        <div className="text-center">
          An error occurred while loading notes. Please try again later.
        </div>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? (
            notesGrid
          ) : (
            <div className="text-center">
              No notes found. Please add some by clicking on the "Add new note"
              button above.
            </div>
          )}
        </>
      )}
      {showAddEditNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddEditNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddEditNoteDialog(false)
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((n) => (n._id === updatedNote._id ? updatedNote : n))
            )
            setNoteToEdit(null)
          }}
        />
      )}
    </>
  )
}

export default NotesPageLoggedInView
