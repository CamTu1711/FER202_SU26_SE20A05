// src/component/MyCarousel.jsx
import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap'; // Import Carousel từ react-bootstrap
import { bannerData } from '../data/bannerData';
import MyModal from './MyModal';

const MyCarousel = () => {
  // State quản lý đóng/mở Modal chi tiết
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State lưu thông tin banner đang được chọn để truyền vào modal
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleOpenModal = (banner) => {
    setSelectedBanner(banner);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBanner(null);
  };

  return (
    <div className="container my-4">
      
      <Carousel 
        interval={3000} 
        fade 
        indicators={true} 
        controls={true} 
        className="shadow-sm rounded overflow-hidden"
      >
        {bannerData.map((banner) => (
          <Carousel.Item key={banner.id}>
            {/* Vùng ảnh nền của Banner */}
            <img
              src={`${process.env.PUBLIC_URL}${banner.imageSrc}`}
              className="d-block w-100"
              alt={banner.title}
              style={{ height: '450px', objectFit: 'cover', filter: 'brightness(75%)' }}
            />
            
            {/* Phần chữ và button đè lên trên ảnh */}
            <Carousel.Caption className="d-flex flex-column align-items-center justify-content-center h-100 pb-5">
              <h2 className="fw-bold display-5 text-white mb-2" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                {banner.title}
              </h2>
              <p className="fs-5 text-light mb-4 text-center max-width-600" style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.7)' }}>
                {banner.description}
              </p>
              
              {/* Nút View Details nằm gọn trong Caption */}
              <button
                className="btn btn-warning btn-lg fw-bold px-4 shadow-sm"
                onClick={() => handleOpenModal(banner)}
              >
                View Details
              </button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Reusable Modal hiển thị thông tin chi tiết */}
      <MyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedBanner?.title || "Detail Info"}
      >
        {selectedBanner && (
          <div className="text-center">
            <img
              src={`${process.env.PUBLIC_URL}${selectedBanner.imageSrc}`}
              alt={selectedBanner.title}
              className="img-fluid rounded mb-3 shadow-sm"
              style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }}
            />
            <div className="p-2">
              <p><strong>Mã sản phẩm:</strong> <span className="badge bg-secondary">{selectedBanner.id}</span></p>
              <p className="text-muted italic">"{selectedBanner.description}"</p>
              <p className="text-success fw-bold m-0">✨ Khuyến mãi đặc biệt chỉ có trong tuần này! ✨</p>
            </div>
          </div>
        )}
      </MyModal>
    </div>
  );
};

export default MyCarousel;