// src/component/MyNavbar.jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4">
      <Container>
        {/* Brand text là Pizzas */}
        <Navbar.Brand href="#home" className="fw-bold fs-4 text-warning">
          🍕 Pizzas
        </Navbar.Brand>
        
        {/* Nút toggle để thu gọn menu trên thiết bị di động (Responsive) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Các đường link điều hướng */}
          <Nav className="ms-auto fw-semibold">
            <Nav.Link href="#home" className="px-3">Home</Nav.Link>
            <Nav.Link href="#about" className="px-3">About Us</Nav.Link>
            <Nav.Link href="#contact" className="px-3">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;