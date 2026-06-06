import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Badge, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Header from '../../landing/components/Header';

const MOCK_AUTHORS = [
  {
    author_id: 1,
    name: "GS. TS. Nguyễn Văn A",
    institution: "Đại học Bách Khoa Hà Nội",
    department: "Viện Công nghệ Thông tin và Truyền thông",
    h_index: 38,
    citations: 4520,
    publications: 124,
    fields: ["Machine Learning", "Computer Vision", "Healthcare AI"],
    avatar_color: "var(--primary)"
  },
  {
    author_id: 2,
    name: "PGS. TS. Trần Thị B",
    institution: "Đại học Quốc gia TP.HCM",
    department: "Khoa Khoa học & Kỹ thuật Máy tính",
    h_index: 29,
    citations: 2980,
    publications: 87,
    fields: ["Natural Language Processing", "Deep Learning", "Data Mining"],
    avatar_color: "#6366f1"
  },
  {
    author_id: 3,
    name: "TS. Lê Văn C",
    institution: "Viện Hàn lâm Khoa học và Công nghệ Việt Nam",
    department: "Viện Vật lý",
    h_index: 22,
    citations: 1850,
    publications: 56,
    fields: ["Quantum Optics", "Nanophotonics", "Laser Physics"],
    avatar_color: "#0ea5e9"
  },
  {
    author_id: 4,
    name: "Dr. Michael Jordan",
    institution: "University of California, Berkeley",
    department: "Department of EECS",
    h_index: 168,
    citations: 215000,
    publications: 650,
    fields: ["Machine Learning", "Optimization", "Statistics"],
    avatar_color: "#f59e0b"
  }
];

export default function AuthorListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAuthors = MOCK_AUTHORS.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.fields.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
          <span className="text-primary">Tác giả nổi bật</span>
        </div>

        {/* Header Section */}
        <div className="mb-4">
          <h1 className="font-display fw-bold text-main mb-1" style={{ fontSize: 'calc(1.5rem + 0.8vw)' }}>
            Danh sách Nhà khoa học & Tác giả
          </h1>
          <p className="text-muted-custom mb-0" style={{ fontSize: '0.9rem' }}>
            Tra cứu thông tin, chỉ số học thuật h-index, số trích dẫn và các công trình khoa học của các tác giả hàng đầu.
          </p>
        </div>

        {/* Search */}
        <div className="mb-4" style={{ maxWidth: '450px' }}>
          <div
            className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <Icon icon="lucide:search" width={16} style={{ color: 'var(--text-muted)' }} />
            <Form.Control
              type="text"
              placeholder="Tìm theo tên, viện nghiên cứu, từ khóa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 bg-transparent p-0 text-main text-sm"
              style={{ outline: 'none', boxShadow: 'none' }}
            />
          </div>
        </div>

        {/* List of Authors */}
        <Row className="g-4">
          {filteredAuthors.map((author) => (
            <Col key={author.author_id} xs={12} md={6}>
              <Card
                className="journal-dark-card shadow-sm h-100 cursor-pointer transition-all"
                onClick={() => navigate(`/authors/${author.author_id}`)}
                style={{ transition: 'all 0.2s', border: '1px solid var(--border)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <Card.Body className="p-4 d-flex gap-3.5">
                  {/* Left Avatar Icon */}
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 text-white font-display fw-bold rounded-circle"
                    style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: author.avatar_color,
                      fontSize: '1.25rem'
                    }}
                  >
                    {author.name.split(' ').pop().charAt(0)}
                  </div>

                  {/* Right Details */}
                  <div className="flex-grow-1">
                    <h3 className="font-display fw-bold text-main mb-1" style={{ fontSize: '1.15rem' }}>
                      {author.name}
                    </h3>
                    <p className="text-xs text-muted-custom mb-1 fw-medium">{author.institution}</p>
                    <p className="text-xxs text-muted mb-3">{author.department}</p>

                    {/* Stats metrics */}
                    <div className="d-flex gap-4 mb-3 py-2 border-top border-bottom" style={{ borderColor: 'var(--border) !important' }}>
                      <div>
                        <div className="text-xxs text-muted uppercase font-bold" style={{ fontSize: '0.6rem' }}>H-Index</div>
                        <div className="text-main fw-bold text-sm">{author.h_index}</div>
                      </div>
                      <div>
                        <div className="text-xxs text-muted uppercase font-bold" style={{ fontSize: '0.6rem' }}>Trích dẫn</div>
                        <div className="text-main fw-bold text-sm">{author.citations.toLocaleString('vi-VN')}</div>
                      </div>
                      <div>
                        <div className="text-xxs text-muted uppercase font-bold" style={{ fontSize: '0.6rem' }}>Bài báo</div>
                        <div className="text-main fw-bold text-sm">{author.publications}</div>
                      </div>
                    </div>

                    {/* Research Fields */}
                    <div className="d-flex flex-wrap gap-1">
                      {author.fields.map((field, idx) => (
                        <Badge key={idx} bg="none" className="sandbox-tag py-1 px-2.5" style={{ fontSize: '0.65rem' }}>
                          {field}
                        </Badge>
                      ))}
                    </div>
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
