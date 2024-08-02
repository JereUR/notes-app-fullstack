import { cleanEnv, num, str } from 'envalid'

export default cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  MONGO_CONNECTION_STRING: str()
})
