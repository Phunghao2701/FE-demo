import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Header from '../../landing/components/Header';

const INITIAL_VOLUMES = [
  { id: 201, volume_number: "Volume 45", issue_number: "Issue 3", journal: "IEEE Transactions on Pattern Analysis and Machine Intelligence", year: 2026 },
  { id: 202, volume_number: "Volume 24", issue_number: "Issue 1", journal: "Journal of Machine Learning Research", year: 2025 },
  { id: 203, volume_number: "Volume 8", issue_number: "Issue 5", journal: "Nature Machine Intelligence", year: 2025 }
];

export default function AdminVolumesPage() {
  const navigate = useNavigate();
  const [volumes, setVolumes] = useState(INITIAL_VOLUMES);
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [volumeNumber, setVolumeNumber] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [journal, setJournal] = useState('');
  const [year, setYear] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setVolumeNumber('');
    setIssueNumber('');
    setJournal('');
    setYear(new Date().getFullYear().toString());
    setShowModal(true);
  };

  const handleOpenEdit = (v) => {
    setEditingId(v.id);
    setVolumeNumber(v.volume_number);
    setIssueNumber(v.issue_number);
    setJournal(v.journal);
    setYear(v.year.toString());
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa volume/issue này?')) {
      setVolumes(volumes.filter(v => v.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!volumeNumber.trim() || !issueNumber.trim()) return;

    if (editingId) {
      // Update
      setVolumes(volumes.map(v => v.id === editingId ? {
        id: editingId,
        volume_number: volumeNumber.trim(),
        issue_number: issueNumber.trim(),
        journal: journal.trim(),
        year: parseInt(year) || 2026
      } : v));
    } else {
      // Create
      setVolumes([...volumes, {
        id: Date.now(),
        volume_number: volumeNumber.trim(),
        issue_number: issueNumber.trim(),
        journal: journal.trim(),
        year: parseInt(year) || 2026
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
          <span className="text-primary">Quản lý Volume & Issue</span>
        </div>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="font-display fw-bold text-main mb-1" style={{ fontSize: '1.6rem' }}>
              Quản lý Volume & Issue
            </h1>
            <p className="text-muted-custom text-xs mb-0">Thêm, sửa, xóa thông tin tập (volume) và số xuất bản (issue) tạp chí.</p>
          </div>
          <Button
            className="btn-primary-glow border-0 px-3 py-2 text-xs font-bold d-flex align-items-center gap-1.5"
            onClick={handleOpenAdd}
            style={{ borderRadius: 8 }}
          >
            <Icon icon="lucide:plus" width={14} />
            Thêm Volume/Issue
          </Button>
        </div>

        {/* Volumes Table */}
        <div className="border rounded-3 p-3 shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <Table responsive hover className="mb-0 text-sm align-middle">
            <thead>
              <tr className="text-muted-custom">
                <th>Tập (Volume)</th>
                <th>Số (Issue)</th>
                <th>Tạp chí</th>
                <th>Năm</th>
                <th className="text-end">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {volumes.map((v) => (
                <tr key={v.id}>
                  <td><span className="fw-semibold text-main">{v.volume_number}</span></td>
                  <td><span className="text-muted">{v.issue_number}</span></td>
                  <td><span className="text-muted">{v.journal}</span></td>
                  <td><span className="fw-bold text-main">{v.year}</span></td>
                  <td className="text-end">
                    <Button variant="link" className="text-primary p-0 me-2" onClick={() => handleOpenEdit(v)}>
                      <Icon icon="lucide:edit-2" width={16} />
                    </Button>
                    <Button variant="link" className="text-danger p-0" onClick={() => handleDelete(v.id)}>
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
                {editingId ? 'Chỉnh sửa Volume/Issue' : 'Thêm Volume/Issue mới'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-xs font-bold text-main text-uppercase">Tập (Volume)</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Volume 45"
                      value={volumeNumber}
                      onChange={(e) => setVolumeNumber(e.target.value)}
                      className="text-sm"
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-xs font-bold text-main text-uppercase">Số (Issue)</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Issue 1"
                      value={issueNumber}
                      onChange={(e) => setIssueNumber(e.target.value)}
                      className="text-sm"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label className="text-xs font-bold text-main text-uppercase">Tạp chí thuộc về</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  className="text-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-xs font-bold text-main text-uppercase">Năm</Form.Label>
                <Form.Control
                  type="number"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="text-sm"
                />
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
