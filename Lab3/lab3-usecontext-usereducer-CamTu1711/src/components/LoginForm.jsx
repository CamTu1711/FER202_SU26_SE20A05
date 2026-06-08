import { useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { findUser } from '../utils/authHelpers'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { state, dispatch } = useAuth()

  const handleSubmit = (event) => {
    event.preventDefault()

    const user = findUser(username.trim(), password)
    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      return
    }

    dispatch({
      type: 'LOGIN_FAILURE',
      payload: 'Sai username hoặc password!',
    })
  }

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: '480px' }}>
      <Card.Header className="bg-primary text-white">Đăng nhập</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Control
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>

          {state.error && (
            <Alert variant="danger" role="alert">
              {state.error}
            </Alert>
          )}

          <div className="d-grid">
            <Button type="submit" variant="primary">
              Đăng nhập
            </Button>
          </div>
        </Form>
      </Card.Body>
      <Card.Footer className="text-center text-muted">
        Nhập username và password để tiếp tục
      </Card.Footer>
    </Card>
  )
}

export default LoginForm

// fix
