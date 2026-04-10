import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { Layout, Menu, Dropdown, Avatar, Space, theme } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined, AlertOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const menuItems = [
  { key: '/', icon: <HomeOutlined />, label: '主页' },
  { key: '/publish', icon: <AlertOutlined />, label: '发布事件' },
  { key: '/issues', icon: <UnorderedListOutlined />, label: '查看事件' },
  { key: '/profile', icon: <UserOutlined />, label: 'Profile' },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { token } = theme.useToken();

  const username =
    auth.user?.profile?.preferred_username ??
    auth.user?.profile?.name ??
    '';

  const avatarLabel = username.charAt(0).toUpperCase() || '?';

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '登出',
      onClick: () => auth.signoutRedirect(),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: token.colorBgContainer,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          padding: '0 24px',
        }}
      >
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ flex: 1, border: 'none' }}
        />
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar style={{ backgroundColor: token.colorPrimary }} size="small">
              {avatarLabel}
            </Avatar>
            <span>{username}</span>
          </Space>
        </Dropdown>
      </Header>
      <Content style={{ padding: '24px' }}>
        {children}
      </Content>
    </Layout>
  );
}
