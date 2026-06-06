import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Table, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Header from '../../landing/components/Header';

const MOCK_AUTHORS = {
  1: {
    name: "GS. TS. Nguyễn Văn A",
    institution: "Đại học Bách Khoa Hà Nội",
    department: "Viện Công nghệ Thông tin và Truyền thông",
    email: "a.nguyenvan@hust.edu.vn",
    h_index: 38,
    citations: 4520,
    publications: 124,
    fields: ["Machine Learning", "Computer Vision", "Healthcare AI"],
    avatar_color: "var(--primary)",
    articles: [
      { id: 101, title: "Attention Is All You Need for Medical Image Classification", journal: "IEEE Transactions on Pattern Analysis and Machine Intelligence", year: 2026, citations: 42 },
      { id: 104, title: "Deep Convolutional Neural Networks for Malaria Detection", journal: "Computer Methods and Programs in Biomedicine", year: 2024, citations: 118 },
      { id: 105, title: "A Survey of Federated Learning Paradigms in Healthcare", journal: "Future Generation Computer Systems", year: 2023, citations: 230 }
    ]
  },
  2: {
    name: "PGS. TS. Trần Thị B",
    institution: "Đại học Quốc gia TP.HCM",
    department: "Khoa Khoa học & Kỹ thuật Máy tính",
    email: "ttb@vnuhcm.edu.vn",
    h_index: 29,
    citations: 2980,
    publications: 87,
    fields: ["Natural Language Processing", "Deep Learning", "Data Mining"],
    avatar_color: "#6366f1",
    articles: [
      { id: 106, title: "Contextualized Vietnamese Word Embeddings for Sentiment Analysis", journal: "IEEE Access", year: 2025, citations: 35 },
      { id: 107, title: "Transformer-Based Summarization of Legal Documents", journal: "Information Processing & Management", year: 2024, citations: 72 }
    ]
  }
};

export default function AuthorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const author = MOCK_AUTHORS[id] || MOCK_AUTHORS[1];

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
          <span className="hover:text-main" onClick={() => navigate('/authors')} style={{ cursor: 'pointer' }}>Tác giả nổi bật</span>
          <Icon icon="lucide:chevron-right" width="12" />
          <span className="text-primary">{author.name}</span>
        </div>

        <Row className="g-4">
          {/* Left Column: Profile Card */}
          <Col xs={12} lg={4}>
            <Card className="border-0 shadow-sm rounded-4 text-center p-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Card.Body className="d-flex flex-column align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center text-white font-display fw-bold rounded-circle mb-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: author.avatar_color,
                    fontSize: '1.8rem'
                  }}
                >
                  {author.name.split(' ').pop().charAt(0)}
                </div>

                <h2 className="font-display fw-bold text-main mb-1.5" style={{ fontSize: '1.4rem' }}>
                  {author.name}
                </h2>
                <p className="text-sm text-primary fw-semibold mb-1">{author.institution}</p>
                <p className="text-xs text-muted-custom mb-3">{author.department}</p>

                <Badge bg="none" className="mb-4 d-flex align-items-center gap-1.5 text-xxs py-1.5 px-3" style={{ backgroundColor: 'var(--bg-chip)', color: 'var(--text-muted)' }}>
                  <Icon icon="lucide:mail" width="12" />
                  {author.email}
                </Badge>

                {/* Big Stats Row */}
                <Row className="w-100 g-0 py-3 rounded-3 border" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border) !important' }}>
                  <Col xs={4} className="border-end" style={{ borderColor: 'var(--border) !important' }}>
                    <div className="text-xxs text-muted uppercase font-bold mb-0.5" style={{ fontSize: '0.6rem' }}>H-Index</div>
                    <div className="text-main fw-bold" style={{ fontSize: '1.2rem' }}>{author.h_index}</div>
                  </Col>
                  <Col xs={4} className="border-end" style={{ borderColor: 'var(--border) !important' }}>
                    <div className="text-xxs text-muted uppercase font-bold mb-0.5" style={{ fontSize: '0.6rem' }}>Trích dẫn</div>
                    <div className="text-main fw-bold" style={{ fontSize: '1.2rem' }}>{author.citations}</div>
                  </Col>
                  <Col xs={4}>
                    <div className="text-xxs text-muted uppercase font-bold mb-0.5" style={{ fontSize: '0.6rem' }}>Bài báo</div>
                    <div className="text-main fw-bold" style={{ fontSize: '1.2rem' }}>{author.publications}</div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column: Author Publications */}
          <Col xs={12} lg={8}>
            <Card className="border-0 shadow-sm rounded-4 h-100" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Card.Body className="p-4 p-md-5">
                <div className="mb-4">
                  <h3 className="font-display fw-bold text-main mb-1" style={{ fontSize: '1.25rem' }}>
                    Công trình Công bố khoa học
                  </h3>
                  <p className="text-muted-custom text-xs mb-0">Các bài viết và nghiên cứu gần đây được xuất bản.</p>
                </div>

                <div className="d-flex flex-column gap-3.5">
                  {author.articles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => navigate(`/articles/${art.id}`)}
                      className="p-3.5 rounded-3 sandbox-result-item"
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="text-muted-custom text-xxs font-semibold uppercase">{art.journal}</span>
                        <span className="text-muted-custom text-xxs">{art.year}</span>
                      </div>
                      <h4 className="text-main fw-bold mb-2 hover:text-primary transition-colors" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                        {art.title}
                      </h4>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="text-muted-custom text-xxs font-medium">Được trích dẫn: {art.citations} lần</span>
                        <span className="text-xs text-primary font-bold d-flex align-items-center gap-0.5">
                          Chi tiết
                          <Icon icon="lucide:arrow-right" width={12} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
