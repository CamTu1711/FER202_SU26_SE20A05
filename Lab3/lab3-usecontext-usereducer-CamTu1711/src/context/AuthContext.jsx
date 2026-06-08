import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

// EXT-04: Đọc user từ localStorage nếu có để giữ phiên đăng nhập khi F5
const savedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null
const initialUser = savedUser ? JSON.parse(savedUser) : null

// Khởi tạo state gốc, bổ sung isLoading cho EXT-01
export const initialState = {
  isAuthenticated: !!initialUser,
  user: initialUser,
  error: null,
  isLoading: false, // EXT-01: Thêm state loading
}

export function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START': // EXT-01: Kích hoạt khi vừa nhấn nút Đăng nhập
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'LOGIN_SUCCESS':
      // EXT-04: Lưu thông tin user vào localStorage khi thành công
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload))
      }
      return {
        ...state, // Giữ lại các state khác (bao gồm isLoading)
        isAuthenticated: true,
        user: action.payload,
        error: null,
        isLoading: false, // Tắt loading
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null, // Đảm bảo clear user cũ nếu có
        error: action.payload,
        isLoading: false, // Tắt loading
      }
    case 'LOGOUT':
      // EXT-04: Xóa user khỏi localStorage khi đăng xuất
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
      }
      return { 
        isAuthenticated: false,
        user: null,
        error: null,
        isLoading: false 
      }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}