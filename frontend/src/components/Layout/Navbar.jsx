import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0', display: 'flex', gap: '1rem' }}>
      <Link to="/">Home</Link>
      {user?.role === 'student' && <Link to="/student">Dashboard</Link>}
      {user?.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
      {user ? (
        <>
          <span>Welcome, {user.username} ({user.role})</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}