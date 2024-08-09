import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'

import styles from './styles/NotePage.module.css'
import SignUpModal from './components/SignUpModal'
import LoginModal from './components/LoginModal'
import NavBar from './components/NavBar'
import { User } from './models/user'
import * as UsersApi from './network/users_api'
import NotesPageLoggedInView from './components/NotesPageLoggedInView'
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView'

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
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
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
      </Container>
    </div>
  )
}

export default App
