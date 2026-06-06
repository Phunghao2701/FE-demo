import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Header from '../../landing/components/Header';

const SUBJECT_AREAS = [
  'Computer Science',
  'Medicine & Health Sciences',
  'Engineering & Technology',
  'Social Sciences',
  'Mathematics & Physics',
  'Chemistry & Materials Science',
  'Environmental Sciences',
  'Business, Management & Economics',
];

const PRESET_KEYWORDS = {
  'Computer Science': ['Machine Learning', 'Artificial Intelligence', 'Cybersecurity', 'Blockchain', 'Cloud Computing', 'Computer Vision', 'NLP'],
  'Medicine & Health Sciences': ['Oncology', 'Cardiology', 'Immunology', 'Genetics', 'Neuroscience', 'Virology', 'Epidemiology'],
  'Engineering & Technology': ['Robotics', 'IoT', 'Renewable Energy', 'Nanotechnology', 'Smart Grids', 'Aerospace Engineering'],
  'Social Sciences': ['Sociology', 'Psychology', 'Education Policy', 'Anthropology', 'Linguistics', 'Political Science'],
  'Mathematics & Physics': ['Quantum Mechanics', 'String Theory', 'Data Analysis', 'Topology', 'Mathematical Modeling', 'Astrophysics'],
  'Chemistry & Materials Science': ['Graphene', 'Organic Chemistry', 'Polymers', 'Catalysis', 'Electrochemistry', 'Nanomaterials'],
  'Environmental Sciences': ['Climate Change', 'Biodiversity', 'Marine Biology', 'Sustainable Development', 'Hydrology'],
  'Business, Management & Economics': ['Microeconomics', 'Finance', 'Supply Chain', 'FinTech', 'E-commerce', 'Consumer Behavior'],
};

export default function ProjectCreatePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [subjectArea, setSubjectArea] = useState(SUBJECT_AREAS[0]);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [validationError, setValidationError] = useState('');

  const handleAddKeyword = (kw) => {
    const cleanKw = kw.trim();
    if (cleanKw && !keywords.includes(cleanKw)) {
      setKeywords([...keywords, cleanKw]);
    }
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (keywordInput.trim()) {
        handleAddKeyword(keywordInput);
        setKeywordInput('');
      }
    }
  };

  const handleRemoveKeyword = (indexToRemove) => {
    setKeywords(keywords.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!title.trim()) {
      setValidationError('Vui lòng nhập tên dự án.');
      return;
    }

    const stored = localStorage.getItem('researchpulse_mock_projects');
    const projects = stored ? JSON.parse(stored) : [];
    
    const newId = Date.now();
    const newProj = {
      project_id: newId,
      title: title.trim(),
      subject_area: subjectArea,
      keywords: keywords.map((k, i) => ({
        keyword_id: newId + i,
        keyword: k
      })),
      updated_at: new Date().toISOString()
    };

    projects.push(newProj);
    localStorage.setItem('researchpulse_mock_projects', JSON.stringify(projects));
    
    navigate(`/projects/${newId}`);
  };

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
          <span className="text-primary">Tạo dự án</span>
        </div>

        <Card className="border-0 shadow-sm rounded-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border) !important' }}>
          <Card.Body className="p-4 p-md-5">
            <div className="mb-4">
              <h2 className="font-display fw-bold text-main mb-1" style={{ fontSize: '1.8rem' }}>
                Khởi tạo dự án nghiên cứu mới
              </h2>
              <p className="text-muted-custom text-sm mb-0">
                Thiết lập không gian làm việc để tự động theo dõi xu hướng, nhận cảnh báo bài viết khoa học và giám sát từ khóa.
              </p>
            </div>

            {validationError && (
              <Alert variant="warning" className="border-0 text-sm py-2.5">
                <Icon icon="lucide:alert-circle" className="me-2" width={16} />
                {validationError}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              {/* Project Name */}
              <Form.Group className="mb-4" controlId="projectTitle">
                <Form.Label className="text-xs font-bold text-main text-uppercase mb-1.5" style={{ letterSpacing: '0.05em' }}>
                  Tên dự án <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ví dụ: Nghiên cứu ứng dụng Deep Learning trong Y học"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-3 py-2.5 border text-sm"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                    color: 'var(--text-main)',
                  }}
                />
              </Form.Group>

              {/* Subject Area */}
              <Form.Group className="mb-4" controlId="projectSubjectArea">
                <Form.Label className="text-xs font-bold text-main text-uppercase mb-1.5" style={{ letterSpacing: '0.05em' }}>
                  Lĩnh vực nghiên cứu chính
                </Form.Label>
                <Form.Select
                  value={subjectArea}
                  onChange={(e) => {
                    setSubjectArea(e.target.value);
                    setKeywords([]); // Reset keywords on area change to suggest new ones
                  }}
                  className="px-3 py-2.5 border text-sm"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                    color: 'var(--text-main)',
                  }}
                >
                  {SUBJECT_AREAS.map((area, idx) => (
                    <option key={idx} value={area}>{area}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Keywords tracking */}
              <Form.Group className="mb-4" controlId="projectKeywords">
                <Form.Label className="text-xs font-bold text-main text-uppercase mb-1" style={{ letterSpacing: '0.05em' }}>
                  Từ khóa muốn theo dõi
                </Form.Label>
                <p className="text-muted-custom text-xxs mb-2" style={{ fontSize: '0.75rem' }}>
                  Nhấn Enter hoặc gõ dấu phẩy để thêm từ khóa. Hệ thống sẽ quét các bài báo mới dựa trên các từ khóa này.
                </p>

                <div
                  className="d-flex flex-wrap align-items-center gap-2 p-2 border rounded-3 mb-2"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                    minHeight: '45px',
                  }}
                >
                  {keywords.map((kw, idx) => (
                    <Badge
                      key={idx}
                      bg="none"
                      className="d-flex align-items-center gap-1.5 px-2.5 py-1.5 text-xs text-primary"
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
                        onClick={() => handleRemoveKeyword(idx)}
                      />
                    </Badge>
                  ))}
                  <input
                    type="text"
                    placeholder={keywords.length === 0 ? "Thêm từ khóa và nhấn Enter..." : ""}
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleKeywordKeyDown}
                    className="border-0 bg-transparent text-sm flex-grow-1"
                    style={{ outline: 'none', color: 'var(--text-main)', minWidth: '150px' }}
                  />
                </div>

                {/* Preset suggestions */}
                {PRESET_KEYWORDS[subjectArea] && (
                  <div className="mt-3">
                    <span className="text-muted-custom text-xxs d-block mb-1.5" style={{ fontSize: '0.75rem' }}>Gợi ý từ khóa cho {subjectArea}:</span>
                    <div className="d-flex flex-wrap gap-1.5">
                      {PRESET_KEYWORDS[subjectArea]
                        .filter(kw => !keywords.includes(kw))
                        .map((kw, idx) => (
                          <Badge
                            key={idx}
                            bg="none"
                            className="px-2.5 py-1.5 text-xs sandbox-tag"
                            style={{ cursor: 'pointer', borderRadius: '6px' }}
                            onClick={() => handleAddKeyword(kw)}
                          >
                            + {kw}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
              </Form.Group>

              {/* Action Buttons */}
              <div className="d-flex align-items-center justify-content-end gap-3 pt-4 border-top mt-5" style={{ borderColor: 'var(--border) !important' }}>
                <Button
                  variant="outline-secondary"
                  className="px-4 py-2 border-secondary text-main text-sm"
                  onClick={() => navigate('/projects')}
                  style={{ borderRadius: 8 }}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="btn-primary-glow px-4 py-2 text-sm d-flex align-items-center gap-2 border-0"
                  style={{ borderRadius: 8 }}
                >
                  <Icon icon="lucide:check" width={16} />
                  <span>Tạo dự án</span>
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
