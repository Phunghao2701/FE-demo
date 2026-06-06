import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../app/layouts/AuthLayout';
import AuthBanner from '../components/AuthBanner';
import { Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';

export default function ActivationSuccessPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout banner={<AuthBanner />}>
      <div className="text-center py-5">
        <div
          className="d-inline-flex align-items-center justify-content-center mb-4 text-success"
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'rgba(47,198,70,0.12)',
            boxShadow: '0 0 20px rgba(47,198,70,0.1)'
          }}
        >
          <Icon icon="lucide:check-circle" width={36} className="text-success" />
        </div>

        <h2 className="font-display fw-bold mb-2 text-main" style={{ fontSize: '1.85rem' }}>
          Kích hoạt thành công!
        </h2>
        
        <p className="text-muted-custom text-sm mb-5 mx-auto" style={{ maxWidth: '320px' }}>
          Tài khoản ResearchPulse của bạn đã được kích hoạt thành công. Hãy đăng nhập để bắt đầu thiết lập không gian nghiên cứu của bạn.
        </p>

        <div className="d-flex flex-column gap-3">
          <Button
            className="btn-primary-glow w-100 py-2.5 border-0 font-bold text-sm"
            onClick={() => navigate('/login')}
            style={{ borderRadius: 8 }}
          >
            Đăng nhập ngay
          </Button>
          
          <Button
            variant="outline-secondary"
            className="w-100 py-2.5 border-light text-main text-xs font-bold"
            onClick={() => navigate('/')}
            style={{ borderRadius: 8 }}
          >
            Quay lại Trang chủ
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
