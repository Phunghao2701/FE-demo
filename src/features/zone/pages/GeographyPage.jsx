import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Form, ProgressBar, Badge } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Header from '../../landing/components/Header';

const MOCK_COUNTRIES = [
  { rank: 1, name: "Hoa Kỳ", code: "US", journals: 1420, percentage: 38, color: "var(--primary)" },
  { rank: 2, name: "Vương Quốc Anh", code: "GB", journals: 840, percentage: 22, color: "#6366f1" },
  { rank: 3, name: "Hà Lan", code: "NL", journals: 560, percentage: 15, color: "#0ea5e9" },
  { rank: 4, name: "Đức", code: "DE", journals: 410, percentage: 11, color: "#f59e0b" },
  { rank: 5, name: "Việt Nam", code: "VN", journals: 280, percentage: 8, color: "#10b981" },
  { rank: 6, name: "Singapore", code: "SG", journals: 195, percentage: 6, color: "#ec4899" }
];

export default function GeographyPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = MOCK_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <span className="text-primary">Phân bố Địa lý</span>
        </div>

        {/* Header Section */}
        <div className="mb-4">
          <h1 className="font-display fw-bold text-main mb-1" style={{ fontSize: 'calc(1.5rem + 0.8vw)' }}>
            Phân bố Tạp chí theo Quốc gia
          </h1>
          <p className="text-muted-custom mb-0" style={{ fontSize: '0.9rem' }}>
            Xem thống kê số lượng ấn phẩm khoa học và nhà xuất bản phân bổ trên toàn thế giới.
          </p>
        </div>

        <Row className="g-4">
          {/* Left Column: Visual Map Simulation & Rankings */}
          <Col xs={12} lg={7}>
            <Card className="border-0 shadow-sm rounded-4 h-100" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="font-display fw-bold text-main mb-0" style={{ fontSize: '1.15rem' }}>
                    Tỷ lệ xuất bản theo lãnh thổ
                  </h3>
                  <Badge bg="none" className="sandbox-tag py-1 px-2.5">Thống kê 2026</Badge>
                </div>

                {/* SVG Visual Map Outline Mock */}
                <div 
                  className="d-flex align-items-center justify-content-center border rounded-3 mb-4 p-3" 
                  style={{ height: '280px', backgroundColor: 'var(--bg-main)', borderColor: 'var(--border) !important' }}
                >
                  <svg viewBox="0 0 400 200" width="100%" height="100%">
                    {/* Simulated abstract map contours */}
                    <path d="M 40,60 Q 60,30 90,50 T 120,60 T 150,40 T 180,70 T 210,60 T 250,90 T 300,50 T 350,80 T 380,100" 
                      fill="none" stroke="var(--border)" strokeWidth={2} strokeDasharray="5 5" />
                    {/* US Circle */}
                    <circle cx="80" cy="70" r="24" fill="var(--primary)" fillOpacity={0.12} stroke="var(--primary)" strokeWidth={1.5} />
                    <text x="80" y="74" textAnchor="middle" style={{ fontSize: 9, fill: 'var(--primary)', fontWeight: 'bold', fontFamily: 'Inter' }}>US 38%</text>
                    
                    {/* Europe Circle */}
                    <circle cx="210" cy="80" r="18" fill="#6366f1" fillOpacity={0.12} stroke="#6366f1" strokeWidth={1.5} />
                    <text x="210" y="84" textAnchor="middle" style={{ fontSize: 9, fill: '#6366f1', fontWeight: 'bold', fontFamily: 'Inter' }}>EU 33%</text>
                    
                    {/* Asia Circle */}
                    <circle cx="310" cy="110" r="15" fill="#10b981" fillOpacity={0.12} stroke="#10b981" strokeWidth={1.5} />
                    <text x="310" y="114" textAnchor="middle" style={{ fontSize: 9, fill: '#10b981', fontWeight: 'bold', fontFamily: 'Inter' }}>VN 8%</text>
                  </svg>
                </div>

                <div className="d-flex flex-column gap-3.5">
                  {filteredCountries.slice(0, 4).map((country) => (
                    <div key={country.code}>
                      <div className="d-flex justify-content-between align-items-center mb-1 text-xs">
                        <span className="fw-semibold text-main">{country.name}</span>
                        <span className="text-muted">{country.percentage}% ({country.journals} tạp chí)</span>
                      </div>
                      <ProgressBar 
                        now={country.percentage} 
                        style={{ height: '6px', backgroundColor: 'var(--bg-chip)', borderRadius: '3px' }}
                      >
                        <ProgressBar now={country.percentage} style={{ backgroundColor: country.color }} />
                      </ProgressBar>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column: Country List Table */}
          <Col xs={12} lg={5}>
            <Card className="border-0 shadow-sm rounded-4 h-100" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Card.Body className="p-4">
                <h3 className="font-display fw-bold text-main mb-3" style={{ fontSize: '1.15rem' }}>
                  Xếp hạng Quốc gia
                </h3>

                <div className="mb-3">
                  <div
                    className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-3"
                    style={{
                      backgroundColor: 'var(--bg-main)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <Icon icon="lucide:search" width={14} style={{ color: 'var(--text-muted)' }} />
                    <Form.Control
                      type="text"
                      placeholder="Tìm quốc gia..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-0 bg-transparent p-0 text-main text-xs"
                      style={{ outline: 'none', boxShadow: 'none' }}
                    />
                  </div>
                </div>

                <Table responsive hover className="mb-0 text-xs align-middle">
                  <thead>
                    <tr className="text-muted-custom">
                      <th>Hạng</th>
                      <th>Quốc gia</th>
                      <th className="text-end">Tạp chí</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCountries.map((country) => (
                      <tr key={country.code}>
                        <td><span className="fw-bold text-muted">{country.rank}</span></td>
                        <td>
                          <span className="fw-semibold text-main">{country.name}</span>
                        </td>
                        <td className="text-end fw-bold text-main">{country.journals}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
