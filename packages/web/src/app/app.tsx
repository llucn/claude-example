import { Route, Routes } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { useConfigureApiClient } from './auth/useConfigureApiClient';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { PublishIssuePage } from './pages/PublishIssuePage';

export function App() {
  useConfigureApiClient();
  const configProps = { theme: { algorithm: theme.darkAlgorithm } };

  return (
    <ConfigProvider {...configProps}>
    <ProtectedRoute>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/publish" element={<PublishIssuePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AppLayout>
    </ProtectedRoute>
    </ConfigProvider>
  );
}

export default App;
