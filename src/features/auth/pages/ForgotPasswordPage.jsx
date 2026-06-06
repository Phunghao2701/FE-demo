import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../../app/layouts/AuthLayout';
import AuthBanner from '../components/AuthBanner';
import { Form, Button, Alert } from 'react-bootstrap';
import { Icon } from '@iconify/react';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <AuthLayout banner={<AuthBanner />}>
      <div className="mb-4">
        <h2 className="font-display fw-bold mb-1" style={{ fontSize: '1.85rem', color: 'var(--text-main)' }}>
          Quên mật khẩu?
        </h2>
        <p className="text-muted-custom text-sm mb-0">
          Nhập email của bạn để nhận liên kết khôi phục mật khẩu.
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-4">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-3 text-success"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(47,198,70,0.1)',
            }}
          >
            <Icon icon="lucide:check" width={28} />
          </div>
          <h4 className="font-display fw-bold text-main mb-2">Đã gửi email khôi phục</h4>
          <p className="text-muted-custom text-sm mb-4">
            Chúng tôi đã gửi hướng dẫn lấy lại mật khẩu tới địa chỉ email <strong>{email}</strong>. Vui lòng kiểm tra hộp thư của bạn.
          </p>
          <Button
            className="btn-dark-solid w-100 py-2.5"
            onClick={() => navigate('/login')}
            style={{ borderRadius: 8 }}
          >
            Quay lại Đăng nhập
          </Button>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="email">
            <Form.Label className="text-xs font-bold text-main text-uppercase mb-1.5" style={{ letterSpacing: '0.05em' }}>
              Địa chỉ Email
            </Form.Label>
            <div className="position-relative">
              <span
                className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted-custom"
                style={{ pointerEvents: 'none' }}
              >
                <Icon icon="lucide:mail" width={16} />
              </span>
              <Form.Control
                type="email"
                required
                placeholder="phunghao2701@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ps-5 py-2.5 border text-sm"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-main)',
                }}
              />
            </div>
          </Form.Group>

          <Button
            type="submit"
            disabled={isLoading || !email}
            className="btn-primary-glow w-100 py-2.5 border-0 font-bold text-sm mb-3"
            style={{ borderRadius: 8 }}
          >
            {isLoading ? 'Đang gửi...' : 'Gửi liên kết khôi phục'}
          </Button>

          <div className="text-center mt-3">
            <Link to="/login" className="text-decoration-none text-xs font-semibold text-muted-custom hover:text-main">
              Quay lại trang Đăng nhập
            </Link>
          </div>
        </Form>
      )}
    </AuthLayout>
  );
}
