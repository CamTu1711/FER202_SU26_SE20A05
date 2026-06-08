// src/App.js
import React from 'react';
import MyNavbar from './component/MyNavbar'; // Import Navbar mới vào đây
import Footer from './component/Footer'; 
import MyPizza from './component/MyPizza'; 
import MyCarousel from './component/MyCarousel'; 
import MyModal from './component/MyModal';
import { pizzaData } from './data/pizzaData'; 
import { Row, Col } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  const [modalState, setModalState] = React.useState({
    isOpen: false,
    title: 'Thông tin',
    content: null,
    footer: null,
    size: '',
  });

  const profile = {
    id: "DE200396", 
    name: "Huỳnh Ngô Cẩm Tú", 
    email: "camtu.shops@gmail.com", 
    githubLink: "https://github.com/fudn-traltb-su26/fer202-se20a05-exercisejsx-CamTu1711.git", 
    avatarSrc: "/images/avatar1.jpg"
  };

  const openModal = ({ title, content, footer, size }) => {
    setModalState({
      isOpen: true,
      title,
      content,
      footer,
      size,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="App"> 
      {/* 1. Gọi Navbar component ở trên cùng */}
      <MyNavbar />

      {/* Container chính bao bọc nội dung */}
      <div className="container">
        
        {/* 2. Hiển thị khu vực Carousel/Banner đặc sắc */}
        <section className="mb-5">
          <MyCarousel />
        </section>

        <div className="text-center mb-4">
          <button
            className="btn btn-outline-primary"
            onClick={() =>
              openModal({
                title: 'Giới thiệu cửa hàng',
                content: (
                  <div>
                    <p className="mb-2">
                      Chào mừng bạn đến với cửa hàng pizza phong cách React! Tất cả món ăn đều được cập nhật và chọn lọc kỹ lưỡng.
                    </p>
                    <p className="mb-0">
                      Tác giả: <strong>{profile.name}</strong> - Email: <strong>{profile.email}</strong>
                    </p>
                  </div>
                ),
                footer: (
                  <button type="button" className="btn btn-success" onClick={closeModal}>
                    Tôi đã hiểu
                  </button>
                ),
                size: 'lg',
              })
            }
          >
            Xem chi tiết cửa hàng
          </button>
        </div>

        <hr className="my-5" />

        {/* 3. Khu vực Danh sách sản phẩm nổi bật */}
        <section className="mb-5">
          <h2 className="text-danger mb-4 text-center fw-bold">🍕 Danh Sách Sản Phẩm Nổi Bật 🍕</h2>
          
          <Row className="g-4 justify-content-center">
            {pizzaData.map((item) => (
              <Col key={item.id} sm={12} md={6} lg={4} className="d-flex justify-content-center">
                <MyPizza pizza={item} />
              </Col>
            ))}
          </Row>
        </section>

      </div>

      <MyModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        footer={modalState.footer}
        size={modalState.size}
      >
        {modalState.content}
      </MyModal>

      {/* 4. Gọi component Footer dưới đáy trang */}
      <Footer profile={profile} />
    </div>
  );
}

export default App;