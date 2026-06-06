import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Header from '../../landing/components/Header';

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const MENU_ITEMS = [
    {
      title: "Quản lý Tạp chí",
      desc: "Thêm, sửa, xóa thông tin tạp chí khoa học, xếp hạng SJR, H-index.",
      icon: "lucide:book-open",
      path: "/admin/journals",
      color: "var(--primary)"
    },
    {
      title: "Quản lý Bài báo",
      desc: "Quản lý dữ liệu bài báo khoa học, abstract, tác giả và trích dẫn.",
      icon: "lucide:file-text",
      path: "/admin/articles",
      color: "#6366f1"
    },
    {
      title: "Quản lý Volume & Issue",
      desc: "Tổ chức các số xuất bản, tập tạp chí khoa học theo năm.",
      icon: "lucide:layers",
      path: "/admin/volumes",
      color: "#0ea5e9"
    }
  ];

  return (
    <div
      className="min-vh-100"
      style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', paddingTop: '90px' }}
    >
      <Header />

      <Container className="py-4">
        {/* Breadcrumbs */}
        <div className="d-flex align-items-center gap-2 mb-4 text-xs font-semibold text-muted-custom">
          <span className="hover:text-main" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>Tổng quan</span>
          <Icon icon="lucide:chevron-right" width="12" />
          <span className="text-primary">Bảng điều khiển Admin</span>
        </div>

        {/* Header Section */}
        <div className="mb-4">
          <h1 className="font-display fw-bold text-main mb-1" style={{ fontSize: 'calc(1.5rem + 0.8vw)' }}>
            Quản trị Hệ thống
          </h1>
          <p className="text-muted-custom mb-0" style={{ fontSize: '0.9rem' }}>
            Hệ thống quản lý CRUD dữ liệu Tạp chí, Bài viết khoa học, Tập & Số xuất bản.
          </p>
        </div>

        {/* Quick Metrics */}
        <Row className="g-4 mb-5">
          <Col xs={12} sm={6} md={3}>
            <Card className="border-0 shadow-sm rounded-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Card.Body className="p-3.5">
                <div className="text-xxs font-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em' }}>Tổng số tạp chí</div>
                <div className="text-main fw-bold" style={{ fontSize: '1.4rem' }}>2,450</div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="border-0 shadow-sm rounded-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Card.Body className="p-3.5">
                <div className="text-xxs font-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em' }}>Tổng số bài viết</div>
                <div className="text-main fw-bold" style={{ fontSize: '1.4rem' }}>45,820</div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="border-0 shadow-sm rounded-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Card.Body className="p-3.5">
                <div className="text-xxs font-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em' }}>Số xuất bản (Volume)</div>
                <div className="text-main fw-bold" style={{ fontSize: '1.4rem' }}>12,400</div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="border-0 shadow-sm rounded-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Card.Body className="p-3.5">
                <div className="text-xxs font-bold text-muted text-uppercase mb-1" style={{ letterSpacing: '0.05em' }}>Trạng thái Crawler</div>
                <div className="text-success fw-bold d-flex align-items-center gap-1.5" style={{ fontSize: '1.2rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2fc646' }} />
                  Đang hoạt động
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Navigation Admin Menu */}
        <h3 className="font-display fw-bold text-main mb-3" style={{ fontSize: '1.15rem' }}>
          Danh mục Quản lý
        </h3>
        <Row className="g-4">
          {MENU_ITEMS.map((item, idx) => (
            <Col key={idx} xs={12} md={4}>
              <Card
                onClick={() => navigate(item.path)}
                className="journal-dark-card shadow-sm h-100 cursor-pointer transition-all"
                style={{ transition: 'all 0.2s', border: '1px solid var(--border)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <Card.Body className="p-4 d-flex flex-column justify-content-between" style={{ minHeight: '180px' }}>
                  <div>
                    <div
                      className="d-flex align-items-center justify-content-center mb-3 text-white rounded-3"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: item.color
                      }}
                    >
                      <Icon icon={item.icon} width={20} />
                    </div>
                    <h4 className="font-display fw-bold text-main mb-1.5" style={{ fontSize: '1.1rem' }}>
                      {item.title}
                    </h4>
                    <p className="text-muted-custom text-xs mb-0" style={{ fontSize: '0.78rem' }}>
                      {item.desc}
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-1 text-xs text-primary font-bold pt-3 border-top mt-3" style={{ borderColor: 'var(--border) !important' }}>
                    <span>Truy cập quản lý</span>
                    <Icon icon="lucide:arrow-right" width={12} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
