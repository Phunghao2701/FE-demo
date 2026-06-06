import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Nav, Tab, Table, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Header from '../../landing/components/Header';

// Simple Svg Chart component helper
const LINE_COLORS = ['var(--primary)', '#6366f1', '#0ea5e9', '#f59e0b'];
function SimpleSvgChart({ years, series }) {
  if (!years?.length || !series?.length) return null;

  const W = 500, H = 200, PAD = { top: 15, right: 15, bottom: 30, left: 45 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const allVals = series.flatMap(s => s.data ?? []).filter(Number.isFinite);
  const minVal = Math.min(0, ...allVals);
  const maxVal = Math.max(1, ...allVals);

  const xScale = (i) => PAD.left + (i / (years.length - 1 || 1)) * chartW;
  const yScale = (v) => PAD.top + chartH - ((v - minVal) / (maxVal - minVal || 1)) * chartH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const y = PAD.top + (1 - t) * chartH;
        return (
          <line key={t} x1={PAD.left} x2={PAD.left + chartW} y1={y} y2={y}
            stroke="var(--border)" strokeWidth={0.6} strokeDasharray="3 3" />
        );
      })}

      {years.map((yr, i) => (
        <text key={yr} x={xScale(i)} y={H - 8} textAnchor="middle"
          style={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }}>
          {yr}
        </text>
      ))}

      {series.map((s, si) => {
        if (!s.data?.length) return null;
        const color = LINE_COLORS[si % LINE_COLORS.length];
        const pts = s.data.map((v, i) => `${xScale(i)},${yScale(v ?? 0)}`).join(' ');
        const pts0 = `${xScale(0)},${yScale(0)}`;
        const ptsN = `${xScale(s.data.length - 1)},${yScale(0)}`;

        return (
          <g key={si}>
            <polygon points={`${pts0} ${pts} ${ptsN}`} fill={color} fillOpacity={0.05} />
            <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
            {s.data.map((v, i) => (
              <circle key={i} cx={xScale(i)} cy={yScale(v ?? 0)} r={3.5}
                fill={color} stroke="var(--bg-card)" strokeWidth={1.5} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

const MOCK_ARTICLES = [
  {
    article_id: 101,
    title: "Attention Is All You Need for Medical Image Classification",
    abstract: "We apply transformer architectures to medical image classification tasks, demonstrating superior performance over conventional CNNs.",
    journal_name: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
    publication_year: 2026,
    authors: [{ name: "Nguyen Van A" }, { name: "Tran Thi B" }]
  },
  {
    article_id: 102,
    title: "A Survey on Federated Learning in Clinical Research",
    abstract: "Federated learning provides a decentralized method for training models across medical institutions without centralizing private data.",
    journal_name: "Journal of Machine Learning Research",
    publication_year: 2025,
    authors: [{ name: "Le Van C" }]
  },
  {
    article_id: 103,
    title: "Generative Adversarial Networks for Synthetic Patient Data",
    abstract: "Synthesizing patient record data using GANs with private constraint enforcement for downstream training.",
    journal_name: "Nature Machine Intelligence",
    publication_year: 2025,
    authors: [{ name: "Michael Jordan" }]
  }
];

const MOCK_TRENDING_KEYWORDS = [
  { keyword: "Machine Learning", count: 142, score: 9.8 },
  { keyword: "Deep Learning", count: 112, score: 9.2 },
  { keyword: "Computer Vision", count: 85, score: 8.5 },
  { keyword: "NLP", count: 76, score: 8.1 },
  { keyword: "Healthcare AI", count: 54, score: 7.4 },
  { keyword: "Cybersecurity", count: 32, score: 6.5 }
];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const stored = localStorage.getItem('researchpulse_mock_projects');
    if (stored) {
      const list = JSON.parse(stored);
      const proj = list.find(p => p.project_id === Number(id));
      if (proj) {
        setProject(proj);
      } else if (list.length > 0) {
        setProject(list[0]);
      }
    }
  }, [id]);

  const handleRemoveKeyword = (kwId) => {
    if (window.confirm('Bạn có chắc chắn muốn bỏ theo dõi từ khóa này?')) {
      const stored = localStorage.getItem('researchpulse_mock_projects');
      if (stored) {
        const list = JSON.parse(stored);
        const pIdx = list.findIndex(p => p.project_id === Number(id));
        if (pIdx !== -1) {
          list[pIdx].keywords = list[pIdx].keywords.filter(k => k.keyword_id !== kwId);
          list[pIdx].updated_at = new Date().toISOString();
          localStorage.setItem('researchpulse_mock_projects', JSON.stringify(list));
          setProject(list[pIdx]);
        }
      }
    }
  };

  if (!project) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: 'var(--bg-main)' }}>
        <p className="text-muted-custom text-sm">Đang tải chi tiết dự án...</p>
      </div>
    );
  }

  const chartYears = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
  const chartSeries = [
    { label: 'Bài báo xuất bản', data: [42, 58, 63, 89, 102, 115, 134] }
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
          <span className="hover:text-main" onClick={() => navigate('/projects')} style={{ cursor: 'pointer' }}>Dự án theo dõi</span>
          <Icon icon="lucide:chevron-right" width="12" />
          <span className="text-primary">{project.title}</span>
        </div>

        {/* Project Header Banner */}
        <Card className="border-0 shadow-sm rounded-4 mb-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <Card.Body className="p-4">
            <Row className="align-items-center g-3">
              <Col xs={12} md={8}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Badge bg="none" className="px-2.5 py-1 text-xxs font-bold text-primary" style={{ backgroundColor: 'var(--primary-light)', fontSize: '0.7rem' }}>
                    {project.subject_area || 'Lĩnh vực khác'}
                  </Badge>
                  <span className="text-muted-custom text-xs">Cập nhật lúc: {project.updated_at ? new Date(project.updated_at).toLocaleDateString('vi-VN') : 'Vừa xong'}</span>
                </div>
                <h2 className="font-display fw-bold text-main mb-1" style={{ fontSize: 'calc(1.3rem + 0.8vw)', lineHeight: '1.3' }}>
                  {project.title}
                </h2>
              </Col>
              <Col xs={12} md={4} className="d-flex justify-content-md-end gap-2">
                <Button
                  variant="outline-secondary"
                  className="px-3 py-2 text-xs font-bold text-main border-light d-flex align-items-center gap-1.5"
                  onClick={() => navigate(`/projects/${project.project_id}/keywords`)}
                  style={{ borderRadius: 8 }}
                >
                  <Icon icon="lucide:settings" width={14} />
                  Cấu hình từ khóa
                </Button>
                <Button
                  className="btn-primary-glow border-0 px-3 py-2 text-xs font-bold d-flex align-items-center gap-1.5"
                  onClick={() => navigate(`/catalog?search=${encodeURIComponent(project.subject_area || '')}`)}
                  style={{ borderRadius: 8 }}
                >
                  <Icon icon="lucide:search" width={14} />
                  Tìm trong lĩnh vực
                </Button>
              </Col>
            </Row>

            {/* Quick Metrics */}
            <Row className="g-4 mt-2 pt-3 border-top" style={{ borderColor: 'var(--border) !important' }}>
              <Col xs={6} md={3}>
                <div className="text-xxs font-bold text-muted text-uppercase mb-0.5" style={{ letterSpacing: '0.05em' }}>Từ khóa theo dõi</div>
                <div className="text-main fw-bold" style={{ fontSize: '1.25rem' }}>{project.keywords?.length ?? 0}</div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-xxs font-bold text-muted text-uppercase mb-0.5" style={{ letterSpacing: '0.05em' }}>Bài báo liên quan</div>
                <div className="text-main fw-bold" style={{ fontSize: '1.25rem' }}>{MOCK_ARTICLES.length}</div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-xxs font-bold text-muted text-uppercase mb-0.5" style={{ letterSpacing: '0.05em' }}>Cảnh báo mới (24h)</div>
                <div className="text-success fw-bold" style={{ fontSize: '1.25rem' }}>
                  <Icon icon="lucide:bell-ring" width={16} className="me-1.5 align-middle" />
                  3
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-xxs font-bold text-muted text-uppercase mb-0.5" style={{ letterSpacing: '0.05em' }}>Mức độ tăng trưởng</div>
                <div className="text-primary fw-bold" style={{ fontSize: '1.25rem' }}>
                  <Icon icon="lucide:trending-up" width={16} className="me-1.5 align-middle" />
                  +12.4%
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Tab Navigation */}
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <div className="mb-4">
            <Nav className="tab-nav-custom d-flex flex-row border-bottom" style={{ gap: '2px' }}>
              <Nav.Item>
                <Nav.Link eventKey="overview" className="d-flex align-items-center gap-1.5 text-xs text-nowrap">
                  <Icon icon="lucide:bar-chart-3" width={14} />
                  <span>Tổng quan & Biểu đồ</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="articles" className="d-flex align-items-center gap-1.5 text-xs text-nowrap">
                  <Icon icon="lucide:file-text" width={14} />
                  <span>Luồng Bài Báo ({MOCK_ARTICLES.length})</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="keywords" className="d-flex align-items-center gap-1.5 text-xs text-nowrap">
                  <Icon icon="lucide:key" width={14} />
                  <span>Keywords & Giám sát ({project.keywords?.length ?? 0})</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <Tab.Content>
            {/* 1. OVERVIEW TAB */}
            <Tab.Pane eventKey="overview">
              <Row className="g-4">
                <Col xs={12} lg={8}>
                  {/* Trend chart card */}
                  <Card className="border-0 shadow-sm rounded-3 h-100" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-start justify-content-between mb-4">
                        <div>
                          <h4 className="font-display fw-bold text-main mb-1" style={{ fontSize: '1rem' }}>
                            Tần suất xuất bản theo năm
                          </h4>
                          <p className="text-muted-custom text-xxs mb-0">Thống kê số lượng bài báo liên quan qua từng thời kỳ</p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                          <span className="text-xxs text-muted font-semibold">Tạp chí thuộc dự án</span>
                        </div>
                      </div>

                      <div style={{ height: '220px', width: '100%' }}>
                        <SimpleSvgChart years={chartYears} series={chartSeries} />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12} lg={4}>
                  {/* Keywords list panel inside overview */}
                  <Card className="border-0 shadow-sm rounded-3 h-100" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <Card.Body className="p-4">
                      <h4 className="font-display fw-bold text-main mb-3" style={{ fontSize: '1rem' }}>
                        Top Keyword Xu hướng
                      </h4>
                      <p className="text-muted-custom text-xxs mb-4">Keywords có độ tăng trưởng cao nhất trong lĩnh vực</p>

                      <div className="d-flex flex-column gap-3">
                        {MOCK_TRENDING_KEYWORDS.slice(0, 5).map((kw, i) => (
                          <div key={i} className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                              <span
                                className="d-flex align-items-center justify-content-center text-xs font-bold"
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '6px',
                                  backgroundColor: i === 0 ? 'var(--primary-light)' : 'var(--bg-chip)',
                                  color: i === 0 ? 'var(--primary)' : 'var(--text-muted)'
                                }}
                              >
                                #{i + 1}
                              </span>
                              <span className="text-sm font-semibold text-main">{kw.keyword}</span>
                            </div>
                            <Badge bg="none" className="sandbox-tag py-1 px-2.5">
                              {kw.count} bài báo
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Sub-section: Summary table of recent publications */}
                <Col xs={12}>
                  <Card className="border-0 shadow-sm rounded-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div>
                          <h4 className="font-display fw-bold text-main mb-1" style={{ fontSize: '1rem' }}>
                            Các tạp chí đóng góp nhiều nhất
                          </h4>
                          <p className="text-muted-custom text-xxs mb-0">Các ấn phẩm lưu trữ nhiều bài viết nhất trùng khớp từ khóa</p>
                        </div>
                        <Button
                          variant="link"
                          onClick={() => navigate('/journals')}
                          className="text-primary text-xs font-bold p-0 d-flex align-items-center gap-1"
                        >
                          <span>Xem tất cả tạp chí</span>
                          <Icon icon="lucide:arrow-right" width={12} />
                        </Button>
                      </div>

                      <Table responsive hover className="mb-0 text-sm">
                        <thead>
                          <tr className="text-muted-custom">
                            <th>Tên Tạp chí</th>
                            <th>Quartile</th>
                            <th>Lĩnh vực</th>
                            <th className="text-end">SJR</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <span className="fw-semibold text-main hover:text-primary cursor-pointer" onClick={() => navigate('/journals/1')}>
                                IEEE Transactions on Pattern Analysis and Machine Intelligence
                              </span>
                            </td>
                            <td><Badge bg="none" className="badge-q1 py-1 px-2" style={{ backgroundColor: 'rgba(47,198,70,0.1)', color: '#2fc646' }}>Q1</Badge></td>
                            <td>Computer Science</td>
                            <td className="text-end fw-bold text-main">9.876</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="fw-semibold text-main hover:text-primary cursor-pointer" onClick={() => navigate('/journals/2')}>
                                Journal of Machine Learning Research
                              </span>
                            </td>
                            <td><Badge bg="none" className="badge-q1 py-1 px-2" style={{ backgroundColor: 'rgba(47,198,70,0.1)', color: '#2fc646' }}>Q1</Badge></td>
                            <td>Computer Science</td>
                            <td className="text-end fw-bold text-main">4.120</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="fw-semibold text-main hover:text-primary cursor-pointer" onClick={() => navigate('/journals/3')}>
                                Nature Machine Intelligence
                              </span>
                            </td>
                            <td><Badge bg="none" className="badge-q1 py-1 px-2" style={{ backgroundColor: 'rgba(47,198,70,0.1)', color: '#2fc646' }}>Q1</Badge></td>
                            <td>Computer Science</td>
                            <td className="text-end fw-bold text-main">5.340</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab.Pane>

            {/* 2. ARTICLES STREAM TAB */}
            <Tab.Pane eventKey="articles">
              <Row className="g-4">
                <Col xs={12}>
                  <Card className="border-0 shadow-sm rounded-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <Card.Body className="p-4">
                      <h4 className="font-display fw-bold text-main mb-2" style={{ fontSize: '1.1rem' }}>
                        Luồng bài viết cập nhật
                      </h4>
                      <p className="text-muted-custom text-xs mb-4">
                        Danh sách các bài báo khoa học xuất bản gần đây tương thích với watch-list của dự án.
                      </p>

                      <div className="d-flex flex-column gap-3.5">
                        {MOCK_ARTICLES.map((art) => (
                          <div
                            key={art.article_id}
                            onClick={() => navigate(`/articles/${art.article_id}`)}
                            className="p-3.5 rounded-3 sandbox-result-item"
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <span className="text-muted-custom text-xxs font-semibold uppercase">{art.journal_name}</span>
                              <span className="text-muted-custom text-xxs">{art.publication_year}</span>
                            </div>
                            <h5 className="text-main fw-bold mb-2 hover:text-primary transition-colors" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                              {art.title}
                            </h5>
                            <p className="text-muted-custom text-xs mb-3 line-clamp-2" style={{ fontSize: '0.8rem' }}>
                              {art.abstract}
                            </p>
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="text-muted-custom text-xxs font-medium">Tác giả: {art.authors.map(a => a.name).join(', ')}</span>
                              <Badge bg="none" className="px-2 py-1 text-xxs bg-light text-muted" style={{ fontSize: '0.65rem' }}>
                                Độ trùng khớp cao
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab.Pane>

            {/* 3. WATCHED KEYWORDS TAB */}
            <Tab.Pane eventKey="keywords">
              <Row className="g-4">
                <Col xs={12}>
                  <Card className="border-0 shadow-sm rounded-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <Card.Body className="p-4">
                      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
                        <div>
                          <h4 className="font-display fw-bold text-main mb-1" style={{ fontSize: '1.1rem' }}>
                            Quản lý Watch-List từ khóa
                          </h4>
                          <p className="text-muted-custom text-xs mb-0">Hệ thống sẽ liên tục quét bài báo mới và gửi thông báo theo các từ khóa này.</p>
                        </div>
                        <Button
                          className="btn-dark-solid d-flex align-items-center gap-1.5 px-3 py-2 text-xs font-bold border-0"
                          onClick={() => navigate(`/projects/${project.project_id}/keywords`)}
                          style={{ borderRadius: 8 }}
                        >
                          <Icon icon="lucide:edit-3" width={14} />
                          Chỉnh sửa danh sách
                        </Button>
                      </div>

                      <Table responsive hover className="mb-0 text-sm align-middle">
                        <thead>
                          <tr className="text-muted-custom">
                            <th>Từ khóa</th>
                            <th>Mức độ khớp</th>
                            <th>Tần suất quét</th>
                            <th>Trạng thái</th>
                            <th className="text-end">Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.keywords?.map((kw, idx) => (
                            <tr key={idx}>
                              <td><span className="fw-bold text-main">{kw.keyword}</span></td>
                              <td>
                                <Badge bg="none" className="text-xxs px-2 py-1" style={{ backgroundColor: 'rgba(255,122,51,0.08)', color: 'var(--primary)' }}>
                                  Cao (85%+)
                                </Badge>
                              </td>
                              <td>Hàng ngày</td>
                              <td>
                                <span className="d-inline-flex align-items-center gap-1 text-success font-semibold" style={{ fontSize: '0.8rem' }}>
                                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--q1-color)' }} />
                                  Đang giám sát
                                </span>
                              </td>
                              <td className="text-end">
                                <Button
                                  variant="link"
                                  className="text-danger hover:text-danger p-0"
                                  onClick={() => handleRemoveKeyword(kw.keyword_id)}
                                >
                                  <Icon icon="lucide:trash-2" width={16} />
                                </Button>
                              </td>
                            </tr>
                          ))}

                          {(!project.keywords || project.keywords.length === 0) && (
                            <tr>
                              <td colSpan={5} className="text-center py-4 text-muted-custom italic">
                                Chưa có từ khóa nào được theo dõi trong không gian này.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
}
