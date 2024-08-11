import { useEffect, useState } from 'react'

import styles from './styles/App.module.css'
import SignUpModal from './components/SignUpModal'
import LoginModal from './components/LoginModal'
import NavBar from './components/NavBar'
import { User } from './models/user'
import * as UsersApi from './network/users_api'
import NotesPage from './pages/NotesPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UsersApi.getLoggedInUser()
        setLoggedInUser(user)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoggedInUser()
  }, [])

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>
        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user)
              setShowSignUpModal(false)
            }}
          />
        )}
        {showLoginModal && (
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user)
              setShowLoginModal(false)
            }}
          />
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
