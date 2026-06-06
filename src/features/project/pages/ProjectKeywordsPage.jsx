import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, Badge, Alert } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Header from '../../landing/components/Header';

export default function ProjectKeywordsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('researchpulse_mock_projects');
    if (stored) {
      const list = JSON.parse(stored);
      const proj = list.find(p => p.project_id === Number(id));
      if (proj) {
        setProject(proj);
        setKeywords(proj.keywords?.map(k => k.keyword) || []);
      } else if (list.length > 0) {
        setProject(list[0]);
        setKeywords(list[0].keywords?.map(k => k.keyword) || []);
      }
    }
  }, [id]);

  const handleAddKeyword = () => {
    const cleanKw = keywordInput.trim();
    if (cleanKw && !keywords.includes(cleanKw)) {
      setKeywords([...keywords, cleanKw]);
      setKeywordInput('');
    }
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleRemoveKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const stored = localStorage.getItem('researchpulse_mock_projects');
    if (stored) {
      const list = JSON.parse(stored);
      const pIdx = list.findIndex(p => p.project_id === Number(id));
      if (pIdx !== -1) {
        const newId = Date.now();
        list[pIdx].keywords = keywords.map((k, i) => ({
          keyword_id: newId + i,
          keyword: k
        }));
        list[pIdx].updated_at = new Date().toISOString();
        localStorage.setItem('researchpulse_mock_projects', JSON.stringify(list));
        
        setMessage('Lưu cấu hình từ khóa thành công!');
        setTimeout(() => {
          navigate(`/projects/${id}`);
        }, 1200);
      }
    }
  };

  if (!project) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: 'var(--bg-main)' }}>
        <p className="text-muted-custom text-sm">Đang tải...</p>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100"
      style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', paddingTop: '90px' }}
    >
      <Header />

      <Container className="py-4" style={{ maxWidth: '800px' }}>
        {/* Breadcrumbs */}
        <div className="d-flex align-items-center gap-2 mb-4 text-xs font-semibold text-muted-custom">
          <span className="hover:text-main" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>Tổng quan</span>
          <Icon icon="lucide:chevron-right" width="12" />
          <span className="hover:text-main" onClick={() => navigate('/projects')} style={{ cursor: 'pointer' }}>Dự án theo dõi</span>
          <Icon icon="lucide:chevron-right" width="12" />
          <span className="hover:text-main" onClick={() => navigate(`/projects/${id}`)} style={{ cursor: 'pointer' }}>{project.title}</span>
          <Icon icon="lucide:chevron-right" width="12" />
          <span className="text-primary">Quản lý từ khóa</span>
        </div>

        <Card className="border-0 shadow-sm rounded-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <Card.Body className="p-4 p-md-5">
            <div className="mb-4">
              <h2 className="font-display fw-bold text-main mb-1" style={{ fontSize: '1.6rem' }}>
                Quản lý từ khóa theo dõi
              </h2>
              <p className="text-muted-custom text-sm mb-0">
                Thêm hoặc xóa các cụm từ khóa nghiên cứu để tối ưu hóa nguồn bài báo và cảnh báo liên quan.
              </p>
            </div>

            {message && (
              <Alert variant="success" className="border-0 py-2.5 text-sm mb-4">
                <Icon icon="lucide:check-circle" className="me-2" width={16} />
                {message}
              </Alert>
            )}

            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group className="mb-4">
                <Form.Label className="text-xs font-bold text-main text-uppercase mb-2" style={{ letterSpacing: '0.05em' }}>
                  Thêm từ khóa mới
                </Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Ví dụ: Transformer, Large Language Models..."
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleKeywordKeyDown}
                    className="px-3 py-2 border text-sm"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border)',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                    }}
                  />
                  <Button
                    className="btn-dark-solid px-4 text-xs font-bold border-0"
                    onClick={handleAddKeyword}
                    style={{ borderRadius: 8 }}
                  >
                    Thêm
                  </Button>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="text-xs font-bold text-main text-uppercase mb-2.5" style={{ letterSpacing: '0.05em' }}>
                  Danh sách từ khóa đang hoạt động ({keywords.length})
                </Form.Label>

                <div
                  className="d-flex flex-wrap gap-2 p-3 border rounded-3"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                    minHeight: '120px',
                  }}
                >
                  {keywords.map((kw, index) => (
                    <Badge
                      key={index}
                      bg="none"
                      className="d-flex align-items-center gap-1.5 px-3 py-2 text-xs text-primary"
                      style={{
                        backgroundColor: 'var(--primary-light)',
                        border: '1px solid rgba(255, 122, 51, 0.2)',
                        borderRadius: '6px',
                      }}
                    >
                      <span>{kw}</span>
                      <Icon
                        icon="lucide:x"
                        className="text-primary hover:text-danger"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRemoveKeyword(index)}
                      />
                    </Badge>
                  ))}

                  {keywords.length === 0 && (
                    <span className="text-muted-custom text-xs italic m-auto">
                      Chưa có từ khóa nào được đăng ký. Hãy thêm một vài từ khóa bên trên!
                    </span>
                  )}
                </div>
              </Form.Group>

              {/* Action Buttons */}
              <div className="d-flex align-items-center justify-content-end gap-3 pt-4 border-top mt-5" style={{ borderColor: 'var(--border) !important' }}>
                <Button
                  variant="outline-secondary"
                  className="px-4 py-2 border-secondary text-main text-sm"
                  onClick={() => navigate(`/projects/${id}`)}
                  style={{ borderRadius: 8 }}
                >
                  Quay lại
                </Button>
                <Button
                  className="btn-primary-glow px-4 py-2 text-sm border-0 d-flex align-items-center gap-2"
                  onClick={handleSave}
                  style={{ borderRadius: 8 }}
                >
                  <Icon icon="lucide:save" width={16} />
                  <span>Lưu thay đổi</span>
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
