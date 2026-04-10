import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        🚌 <span style={{ color: '#00c851' }}>NEXT</span>GEN TRAVEL
      </Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {user && <Link to="/my-bookings" style={styles.link}>My Bookings</Link>}
        {user?.role === 'admin' && <Link to="/admin" style={styles.link}>Admin Panel</Link>}

        {user ? (
          <>
            <span style={styles.userName}>👤 {user.name}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.loginBtn}>Log In</Link>
            <Link to="/register" style={styles.registerBtn}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 30px',
    background: 'white',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    flexWrap: 'wrap',
    gap: '10px',
  },
  logo: { fontSize: '1.4rem', fontWeight: 900, color: '#003087', textDecoration: 'none' },
  links: { display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' },
  link: { color: '#333', textDecoration: 'none', fontWeight: 600 },
  userName: { color: '#003087', fontWeight: 700 },
  loginBtn: { padding: '8px 18px', background: '#003087', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 },
  registerBtn: { padding: '8px 18px', background: '#00c851', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 },
  logoutBtn: { padding: '8px 18px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 },
};

export default Navbar;