import { User } from '../models/user'
import { fecthData } from '../utils/FetchData'

export async function getLoggedInUser(): Promise<User | null> {
  const response = await fecthData('/api/users', { method: 'GET' })
  return response.json()
}

export interface SignUpCredentials {
  username: string
  email: string
  password: string
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fecthData('/api/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  return response.json()
}

export interface LoginCredentials {
  username: string
  password: string
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fecthData('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  return response.json()
}

export async function logout(): Promise<void> {
  await fecthData('/api/users/logout', { method: 'POST' })
}
