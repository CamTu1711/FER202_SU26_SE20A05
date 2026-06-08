import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function MyProfile({ profile }) {
  // Nếu profile bị undefined (chưa truyền tới), tránh việc ứng dụng bị crash gãy code
  if (!profile) return <p className="text-center text-danger">Không tìm thấy dữ liệu cấu hình!</p>;

  // Bóc tách dữ liệu từ object profile ra để hiển thị
  const { id, name, email, githubLink, avatarSrc } = profile;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            {/* avatarSrc sẽ tự lấy đường dẫn chuẩn từ object */}
            <Card.Img variant="top" src={avatarSrc} alt="Avatar" />
            <Card.Body>
              <Card.Title className="text-primary text-center font-weight-bold">{name}</Card.Title>
              <Card.Text>
                <strong>ID:</strong> {id} <br />
                <strong>Email:</strong> {email} <br />
                <strong>GitHub:</strong> <a href={githubLink} target="_blank" rel="noopener noreferrer">My Link GitHub</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MyProfile;