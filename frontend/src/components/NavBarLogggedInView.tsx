import { Button, Navbar } from 'react-bootstrap'
import { User } from '../models/user'
import * as UsersApi from '../network/users_api'

interface NavBarLoggedInViewProps {
  user: User
  onLogoutSuccessful: () => void
}

const NavBarLogggedInView = ({
  user,
  onLogoutSuccessful
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await UsersApi.logout()
      onLogoutSuccessful()
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }
  return (
    <>
      <Navbar.Text className="me-2">Signed in as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Logout</Button>
    </>
  )
}

export default NavBarLogggedInView
