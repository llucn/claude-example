import { useCallback, useEffect, useState } from 'react';
import { Alert, Avatar, Button, Card, Descriptions, Spin, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { apiClient } from '../auth/api-client';

const { Title } = Typography;

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
        <Alert
          message="加载失败"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={fetchUserInfo}>
              重试
            </Button>
          }
        />
      </div>
    );
  }

  const displayName = userInfo?.preferred_username ?? userInfo?.name ?? '';
  const avatarLabel = displayName.charAt(0).toUpperCase() || '?';

  return (
    <div>
      <Title level={3}>个人资料</Title>
      <Card>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#143055' }}>
            {avatarLabel}
          </Avatar>
          <div style={{ marginTop: 12 }}>
            <Typography.Text strong style={{ fontSize: 18 }}>
              {displayName}
            </Typography.Text>
          </div>
        </div>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="用户名">
            {userInfo?.preferred_username ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item label="姓名">
            {userInfo?.name ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">
            {userInfo?.email ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item label="用户 ID">
            {userInfo?.sub ?? '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
