import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { Note } from '../models/note'
import { NoteInput } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'
import TextInputField from './form/TextInputField'

interface AddEditNoteDialogProps {
  noteToEdit?: Note
  onDismiss: () => void
  onNoteSaved: (note: Note) => void
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || '',
      text: noteToEdit?.text || ''
    }
  })

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note

      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
      } else {
        noteResponse = await NotesApi.createNote(input)
      }

      onNoteSaved(noteResponse)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? 'Edit Note' : 'Add Note'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditNotForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Enter title"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.title}
          />
          <TextInputField
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Enter text"
            register={register}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          className="btn btn-primary"
          form="addEditNotForm"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEditNoteDialog
