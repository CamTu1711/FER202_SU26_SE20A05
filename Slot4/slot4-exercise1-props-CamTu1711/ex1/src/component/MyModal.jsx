// src/component/MyModal.jsx
import React from 'react';

// Component modal tái sử dụng, hỗ trợ title, children, footer tùy chỉnh và đóng khi nhấn nền
const MyModal = ({
  isOpen,
  onClose,
  title = 'Thông tin',
  children,
  footer,
  size = '',
  showCloseButton = true,
  closeOnBackdrop = true,
}) => {
  if (!isOpen) return null;

  const dialogClass = ['modal-dialog', 'modal-dialog-centered', size ? `modal-${size}` : '']
    .filter(Boolean)
    .join(' ');

  const handleBackdropClick = (event) => {
    if (!closeOnBackdrop) return;
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      role="dialog"
      onClick={handleBackdropClick}
    >
      <div className={dialogClass} role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            {showCloseButton && (
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            )}
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            {footer || (
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Đóng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;