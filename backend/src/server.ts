import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'

import env from './util/validateEnv'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

const PORT = env.PORT

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error))
