import { RequestHandler } from 'express'

import NoteModel from '../models/note'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec()
    res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
}

export const getNote: RequestHandler = async (req, res, next) => {
  const id = req.params.noteId

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, 'Invalid note ID')
    }

    const note = await NoteModel.findById(id).exec()
    if (!note) throw createHttpError(404, 'Note not found')
    res.status(200).json(note)
  } catch (error) {
    next(error)
  }
}

interface CreateNoteBody {
  title?: string
  text?: string
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title
  const text = req.body.text

  try {
    if (!title) {
      throw createHttpError(400, 'Note must have a title')
    }

    const newNote = await NoteModel.create({
      title,
      text
    })
    res.status(201).json(newNote)
  } catch (error) {
    next(error)
  }
}

interface UpdateNoteParams {
  noteId: string
}

interface UpdateNoteBody {
  title?: string
  text?: string
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const id = req.params.noteId
  const newTitle = req.body.title
  const newText = req.body.text

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, 'Invalid note ID')
    }

    if (!newTitle) {
      throw createHttpError(400, 'Note must have a title')
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(
      id,
      { title: newTitle, text: newText },
      { new: true }
    ).exec()

    if (!updatedNote) throw createHttpError(404, 'Note not found')
    res.status(200).json(updatedNote)
  } catch (error) {
    next(error)
  }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
  const id = req.params.noteId

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, 'Invalid note ID')
    }

    const deletedNote = await NoteModel.findByIdAndDelete(id).exec()

    if (!deletedNote) throw createHttpError(404, 'Note not found')
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
