import { render, screen, act } from '@testing-library/react'
import { useContext } from 'react'
import { AuthProvider, AuthContext } from '../../context/AuthContext'
import Dashboard from '../../components/Dashboard'

const FAKE_USER = { id: 1, username: 'admin', name: 'Admin User', role: 'admin' }

function renderDashboardLoggedIn(user = FAKE_USER) {
  function Inner() {
    const { dispatch } = useContext(AuthContext)
    return (
      <>
        <button
          data-testid="login-trigger"
          onClick={() => dispatch({ type: 'LOGIN_SUCCESS', payload: user })}
        >
          login
        </button>
        <Dashboard />
      </>
    )
  }

  const utils = render(
    <AuthProvider>
      <Inner />
    </AuthProvider>
  )

  act(() => {
    utils.getByTestId('login-trigger').click()
  })

  return utils
}

describe('Dashboard', () => {
  test('hiển thị tên user và role badge khi đã đăng nhập', () => {
    renderDashboardLoggedIn()

    expect(screen.getByText(/admin user/i)).toBeInTheDocument()
    expect(screen.getByText(/^admin$/i, { selector: 'span' })).toBeInTheDocument()
  })

  test('badge role có class bg-danger khi là admin', () => {
    renderDashboardLoggedIn()

    const badge = screen.getByText(/^admin$/i, { selector: 'span' })
    expect(badge).toHaveClass('bg-danger')
  })

  test('có nút logout', () => {
    renderDashboardLoggedIn()
    expect(screen.getByRole('button', { name: /logout|đăng xuất/i })).toBeInTheDocument()
  })
})