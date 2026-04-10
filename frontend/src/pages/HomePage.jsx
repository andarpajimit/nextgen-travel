import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState({ from: '', to: '', date: '' });

  useEffect(() => {
    // Load cities for dropdowns
    axios.get('/api/routes/cities')
      .then(res => setCities(res.data.data))
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.date) return alert('Please fill all fields!');
    navigate(`/search?from=${form.from}&to=${form.to}&date=${form.date}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            SMART. RELIABLE.<br />
            <span style={{ color: '#00c851' }}>FUTURE-READY</span><br />
            BUS TRAVEL.
          </h1>
          <p style={styles.heroSub}>Experience the Next Generation of Bus Travel</p>

          {/* Search Box */}
          <form onSubmit={handleSearch} style={styles.searchBox}>
            <select
              style={styles.input}
              value={form.from}
              onChange={e => setForm({ ...form, from: e.target.value })}
            >
              <option value="">📍 From City</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              style={styles.input}
              value={form.to}
              onChange={e => setForm({ ...form, to: e.target.value })}
            >
              <option value="">🏁 To City</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <input
              type="date"
              style={styles.input}
              value={form.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setForm({ ...form, date: e.target.value })}
            />

            <button type="submit" style={styles.searchBtn}>🔍 Find Buses</button>
          </form>
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>WHY CHOOSE <span style={{ color: '#003087' }}>NEXTGEN</span> TRAVEL?</h2>
        <div style={styles.cardRow}>
          {[
            { icon: '📱', title: 'Smart Booking', desc: 'Easy online reservations and real-time bus tracking.' },
            { icon: '🌿', title: 'Eco-Friendly', desc: 'Travel green with our future-ready, low-emission buses.' },
            { icon: '✅', title: 'Reliable Service', desc: 'On-time departures, Wi-Fi connectivity, top-notch safety.' },
          ].map((card, i) => (
            <div key={i} style={styles.card}>
              <div style={{ fontSize: '2.5rem' }}>{card.icon}</div>
              <h3 style={{ color: '#003087' }}>{card.title}</h3>
              <p style={{ color: '#666' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ ...styles.section, background: '#f8f9fa' }}>
        <h2 style={styles.sectionTitle}>ADVANCED FEATURES & SERVICES</h2>
        <div style={styles.cardRow}>
          {[
            { icon: '🗺️', title: 'Planning', desc: 'Easy & flexible trip planning' },
            { icon: '📡', title: 'Tech', desc: 'Onboard high-speed Wi-Fi & advanced tech' },
            { icon: '💺', title: 'Comfort', desc: 'Spacious & luxurious seating' },
            { icon: '🛡️', title: 'Safety', desc: 'Modern buses, strict safety standards' },
          ].map((f, i) => (
            <div key={i} style={{ ...styles.card, flex: '1 1 180px' }}>
              <div style={{ fontSize: '2rem' }}>{f.icon}</div>
              <h4 style={{ color: '#003087' }}>{f.title}</h4>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #003087 0%, #0066cc 100%)',
    color: 'white',
    padding: '80px 20px',
    minHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: { maxWidth: '700px', width: '100%' },
  heroTitle: { fontSize: '2.8rem', fontWeight: 900, marginBottom: '10px', lineHeight: 1.2 },
  heroSub: { marginBottom: '30px', opacity: 0.9, fontSize: '1.1rem' },
  searchBox: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minWidth: '150px',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
  },
  searchBtn: {
    background: '#00c851',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
  },
  section: { padding: '60px 20px', textAlign: 'center', background: 'white' },
  sectionTitle: { fontSize: '2rem', fontWeight: 800, marginBottom: '40px' },
  cardRow: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1100px', margin: '0 auto' },
  card: {
    flex: '1 1 250px',
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '30px 20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  },
};

export default HomePage;