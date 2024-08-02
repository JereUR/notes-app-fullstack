import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error))
