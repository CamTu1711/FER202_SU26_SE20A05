import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import UserListPage from './pages/UserListPage'
import AppNavbar from './components/AppNavbar'

function App() {
  const { state } = useAuth()

  return (
    <div>
      {state.isAuthenticated && <AppNavbar />}
      {state.isAuthenticated ? (
        <>
          <DashboardPage showLogout={false} />
          <UserListPage />
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  )
}

export default App
