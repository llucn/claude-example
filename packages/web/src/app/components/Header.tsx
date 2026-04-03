import { useAuth } from 'react-oidc-context';

export function Header() {
  const auth = useAuth();

  const username =
    auth.user?.profile?.preferred_username ??
    auth.user?.profile?.name ??
    '';

  const handleLogout = () => {
    auth.signoutRedirect();
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #eee' }}>
      <span style={{ marginRight: '12px' }}>{username}</span>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
