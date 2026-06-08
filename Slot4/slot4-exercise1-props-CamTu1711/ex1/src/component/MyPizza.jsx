import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function MyPizza({ pizza }) {
  // Phòng lỗi nếu App.js chưa truyền dữ liệu qua kịp
  if (!pizza) return <p className="text-center text-warning">Đang tải dữ liệu món ăn...</p>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card style={{ width: '18rem' }} className="shadow-sm text-start mx-auto">
<Card.Img variant="top" src={pizza.imageSrc} alt={pizza.name} />            <Card.Body>
              <Card.Title className="text-success font-weight-bold">{pizza.name}</Card.Title>
              <Card.Text>
                <strong>ID:</strong> {pizza.id} <br />
                <strong>Mô tả:</strong> {pizza.description} <br />
                <strong>Giá cũ:</strong> <del className="text-muted">{pizza.oldPrice}</del> <br />
                <strong>Giá mới:</strong> <span className="text-danger font-weight-bold">{pizza.newPrice}</span> <br />
                <span className="badge bg-warning text-dark mt-2">{pizza.tag}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MyPizza;