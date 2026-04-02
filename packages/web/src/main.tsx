import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { oidcConfig } from './app/auth/oidc-config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);