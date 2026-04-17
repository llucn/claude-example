import { Route, Routes } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { useConfigureApiClient } from './auth/useConfigureApiClient';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { PublishIssuePage } from './pages/PublishIssuePage';
import { IssueListPage } from './pages/IssueListPage';
import { IssueDetailPage } from './pages/IssueDetailPage';
import { ThemeProvider, useTheme } from './theme/ThemeContext';

function AppInner() {
  useConfigureApiClient();
  const { theme: appTheme } = useTheme();
  const algorithm = appTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;

  return (
    <ConfigProvider theme={{ algorithm }}>
      <ProtectedRoute>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/publish" element={<PublishIssuePage />} />
            <Route path="/issues" element={<IssueListPage />} />
            <Route path="/issues/:id" element={<IssueDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AppLayout>
      </ProtectedRoute>
    </ConfigProvider>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

export default App;
