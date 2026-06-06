import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Modal, Badge } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Header from '../../landing/components/Header';

const INITIAL_JOURNALS = [
  { id: 1, title: "IEEE Transactions on Pattern Analysis and Machine Intelligence", sjr: 9.876, h_index: 345, quartile: "Q1", publisher: "IEEE" },
  { id: 2, title: "Journal of Machine Learning Research", sjr: 4.120, h_index: 180, quartile: "Q1", publisher: "JMLR" },
  { id: 3, title: "Nature Machine Intelligence", sjr: 5.340, h_index: 92, quartile: "Q1", publisher: "Nature Publishing Group" }
];

export default function AdminJournalsPage() {
  const navigate = useNavigate();
  const [journals, setJournals] = useState(INITIAL_JOURNALS);
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [sjr, setSjr] = useState('');
  const [hIndex, setHIndex] = useState('');
  const [quartile, setQuartile] = useState('Q1');
  const [publisher, setPublisher] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setSjr('');
    setHIndex('');
    setQuartile('Q1');
    setPublisher('');
    setShowModal(true);
  };

  const handleOpenEdit = (j) => {
    setEditingId(j.id);
    setTitle(j.title);
    setSjr(j.sjr.toString());
    setHIndex(j.h_index.toString());
    setQuartile(j.quartile);
    setPublisher(j.publisher);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tạp chí này?')) {
      setJournals(journals.filter(j => j.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      // Update
      setJournals(journals.map(j => j.id === editingId ? {
        id: editingId,
        title: title.trim(),
        sjr: parseFloat(sjr) || 0,
        h_index: parseInt(hIndex) || 0,
        quartile,
        publisher: publisher.trim()
      } : j));
    } else {
      // Create
      setJournals([...journals, {
        id: Date.now(),
        title: title.trim(),
        sjr: parseFloat(sjr) || 0,
        h_index: parseInt(hIndex) || 0,
        quartile,
        publisher: publisher.trim()
      }]);
    }
    setShowModal(false);
  };

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
          <span className="hover:text-main" onClick={() => navigate('/admin')} style={{ cursor: 'pointer' }}>Bảng điều khiển Admin</span>
          <Icon icon="lucide:chevron-right" width="12" />
          <span className="text-primary">Quản lý Tạp chí</span>
        </div>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="font-display fw-bold text-main mb-1" style={{ fontSize: '1.6rem' }}>
              Quản lý Tạp chí Khoa học
            </h1>
            <p className="text-muted-custom text-xs mb-0">Thêm, sửa, xóa thông tin danh mục tạp chí.</p>
          </div>
          <Button
            className="btn-primary-glow border-0 px-3 py-2 text-xs font-bold d-flex align-items-center gap-1.5"
            onClick={handleOpenAdd}
            style={{ borderRadius: 8 }}
          >
            <Icon icon="lucide:plus" width={14} />
            Thêm tạp chí
          </Button>
        </div>

        {/* Journals Table */}
        <div className="border rounded-3 p-3 shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <Table responsive hover className="mb-0 text-sm align-middle">
            <thead>
              <tr className="text-muted-custom">
                <th>Tên Tạp chí</th>
                <th>Nhà xuất bản</th>
                <th>SJR</th>
                <th>H-Index</th>
                <th>Quartile</th>
                <th className="text-end">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {journals.map((j) => (
                <tr key={j.id}>
                  <td><span className="fw-semibold text-main">{j.title}</span></td>
                  <td><span className="text-muted">{j.publisher}</span></td>
                  <td><span className="fw-bold text-main">{j.sjr.toFixed(3)}</span></td>
                  <td><span className="text-muted">{j.h_index}</span></td>
                  <td>
                    <Badge bg="none" className="badge-q1 py-1 px-2" style={{ backgroundColor: 'rgba(47,198,70,0.1)', color: '#2fc646' }}>
                      {j.quartile}
                    </Badge>
                  </td>
                  <td className="text-end">
                    <Button variant="link" className="text-primary p-0 me-2" onClick={() => handleOpenEdit(j)}>
                      <Icon icon="lucide:edit-2" width={16} />
                    </Button>
                    <Button variant="link" className="text-danger p-0" onClick={() => handleDelete(j.id)}>
                      <Icon icon="lucide:trash-2" width={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Modal form */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Form onSubmit={handleSave}>
            <Modal.Header closeButton className="border-bottom-0 pb-0">
              <Modal.Title className="font-display fw-bold text-main" style={{ fontSize: '1.25rem' }}>
                {editingId ? 'Chỉnh sửa tạp chí' : 'Thêm tạp chí mới'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label className="text-xs font-bold text-main text-uppercase">Tên Tạp chí</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-xs font-bold text-main text-uppercase">Nhà xuất bản</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className="text-sm"
                />
              </Form.Group>
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-xs font-bold text-main text-uppercase">SJR Score</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.001"
                      required
                      value={sjr}
                      onChange={(e) => setSjr(e.target.value)}
                      className="text-sm"
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-xs font-bold text-main text-uppercase">H-Index</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      value={hIndex}
                      onChange={(e) => setHIndex(e.target.value)}
                      className="text-sm"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label className="text-xs font-bold text-main text-uppercase">Quartile</Form.Label>
                <Form.Select
                  value={quartile}
                  onChange={(e) => setQuartile(e.target.value)}
                  className="text-sm"
                >
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="Q4">Q4</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-top-0 pt-0">
              <Button variant="outline-secondary" className="text-xs" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button type="submit" className="btn-primary-glow border-0 text-xs font-bold">
                Lưu lại
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
}
