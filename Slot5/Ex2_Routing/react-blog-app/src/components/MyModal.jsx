import { Modal, Button } from 'react-bootstrap'; // <- Thêm dòng này vào đầu file

function MyModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="text-success fw-bold">🎉 Thành Công</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-4">
        <p className="fs-5 mb-0 fw-semibold text-dark">Đăng ký tài khoản thành công!</p>
        <small className="text-muted">Hệ thống chuẩn bị chuyển hướng bạn về Trang chủ Blog.</small>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose} className="px-4 fw-bold">
          Đi tới Blog Post →
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;