import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/login', form);
      login(res.data.data.user, res.data.data.token);
      // Redirect based on role
      if (res.data.data.user.role === 'admin') navigate('/admin');
      else navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={{ color: '#666', textAlign: 'center' }}>Login to your NextGen Travel account</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            style={styles.input}
            placeholder="you@email.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            placeholder="Your password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Don't have an account? <Link to="/register" style={{ color: '#003087', fontWeight: 700 }}>Sign Up</Link>
        </p>

        <div style={styles.adminHint}>
          👨🏻‍💼 Admin : andarpajimit@gmail.com
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#f5f7fa' },
  box: { background: 'white', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 30px rgba(0,0,0,0.1)' },
  title: { textAlign: 'center', color: '#003087', fontWeight: 900, fontSize: '1.8rem', marginBottom: '4px' },
  error: { background: '#ffe0e0', color: '#c00', padding: '12px', borderRadius: '8px', marginBottom: '16px' },
  label: { display: 'block', fontWeight: 600, margin: '14px 0 6px', color: '#333' },
  input: { width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '14px', background: '#003087', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', marginTop: '20px' },
  adminHint: { marginTop: '20px', background: '#fff8e1', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center', color: '#555' },
};

export default LoginPage;