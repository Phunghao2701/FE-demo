import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Header from '../../landing/components/Header';

const DEFAULT_PROJECTS = [
  {
    project_id: 1,
    title: "Hệ thống khuyến nghị học máy trong y tế",
    subject_area: "Computer Science",
    keywords: [
      { keyword_id: 1, keyword: "Machine Learning" },
      { keyword_id: 2, keyword: "Deep Learning" },
      { keyword_id: 3, keyword: "Healthcare" }
    ],
    updated_at: "2026-06-05T12:00:00Z"
  },
  {
    project_id: 2,
    title: "Phân tích xu hướng biến đổi khí hậu khu vực Đông Nam Á",
    subject_area: "Environmental Sciences",
    keywords: [
      { keyword_id: 4, keyword: "Climate Change" },
      { keyword_id: 5, keyword: "Meteorology" }
    ],
    updated_at: "2026-06-04T08:30:00Z"
  }
];

export default function ProjectListPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('researchpulse_mock_projects');
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      localStorage.setItem('researchpulse_mock_projects', JSON.stringify(DEFAULT_PROJECTS));
      setProjects(DEFAULT_PROJECTS);
    }
  }, []);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này? Thao tác này không thể hoàn tác.')) {
      const updated = projects.filter((p) => p.project_id !== id);
      setProjects(updated);
      localStorage.setItem('researchpulse_mock_projects', JSON.stringify(updated));
    }
  };

  const filteredProjects = projects.filter((p) =>
    (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.subject_area || '').toLowerCase().includes(searchTerm.toLowerCase())
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
          <span className="text-primary">Dự án theo dõi</span>
        </div>

        {/* Header section */}
        <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
          <div>
            <h1 className="font-display fw-bold text-main mb-1" style={{ fontSize: 'calc(1.5rem + 0.8vw)' }}>
              Dự án Nghiên cứu của tôi
            </h1>
            <p className="text-muted-custom mb-0" style={{ fontSize: '0.9rem' }}>
              Quản lý các keyword watch-lists, phân tích xu hướng xuất bản và giám sát bài báo khoa học.
            </p>
          </div>
          <Button
            className="btn-primary-glow d-flex align-items-center gap-2 px-4 py-2.5 border-0 flex-shrink-0"
            onClick={() => navigate('/projects/create')}
            style={{ borderRadius: 10, fontWeight: 600, fontSize: '0.85rem' }}
          >
            <Icon icon="lucide:plus" width={16} />
            Tạo dự án mới
          </Button>
        </div>

        {/* Search & Statistics */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div
            className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 w-100"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              maxWidth: 400,
            }}
          >
            <Icon icon="lucide:search" width={16} style={{ color: 'var(--text-muted)' }} />
            <Form.Control
              type="text"
              placeholder="Tìm kiếm dự án..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 bg-transparent p-0 text-main text-sm"
              style={{ outline: 'none', boxShadow: 'none' }}
            />
          </div>

          <div className="d-flex gap-4 text-xs font-semibold text-muted-custom">
            <div>
              Tổng số dự án: <span className="text-main fw-bold">{projects.length}</span>
            </div>
            <div>
              Đang hoạt động: <span className="text-success fw-bold">{projects.length}</span>
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <Card className="border-0 text-center py-5 rounded-4 shadow-sm" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border) !important' }}>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <div
                className="d-flex align-items-center justify-content-center mb-3 text-muted-custom"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-chip)',
                }}
              >
                <Icon icon="lucide:folder-open" width={32} />
              </div>
              <h5 className="font-display fw-bold mb-1 text-main">Không tìm thấy dự án</h5>
              <p className="text-muted-custom text-sm max-w-sm mb-4">
                {searchTerm ? 'Không tìm thấy kết quả nào phù hợp với tìm kiếm của bạn.' : 'Bạn chưa tạo dự án theo dõi nào. Hãy tạo dự án đầu tiên để theo dõi xu hướng từ khóa!'}
              </p>
              {!searchTerm && (
                <Button
                  className="btn-dark-solid px-4 py-2 text-sm"
                  onClick={() => navigate('/projects/create')}
                  style={{ borderRadius: 8 }}
                >
                  Bắt đầu ngay
                </Button>
              )}
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {filteredProjects.map((project) => {
              const id = project.project_id;
              const keywordsCount = project.keywords?.length ?? 0;
              const keywordsSample = project.keywords?.slice(0, 3) || [];

              return (
                <Col key={id} xs={12} md={6} lg={4}>
                  <Card
                    onClick={() => navigate(`/projects/${id}`)}
                    className="journal-dark-card h-100 position-relative shadow-sm transition-all"
                    style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 122, 51, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-between p-4" style={{ minHeight: '200px' }}>
                      <div>
                        {/* Area Badge & Actions */}
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <Badge
                            bg="none"
                            className="px-2.5 py-1 text-xxs font-bold text-primary"
                            style={{
                              backgroundColor: 'var(--primary-light)',
                              color: 'var(--primary)',
                              fontSize: '0.7rem',
                            }}
                          >
                            {project.subject_area || 'Lĩnh vực khác'}
                          </Badge>
                          <Button
                            variant="link"
                            className="text-muted hover:text-danger p-0"
                            onClick={(e) => handleDelete(e, id)}
                          >
                            <Icon icon="lucide:trash-2" width="16" />
                          </Button>
                        </div>

                        {/* Title */}
                        <h4 className="font-display fw-bold text-main mb-2 line-clamp-2" style={{ fontSize: '1.1rem', lineHeight: '1.4' }}>
                          {project.title}
                        </h4>

                        {/* Keywords list */}
                        <div className="mb-4">
                          <span className="text-muted-custom text-xs d-block mb-1.5">Từ khóa theo dõi ({keywordsCount}):</span>
                          <div className="d-flex flex-wrap gap-1.5">
                            {keywordsSample.length > 0 ? (
                              keywordsSample.map((kw, i) => (
                                <Badge key={i} bg="none" className="px-2 py-1 text-xxs sandbox-tag" style={{ fontSize: '0.65rem' }}>
                                  {kw.keyword}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-muted-custom text-xxs italic">Chưa có từ khóa</span>
                            )}
                            {keywordsCount > 3 && (
                              <Badge bg="none" className="px-2 py-1 text-xxs bg-light text-muted" style={{ fontSize: '0.65rem' }}>
                                +{keywordsCount - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Footer info */}
                      <div className="d-flex justify-content-between align-items-center pt-3 border-top" style={{ borderColor: 'var(--border) !important' }}>
                        <span className="text-muted-custom text-xxs">
                          Cập nhật: {project.updated_at ? new Date(project.updated_at).toLocaleDateString('vi-VN') : 'Mới đây'}
                        </span>
                        <div className="d-flex align-items-center gap-1 text-xs text-primary font-bold">
                          <span>Chi tiết</span>
                          <Icon icon="lucide:arrow-right" width="12" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
}
