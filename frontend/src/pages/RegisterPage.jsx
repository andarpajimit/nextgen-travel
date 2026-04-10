import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm)
      return setError('Passwords do not match.');
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/register', {
        name: form.name, email: form.email, phone: form.phone, password: form.password
      });
      login(res.data.data.user, res.data.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <h2 style={styles.title}>Create Account 🚌</h2>
        <p style={{ color: '#666', textAlign: 'center' }}>Join NextGen Travel today</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'you@email.com' },
            { label: 'Phone', key: 'phone', type: 'tel', placeholder: '10-digit mobile number' },
            { label: 'Password', key: 'password', type: 'password', placeholder: 'Min 6 characters' },
            { label: 'Confirm Password', key: 'confirm', type: 'password', placeholder: 'Re-enter password' },
          ].map(field => (
            <div key={field.key}>
              <label style={styles.label}>{field.label}</label>
              <input
                type={field.type}
                style={styles.input}
                placeholder={field.placeholder}
                value={form[field.key]}
                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                required={field.key !== 'phone'}
              />
            </div>
          ))}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Already have an account? <Link to="/login" style={{ color: '#003087', fontWeight: 700 }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#f5f7fa', padding: '20px' },
  box: { background: 'white', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '450px', boxShadow: '0 4px 30px rgba(0,0,0,0.1)' },
  title: { textAlign: 'center', color: '#003087', fontWeight: 900, fontSize: '1.8rem', marginBottom: '4px' },
  error: { background: '#ffe0e0', color: '#c00', padding: '12px', borderRadius: '8px', marginBottom: '16px' },
  label: { display: 'block', fontWeight: 600, margin: '14px 0 6px', color: '#333' },
  input: { width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '14px', background: '#00c851', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', marginTop: '20px' },
};

export default RegisterPage;