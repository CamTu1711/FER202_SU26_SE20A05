import { describe, test, expect } from 'vitest'
import { findUser } from '../../utils/authHelpers'

describe('findUser', () => {
  test('returns user object for valid admin credentials', () => {
    const user = findUser('admin', '123')
    expect(user).toBeTruthy()
    expect(user.username).toBe('admin')
    expect(user.role).toBe('admin')
  })

  test('returns user object for valid normal user credentials', () => {
    const user = findUser('user', '123')
    expect(user).toBeTruthy()
    expect(user.username).toBe('user')
    expect(user.role).toBe('user')
  })

  test('returns null for wrong password', () => {
    expect(findUser('admin', 'wrong')).toBeNull()
  })

  test('returns null for wrong username', () => {
    expect(findUser('unknown', '123')).toBeNull()
  })

  test('returns null for empty username or password', () => {
    expect(findUser('', '123')).toBeNull()
    expect(findUser('admin', '')).toBeNull()
    expect(findUser('', '')).toBeNull()
  })
})