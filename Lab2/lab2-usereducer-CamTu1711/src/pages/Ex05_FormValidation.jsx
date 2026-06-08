/**
 * Bài 5 – Form Validation (useReducer)
 * ======================================
 * Mục tiêu: Quản lý form state phức tạp (values, errors, touched, submitted)
 *           bằng useReducer.
 *
 * Chạy test: npm test -- Ex05
 */
import { useReducer, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button, Alert, Modal } from 'react-bootstrap'

// ─────────────────────────────────────────────
// TODO 1: Định nghĩa initialState
//   {
//     values:    { name: '', email: '', password: '', confirm: '' },
//     errors:    {},      // { fieldName: 'thông báo lỗi' }
//     touched:   {},      // { fieldName: true/false }
//     submitted: false,
//   }
// ─────────────────────────────────────────────
const initialState = {
  values: { name: '', email: '', password: '', confirm: '' },
  errors: {},
  touched: {},
  submitted: false,
}

// ─────────────────────────────────────────────
// TODO 2: Viết hàm validate(values)
//   Trả về object errors (rỗng = hợp lệ).
//   Quy tắc:
//   - name:     không được rỗng, ít nhất 3 kí tự, không chứa số, không kí tự đặc biệt
//   - email:    phải chứa '@' và đúng định dạng email
//   - password: ít nhất 6 ký tự + ít nhất 1 hoa, 1 thường, 1 số, 1 kí tự đặc biệt
//   - confirm:  phải bằng values.password
// ─────────────────────────────────────────────
function validate(values) {
  const errors = {}
  
  // Validate name: không rỗng, ≥3 chars, không số, không kí tự đặc biệt
  if (!values.name.trim()) {
    errors.name = 'Vui lòng nhập họ tên.'
  } else if (values.name.trim().length < 3) {
    errors.name = 'Họ tên phải có ít nhất 3 ký tự.'
  } else if (/\d/.test(values.name)) {
    errors.name = 'Họ tên không được chứa số.'
  } else if (!/^[a-zA-Z\s]+$/.test(values.name)) {
    errors.name = 'Họ tên không được chứa kí tự đặc biệt.'
  }
  
  // Validate email: phải chứa @ và đúng định dạng
  if (!values.email.trim()) {
    errors.email = 'Vui lòng nhập email.'
  } else if (!values.email.includes('@')) {
    errors.email = 'Email phải chứa @.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Email không đúng định dạng.'
  }
  
  // Validate password: ≥6 chars, 1 hoa, 1 thường, 1 số, 1 kí tự đặc biệt
  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu.'
  } else {
    const password = values.password
    if (password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.'
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'Mật khẩu phải có ít nhất 1 ký tự hoa.'
    } else if (!/[a-z]/.test(password)) {
      errors.password = 'Mật khẩu phải có ít nhất 1 ký tự thường.'
    } else if (!/\d/.test(password)) {
      errors.password = 'Mật khẩu phải có ít nhất 1 ký tự số.'
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.password = 'Mật khẩu phải có ít nhất 1 kí tự đặc biệt.'
    }
  }
  
  // Validate confirm
  if (values.confirm !== values.password) {
    errors.confirm = 'Mật khẩu xác nhận không khớp.'
  }
  
  return errors
}

// ─────────────────────────────────────────────
// TODO 3: Viết reducer(state, action)
//
//   Case 'SET_FIELD':
//     - action.payload = { field, value }  (field là tên trường, vd 'name')
//     - Cập nhật values[field] = value
//     - Đánh dấu touched[field] = true
//     - Tính lại errors bằng validate() với values MỚI
//     (Dùng computed property name: { ...state.values, [action.payload.field]: action.payload.value })
//
//   Case 'SUBMIT':
//     - Tính lại errors
//     - Đánh dấu tất cả touched = { name: true, email: true, password: true, confirm: true }
//     - submitted = true nếu Object.keys(errors).length === 0
//
//   Case 'RESET':
//     - Trả về initialState
// ─────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD': {
      const values = {
        ...state.values,
        [action.payload.field]: action.payload.value,
      }
      return {
        ...state,
        values,
        touched: {
          ...state.touched,
          [action.payload.field]: true,
        },
        errors: validate(values),
      }
    }
    case 'SUBMIT': {
      const errors = validate(state.values)
      return {
        ...state,
        errors,
        touched: {
          name: true,
          email: true,
          password: true,
          confirm: true,
        },
        submitted: Object.keys(errors).length === 0,
      }
    }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default function Ex05_FormValidation() {
  // TODO 4: Gọi useReducer(reducer, initialState)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  // Handle modal close and redirect to home
  useEffect(() => {
    if (state.submitted && showModal) {
      const timer = setTimeout(() => {
        setShowModal(false)
        dispatch({ type: 'RESET' })
        navigate('/home')
      }, 3000) // Redirect after 3 seconds
      return () => clearTimeout(timer)
    }
  }, [state.submitted, showModal, navigate])

  // Helper: trả về thông báo lỗi nếu field đã được touch
  // TODO 5: Hoàn thiện hàm getError
  function getError(field) {
    return state.touched[field] ? state.errors[field] : undefined
  }

  // ─────────────────────────────────────────────
  // TODO 6: Viết hàm handleChange(e)
  //   - Lấy { name, value } từ e.target
  //   - dispatch({ type: 'SET_FIELD', payload: { field: name, value } })
  // ─────────────────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target
    dispatch({ type: 'SET_FIELD', payload: { field: name, value } })
  }

  // ─────────────────────────────────────────────
  // TODO 7: Viết hàm handleSubmit(e)
  //   - e.preventDefault()
  //   - dispatch({ type: 'SUBMIT' })
  // ─────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: 'SUBMIT' })
    
    // Check if form is valid after submit
    const errors = validate(state.values)
    if (Object.keys(errors).length === 0) {
      setShowModal(true)
    }
  }

  return (
    <>
      <Card className="mx-auto" style={{ maxWidth: 480 }}>
        <Card.Header><strong>Bài 5 – Form Validation</strong></Card.Header>
        <Card.Body>

          {!state.submitted && (
            <>
              {/* TODO 8: Gắn handleSubmit vào onSubmit */}
              <Form onSubmit={handleSubmit} data-testid="register-form" noValidate>

                {/* Trường name */}
                <Form.Group className="mb-3">
                  <Form.Label>Họ tên</Form.Label>
                  {/* TODO 9: value, name="name", onChange=handleChange */}
                  <Form.Control
                    data-testid="input-name"
                    name="name"
                    placeholder="Họ và tên"
                    value={state.values.name}
                    onChange={handleChange}
                    isInvalid={!!getError('name')}
                  />
                  <Form.Control.Feedback type="invalid" data-testid="error-name">
                    {getError('name')}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Trường email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  {/* TODO 10: value, name="email", onChange=handleChange */}
                  <Form.Control
                    type="email"
                    data-testid="input-email"
                    name="email"
                    placeholder="email@example.com"
                    value={state.values.email}
                    onChange={handleChange}
                    isInvalid={!!getError('email')}
                  />
                  <Form.Control.Feedback type="invalid" data-testid="error-email">
                    {getError('email')}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Trường password */}
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  {/* TODO 11: value, name="password", onChange=handleChange */}
                  <Form.Control
                    type="password"
                    data-testid="input-password"
                    name="password"
                    placeholder="Tối thiểu 6 ký tự, có hoa, thường, số, kí tự đặc biệt"
                    value={state.values.password}
                    onChange={handleChange}
                    isInvalid={!!getError('password')}
                  />
                  <Form.Control.Feedback type="invalid" data-testid="error-password">
                    {getError('password')}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Trường confirm */}
                <Form.Group className="mb-3">
                  <Form.Label>Xác nhận mật khẩu</Form.Label>
                  {/* TODO 12: value, name="confirm", onChange=handleChange */}
                  <Form.Control
                    type="password"
                    data-testid="input-confirm"
                    name="confirm"
                    placeholder="Nhập lại mật khẩu"
                    value={state.values.confirm}
                    onChange={handleChange}
                    isInvalid={!!getError('confirm')}
                  />
                  <Form.Control.Feedback type="invalid" data-testid="error-confirm">
                    {getError('confirm')}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  {/* TODO 13: Nút submit */}
                  <Button type="submit" data-testid="btn-submit">Đăng ký</Button>
                  {/* TODO 14: onClick dispatch RESET */}
                  <Button
                    type="button"
                    variant="secondary"
                    data-testid="btn-reset"
                    onClick={() => dispatch({ type: 'RESET' })}
                  >
                    Reset
                  </Button>
                </div>

              </Form>
            </>
          )}

        </Card.Body>
      </Card>

      {/* Success Modal */}
      <Modal show={showModal} centered backdrop="static" keyboard={false}>
        <Modal.Header className="bg-success text-white">
          <Modal.Title>Thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <h5 className="text-success">✓ Đăng ký thành công!</h5>
          <p className="text-muted mt-3">Bạn sẽ được chuyển hướng về trang chủ...</p>
        </Modal.Body>
      </Modal>
    </>
  )
}
