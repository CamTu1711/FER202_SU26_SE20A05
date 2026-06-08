import { Navbar, Container, Button } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

function AppNavbar() {
  const { state, dispatch } = useAuth()
  const user = state.user

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand>Auth App</Navbar.Brand>
        {user && (
          <div className="d-flex align-items-center gap-2">
            <span>{user.name}</span>
            <Button
              variant="outline-danger"
              onClick={() => dispatch({ type: 'LOGOUT' })}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  )
}

export default AppNavbar

