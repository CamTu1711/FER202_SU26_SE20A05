// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyModal from './MyModal'; // Import component Modal thông báo vào đây

function RegistrationForm() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false); // State quản lý trạng thái ẩn/hiện Modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\[\]{}|\\:";'<>?,./~`]).{6,}$/;

    if (!formData.username.trim()) formErrors.username = 'Tên tài khoản không được để trống!';
    
    if (!formData.email.trim()) {
      formErrors.email = 'Địa chỉ email không được để trống!';
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = 'Email không đúng định dạng!';
    }

    if (!formData.password) {
      formErrors.password = 'Mật khẩu không được để trống!';
    } else if (!passwordRegex.test(formData.password)) {
      formErrors.password = 'Mật khẩu từ 6 ký tự, có chữ hoa, thường, số và ký tự đặc biệt!';
    }

    if (!formData.confirmPassword) {
      formErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu!';
    } else if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Mật khẩu xác nhận không trùng khớp!';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true); // Validation Passed -> Bật hiển thị Modal thông báo thay vì Alert
    }
  };

  // Hàm đóng Modal và thực hiện chuyển hướng trang chủ Blog Post
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/home'); // Điều hướng người dùng sang đường dẫn trang chủ Blog
  };

  const handleCancel = () => {
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <Container className="py-5" style={{ maxWidth: '520px' }}>
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white text-center py-3">
          <h4 className="mb-0">🔒 ĐĂNG KÝ HỆ THỐNG</h4>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="regUsername">
              <Form.Label className="fw-bold">Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
                placeholder="Nhập tên đăng nhập"
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="regEmail">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                placeholder="Nhập địa chỉ email"
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="regPassword">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                placeholder="Mật khẩu bảo mật"
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="regConfirmPassword">
              <Form.Label className="fw-bold">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
                placeholder="Nhập lại mật khẩu"
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>

            <Row className="mt-4">
              <Col><Button variant="primary" type="submit" className="w-100 fw-bold">Register</Button></Col>
              <Col><Button variant="secondary" type="button" onClick={handleCancel} className="w-100 fw-bold">Cancel</Button></Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Nhúng Modal thông báo và truyền các thuộc tính điều khiển ẩn hiện */}
      <MyModal show={showModal} handleClose={handleCloseModal} />
    </Container>
  );
}

export default RegistrationForm;