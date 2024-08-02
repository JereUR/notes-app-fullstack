import mongoose from 'mongoose'

import env from './util/validateEnv'
import app from './app'

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
