import { Table, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import USERS from '../data/users'

function UserListPage() {
  const { state } = useAuth()
  const user = state.user

  if (!user) return null

  if (user.role !== 'admin') {
    return (
      <Alert
        variant="danger"
        className="mx-auto mt-4"
        style={{ maxWidth: '720px' }}
      >
        Bạn không có quyền truy cập
      </Alert>
    )
  }

  return (
    <div className="mx-auto mt-4" style={{ maxWidth: '720px' }}>
      <h3 className="mb-3">Danh sách User</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {USERS.map((userItem) => (
            <tr key={userItem.id}>
              <td>{userItem.id}</td>
              <td>{userItem.username}</td>
              <td>{userItem.name}</td>
              <td>{userItem.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserListPage
