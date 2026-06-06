import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Header from '../../landing/components/Header';

const INITIAL_ARTICLES = [
  { id: 101, title: "Attention Is All You Need for Medical Image Classification", journal: "IEEE Transactions on Pattern Analysis and Machine Intelligence", year: 2026, authors: "Nguyen Van A, Tran Thi B" },
  { id: 102, title: "A Survey on Federated Learning in Clinical Research", journal: "Journal of Machine Learning Research", year: 2025, authors: "Le Van C" },
  { id: 103, title: "Generative Adversarial Networks for Synthetic Patient Data", journal: "Nature Machine Intelligence", year: 2025, authors: "Michael Jordan" }
];

export default function AdminArticlesPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [year, setYear] = useState('');
  const [authors, setAuthors] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setJournal('');
    setYear(new Date().getFullYear().toString());
    setAuthors('');
    setShowModal(true);
  };

  const handleOpenEdit = (a) => {
    setEditingId(a.id);
    setTitle(a.title);
    setJournal(a.journal);
    setYear(a.year.toString());
    setAuthors(a.authors);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      // Update
      setArticles(articles.map(a => a.id === editingId ? {
        id: editingId,
        title: title.trim(),
        journal: journal.trim(),
        year: parseInt(year) || 2026,
        authors: authors.trim()
      } : a));
    } else {
      // Create
      setArticles([...articles, {
        id: Date.now(),
        title: title.trim(),
        journal: journal.trim(),
        year: parseInt(year) || 2026,
        authors: authors.trim()
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
          <span className="text-primary">Quản lý Bài báo</span>
        </div>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="font-display fw-bold text-main mb-1" style={{ fontSize: '1.6rem' }}>
              Quản lý Bài viết khoa học
            </h1>
            <p className="text-muted-custom text-xs mb-0">Thêm, sửa, xóa thông tin danh mục bài báo.</p>
          </div>
          <Button
            className="btn-primary-glow border-0 px-3 py-2 text-xs font-bold d-flex align-items-center gap-1.5"
            onClick={handleOpenAdd}
            style={{ borderRadius: 8 }}
          >
            <Icon icon="lucide:plus" width={14} />
            Thêm bài báo
          </Button>
        </div>

        {/* Articles Table */}
        <div className="border rounded-3 p-3 shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <Table responsive hover className="mb-0 text-sm align-middle">
            <thead>
              <tr className="text-muted-custom">
                <th>Tiêu đề Bài báo</th>
                <th>Tạp chí</th>
                <th>Tác giả</th>
                <th>Năm</th>
                <th className="text-end">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id}>
                  <td><span className="fw-semibold text-main line-clamp-2" style={{ maxWidth: '350px' }}>{a.title}</span></td>
                  <td><span className="text-muted">{a.journal}</span></td>
                  <td><span className="text-muted">{a.authors}</span></td>
                  <td><span className="fw-bold text-main">{a.year}</span></td>
                  <td className="text-end">
                    <Button variant="link" className="text-primary p-0 me-2" onClick={() => handleOpenEdit(a)}>
                      <Icon icon="lucide:edit-2" width={16} />
                    </Button>
                    <Button variant="link" className="text-danger p-0" onClick={() => handleDelete(a.id)}>
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
                {editingId ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label className="text-xs font-bold text-main text-uppercase">Tiêu đề bài viết</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-xs font-bold text-main text-uppercase">Tạp chí đăng tải</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  className="text-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-xs font-bold text-main text-uppercase">Tác giả</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Nguyễn Văn A, Trần Thị B"
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                  className="text-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-xs font-bold text-main text-uppercase">Năm xuất bản</Form.Label>
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
