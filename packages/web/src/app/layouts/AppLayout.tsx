import { useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { Layout, Menu, Dropdown, Avatar, Space, theme } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  AlertOutlined,
  UnorderedListOutlined,
  MenuOutlined,
  CloseOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { useTheme } from '../theme/ThemeContext';

const { Content } = Layout;

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
  const { theme: appTheme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleNavClick = (key: string) => {
    navigate(key);
    setSidebarOpen(false);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Mobile sidebar overlay */}
      <div
        className={`mobile-sidebar-overlay${sidebarOpen ? ' active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />
      {/* Mobile sidebar */}
      <div className={`mobile-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="mobile-sidebar-header">
          <span style={{ fontWeight: 600, color: 'var(--text)' }}>菜单</span>
          <button className="mobile-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <CloseOutlined />
          </button>
        </div>
        <nav className="mobile-sidebar-nav">
          {menuItems.map((item) => (
            <div
              key={item.key}
              className={`mobile-nav-item${location.pathname === item.key ? ' active' : ''}`}
              onClick={() => handleNavClick(item.key)}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </nav>
      </div>

      {/* Topbar */}
      <div className="app-topbar">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>
          <MenuOutlined />
        </button>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ flex: 1, border: 'none', background: 'transparent' }}
        />
        <div className="topbar-spacer" />
        <button className="theme-toggle-btn" onClick={toggleTheme} title="切换主题">
          {appTheme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
        </button>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar style={{ backgroundColor: token.colorPrimary }} size="small">
              {avatarLabel}
            </Avatar>
            <span style={{ color: 'var(--text)' }}>{username}</span>
          </Space>
        </Dropdown>
      </div>

      <Content style={{ background: 'var(--bg)' }} className="content">
        {children}
      </Content>
    </Layout>
  );
}
