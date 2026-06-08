import { Button, Badge, Card } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

function Dashboard({ showLogout = true }) {
  const { state, dispatch } = useAuth()
  const user = state.user || {}
  const badgeVariant = user.role === 'admin' ? 'danger' : 'success'

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: '520px' }}>
      <Card.Header>
        <h3>Dashboard</h3>
      </Card.Header>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <p className="mb-2">{user.username}</p>
        <Badge bg={badgeVariant}>{user.role}</Badge>
      </Card.Body>
      {showLogout && (
        <Card.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'LOGOUT' })}>
            Đăng xuất
          </Button>
        </Card.Footer>
      )}
    </Card>
  )
}

export default Dashboard
