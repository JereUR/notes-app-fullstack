import { RequestHandler } from 'express'

import NoteModel from '../models/note'

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    //throw Error('Upps!')
    const notes = await NoteModel.find().exec()
    res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
}

export const getNote: RequestHandler = async (req, res, next) => {
  const id = req.params.noteId

  try {
    const note = await NoteModel.findById(id).exec()
    if (!note) return res.status(404).json({ message: 'Note not found' })
    res.status(200).json(note)
  } catch (error) {
    next(error)
  }
}

export const createNote: RequestHandler = async (req, res, next) => {
  const title = req.body.title
  const text = req.body.text

  try {
    const newNote = await NoteModel.create({
      title,
      text
    })
    res.status(201).json(newNote)
  } catch (error) {
    next(error)
  }
}
