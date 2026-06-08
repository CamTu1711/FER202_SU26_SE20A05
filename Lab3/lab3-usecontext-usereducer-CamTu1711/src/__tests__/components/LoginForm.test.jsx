import { render, screen, fireEvent } from '@testing-library/react'
import { AuthProvider } from '../../context/AuthContext'
import LoginForm from '../../components/LoginForm'

describe('LoginForm', () => {
  test('render form with username, password and submit button', () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    )

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /đăng nhập/i })).toBeInTheDocument()
  })

  test('show error alert when login fails', async () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    )

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'wrong' },
    })
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'bad' },
    })
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/sai username hoặc password/i)
  })
})