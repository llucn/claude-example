import { useCallback, useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import { apiClient } from '../auth/api-client';

interface UserInfo {
  sub: string;
  name?: string;
  preferred_username?: string;
  email?: string;
  [key: string]: unknown;
}

export function ProfilePage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<UserInfo>('/me');
      setUserInfo(response.data);
    } catch {
      setError('获取用户信息失败，请重试');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>{error}</p>
            <Button onClick={fetchUserInfo}>重试</Button>
          </div>
        </div>
      </div>
    );
  }

  const displayName = userInfo?.preferred_username ?? userInfo?.name ?? '';
  const avatarLabel = displayName.charAt(0).toUpperCase() || '?';

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">个人资料</h1>
      </div>
      <div className="card" style={{ maxWidth: 600 }}>
        <div className="card-body">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div className="profile-avatar">{avatarLabel}</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>
              {displayName}
            </div>
          </div>
          <div className="meta-grid">
            <div className="meta-item">
              <span className="meta-label">用户名</span>
              <span className="meta-value">{userInfo?.preferred_username ?? '-'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">姓名</span>
              <span className="meta-value">{userInfo?.name ?? '-'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">邮箱</span>
              <span className="meta-value">{userInfo?.email ?? '-'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">用户 ID</span>
              <span className="meta-value" style={{ fontSize: 12, fontFamily: 'monospace' }}>
                {userInfo?.sub ?? '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
