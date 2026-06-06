import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../../app/layouts/AuthLayout';
import AuthBanner from '../components/AuthBanner';
import { Form, Button, Alert } from 'react-bootstrap';
import { Icon } from '@iconify/react';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Mật khẩu phải có tối thiểu 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

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
          Đặt lại mật khẩu
        </h2>
        <p className="text-muted-custom text-sm mb-0">
          Vui lòng nhập mật khẩu mới của bạn bên dưới.
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
          <h4 className="font-display fw-bold text-main mb-2">Thành công!</h4>
          <p className="text-muted-custom text-sm mb-4">
            Mật khẩu của bạn đã được cập nhật thành công. Bạn có thể sử dụng mật khẩu mới để đăng nhập ngay bây giờ.
          </p>
          <Button
            className="btn-primary-glow w-100 py-2.5 border-0 font-bold"
            onClick={() => navigate('/login')}
            style={{ borderRadius: 8 }}
          >
            Đi đến Đăng nhập
          </Button>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="warning" className="border-0 py-2 text-sm mb-3">
              <Icon icon="lucide:alert-circle" className="me-2" width={16} />
              {error}
            </Alert>
          )}

          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="text-xs font-bold text-main text-uppercase mb-1.5" style={{ letterSpacing: '0.05em' }}>
              Mật khẩu mới
            </Form.Label>
            <div className="position-relative">
              <span
                className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted-custom"
                style={{ pointerEvents: 'none' }}
              >
                <Icon icon="lucide:lock" width={16} />
              </span>
              <Form.Control
                type="password"
                required
                placeholder="Tối thiểu 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <Form.Group className="mb-4" controlId="confirmPassword">
            <Form.Label className="text-xs font-bold text-main text-uppercase mb-1.5" style={{ letterSpacing: '0.05em' }}>
              Xác nhận mật khẩu mới
            </Form.Label>
            <div className="position-relative">
              <span
                className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted-custom"
                style={{ pointerEvents: 'none' }}
              >
                <Icon icon="lucide:lock" width={16} />
              </span>
              <Form.Control
                type="password"
                required
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            disabled={isLoading}
            className="btn-primary-glow w-100 py-2.5 border-0 font-bold text-sm"
            style={{ borderRadius: 8 }}
          >
            {isLoading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
          </Button>
        </Form>
      )}
    </AuthLayout>
  );
}
