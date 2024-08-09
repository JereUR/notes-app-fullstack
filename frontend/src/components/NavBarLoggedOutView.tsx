import { Button } from 'react-bootstrap'

interface NavBarLoggedOutProps {
  onSignUpClicked: () => void
  onLoginClicked: () => void
}

const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked
}: NavBarLoggedOutProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>
      <Button onClick={onLoginClicked}>Log In</Button>
    </>
  )
}

export default NavBarLoggedOutView
