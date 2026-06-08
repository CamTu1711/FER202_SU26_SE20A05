import USERS from '../data/users'

export function findUser(username, password) {
  if (!username || !password) {
    return null
  }

  const user = USERS.find(
    (item) => item.username === username && item.password === password
  )

  return user || null
}
