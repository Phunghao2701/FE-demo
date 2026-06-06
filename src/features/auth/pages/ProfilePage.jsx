import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Header from '../../landing/components/Header';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('Phùng Hào');
  const [email, setEmail] = useState('phunghao2701@gmail.com');
  const [role, setRole] = useState('Nhà nghiên cứu');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load existing profile from localStorage if any
    const storedUser = localStorage.getItem('researchpulse_user_profile');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setName(parsed.name || 'Phùng Hào');
      setEmail(parsed.email || 'phunghao2701@gmail.com');
      setRole(parsed.role || 'Nhà nghiên cứu');
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const profile = { name, email, role };
    localStorage.setItem('researchpulse_user_profile', JSON.stringify(profile));
    
    // Also update login token structure if it exists
    const userSession = localStorage.getItem('researchpulse_user');
    if (userSession) {
      try {
        const parsed = JSON.parse(userSession);
        parsed.name = name;
        parsed.email = email;
        localStorage.setItem('researchpulse_user', JSON.stringify(parsed));
      } catch (err) {}
    }

    setMessage('Cập nhật hồ sơ cá nhân thành công!');
    setTimeout(() => {
      setMessage('');
    }, 2500);
  };

  return (
    <div
      className="min-vh-100"
      style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', paddingTop: '90px' }}
    >
      <Header />

      <Container className="py-4" style={{ maxWidth: '900px' }}>
        {/* Breadcrumbs */}
        <div className="d-flex align-items-center gap-2 mb-4 text-xs font-semibold text-muted-custom">
          <span className="hover:text-main" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>Tổng quan</span>
          <Icon icon="lucide:chevron-right" width="12" />
          <span className="text-primary">Hồ sơ cá nhân</span>
        </div>

        {message && (
          <Alert variant="success" className="border-0 py-2.5 text-sm mb-4">
            <Icon icon="lucide:check-circle" className="me-2" width={16} />
            {message}
          </Alert>
        )}

        <Row className="g-4">
          {/* Left Column: Avatar Banner */}
          <Col xs={12} md={4}>
            <Card className="border-0 shadow-sm rounded-4 text-center p-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Card.Body className="d-flex flex-column align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center text-white font-display fw-bold rounded-circle mb-3"
                  style={{
                    width: '90px',
                    height: '90px',
                    backgroundColor: 'var(--primary)',
                    fontSize: '2rem'
                  }}
                >
                  {name.split(' ').pop().charAt(0)}
                </div>

                <h3 className="font-display fw-bold text-main mb-1" style={{ fontSize: '1.3rem' }}>
                  {name}
                </h3>
                <p className="text-xs text-muted-custom mb-3">{role}</p>

                <div className="w-100 text-start border-top pt-3 mt-3" style={{ borderColor: 'var(--border) !important' }}>
                  <div className="text-xxs text-muted uppercase font-bold mb-1" style={{ fontSize: '0.65rem' }}>Hoạt động</div>
                  <div className="d-flex justify-content-between text-xs text-main mb-2">
                    <span>Dự án đang theo dõi</span>
                    <span className="fw-bold">2</span>
                  </div>
                  <div className="d-flex justify-content-between text-xs text-main">
                    <span>Từ khóa đã lưu</span>
                    <span className="fw-bold">5</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column: Edit Profile Form */}
          <Col xs={12} md={8}>
            <Card className="border-0 shadow-sm rounded-4 h-100" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Card.Body className="p-4 p-md-5">
                <h3 className="font-display fw-bold text-main mb-4" style={{ fontSize: '1.25rem' }}>
                  Thông tin tài khoản
                </h3>

                <Form onSubmit={handleSave}>
                  <Row className="g-3">
                    <Col xs={12} sm={6}>
                      <Form.Group controlId="profileName">
                        <Form.Label className="text-xs font-bold text-main text-uppercase mb-1.5" style={{ letterSpacing: '0.05em' }}>
                          Họ và Tên
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="px-3 py-2 border text-sm"
                          style={{
                            backgroundColor: 'var(--bg-card)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            color: 'var(--text-main)',
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} sm={6}>
                      <Form.Group controlId="profileRole">
                        <Form.Label className="text-xs font-bold text-main text-uppercase mb-1.5" style={{ letterSpacing: '0.05em' }}>
                          Vai trò / Chức danh
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="px-3 py-2 border text-sm"
                          style={{
                            backgroundColor: 'var(--bg-card)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            color: 'var(--text-main)',
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="profileEmail">
                        <Form.Label className="text-xs font-bold text-main text-uppercase mb-1.5" style={{ letterSpacing: '0.05em' }}>
                          Địa chỉ Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="px-3 py-2 border text-sm"
                          style={{
                            backgroundColor: 'var(--bg-card)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            color: 'var(--text-main)',
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex align-items-center justify-content-end gap-3 pt-4 border-top mt-5" style={{ borderColor: 'var(--border) !important' }}>
                    <Button
                      type="submit"
                      className="btn-primary-glow px-4 py-2 text-sm border-0 d-flex align-items-center gap-2"
                      style={{ borderRadius: 8 }}
                    >
                      <Icon icon="lucide:save" width={16} />
                      <span>Lưu thay đổi</span>
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
