import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState({ from: '', to: '', date: '' });

  useEffect(() => {
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
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <div style={styles.hero}>
        {/* Sky layer */}
        <div style={styles.heroSky} />
        <div style={styles.heroRoad} />

        {/* Bus SVG */}
        <div style={styles.busWrap}>
          <svg viewBox="0 0 340 220" style={{ width: '100%', height: '100%' }} fill="none">
            <ellipse cx="200" cy="200" rx="130" ry="18" fill="rgba(100,160,220,0.3)" />
            <rect x="30" y="70" width="260" height="120" rx="12" fill="#1a3080" />
            <rect x="30" y="70" width="260" height="55" rx="10" fill="#2a50c0" />
            <rect x="260" y="70" width="50" height="120" rx="10" fill="#0f2060" />
            <rect x="265" y="82" width="38" height="50" rx="4" fill="#90c8f8" opacity="0.9" />
            <rect x="268" y="85" width="10" height="44" rx="2" fill="rgba(255,255,255,0.3)" />
            <rect x="268" y="140" width="28" height="12" rx="4" fill="#ffe060" />
            {[40, 78, 116, 154, 192, 230].map((x, i) => (
              <rect key={i} x={x} y="85" width={i === 5 ? 24 : 30} height="22" rx="3" fill="#90c8f8" opacity="0.85" />
            ))}
            <rect x="30" y="112" width="230" height="6" fill="#2060d0" />
            <rect x="30" y="118" width="230" height="3" fill="#00c14a" />
            <text x="75" y="148" fontFamily="Arial" fontWeight="800" fontSize="18" fill="#fff" letterSpacing="2">NEXTGEN</text>
            <text x="92" y="162" fontFamily="Arial" fontSize="9" fill="#a0c8f0" letterSpacing="4">TRAVEL</text>
            {[90, 240].map((cx, i) => (
              <g key={i}>
                <circle cx={cx} cy="192" r="22" fill="#1a1a2a" />
                <circle cx={cx} cy="192" r="14" fill="#2a2a3a" />
                <circle cx={cx} cy="192" r="7" fill="#888" />
              </g>
            ))}
            <path d="M68 172 Q90 158 112 172" stroke="#0f1840" strokeWidth="8" fill="none" />
            <path d="M218 172 Q240 158 262 172" stroke="#0f1840" strokeWidth="8" fill="none" />
            {[105, 115, 125].map((y, i) => (
              <line key={i} x1={i * 4} y1={y} x2="28" y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth={2 - i * 0.5} strokeLinecap="round" />
            ))}
          </svg>
        </div>

        {/* Text + Search */}
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            SMART. RELIABLE.<br />
            <span style={{ color: '#3dff80' }}>FUTURE-READY</span><br />
            BUS TRAVEL.
          </h1>
          <p style={styles.heroSub}>
            Experience the Next Generation of Bus Travel with<br />
            Our Innovative, Eco-Friendly Fleet.
          </p>

          <form onSubmit={handleSearch} style={styles.searchBox}>
            <div style={styles.sf}>
              <div style={styles.sfLabel}>Where From?</div>
              <div style={styles.sfInner}>
                <span style={{ ...styles.dot, background: '#00c14a' }} />
                <select style={styles.sfSelect} value={form.from} onChange={e => setForm({ ...form, from: e.target.value })}>
                  <option value="">Select start location</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={styles.sf}>
              <div style={styles.sfLabel}>Where To?</div>
              <div style={styles.sfInner}>
                <span style={{ ...styles.dot, background: '#e04040' }} />
                <select style={styles.sfSelect} value={form.to} onChange={e => setForm({ ...form, to: e.target.value })}>
                  <option value="">Select destination</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={styles.sf}>
              <div style={styles.sfLabel}>Date of Journey</div>
              <div style={styles.sfInner}>
                <span style={{ ...styles.dot, background: '#2060d0' }} />
                <input
                  type="date"
                  style={styles.sfSelect}
                  value={form.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" style={styles.btnFind}>Find Buses</button>
          </form>
        </div>
      </div>

      {/* ── WHY NEXTGEN ──────────────────────────────── */}
      <div style={styles.whySection}>
        <h2 style={styles.secTitle}>
          WHY CHOOSE <span style={{ color: '#1a2f7a', fontStyle: 'italic' }}>NEXTGEN</span> TRAVEL?
        </h2>
        <p style={styles.secSub}>
          Experience the Next Generation of Bus Travel with Our Innovative, Eco-Friendly Fleet.
        </p>
        <div style={styles.whyGrid}>
          {[
            {
              color: '#d0e8ff',
              title: 'Smart Booking',
              desc: 'Easy online reservations and real-time bus tracking, all from your fingertips.',
              svg: (
                <svg width="36" height="36" viewBox="0 0 36 36">
                  <rect x="5" y="3" width="18" height="24" rx="3" fill="#2060d0" />
                  <rect x="8" y="7" width="12" height="3" rx="1" fill="#90c8f8" />
                  <rect x="8" y="12" width="8" height="2" rx="1" fill="#90c8f8" />
                  <circle cx="28" cy="28" r="6" fill="#00c14a" />
                  <path d="M25 28 l2 2 3.5-3.5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              )
            },
            {
              color: '#c8f5e0',
              title: 'Eco-Friendly',
              desc: 'Travel green with our future-ready, low-emission buses.',
              svg: (
                <svg width="36" height="36" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="13" fill="#20a060" />
                  <path d="M10 20 Q18 8 26 20 Q18 32 10 20Z" fill="#40d080" />
                  <circle cx="18" cy="18" r="4" fill="#fff" />
                  <path d="M8 13 Q13 6 18 11" stroke="#90f0c0" strokeWidth="1.5" fill="none" />
                </svg>
              )
            },
            {
              color: '#c8f0f0',
              title: 'Reliable Service',
              desc: 'On-time departures, Wi-Fi connectivity, and top-notch safety standards.',
              svg: (
                <svg width="36" height="36" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="13" fill="#10a0a0" />
                  <path d="M12 18 l4 4 8-8" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )
            },
          ].map((card, i) => (
            <div key={i} style={styles.whyCard}>
              <div style={{ ...styles.whyIconWrap, background: card.color }}>
                {card.svg}
              </div>
              <div>
                <h3 style={styles.whyCardTitle}>{card.title}</h3>
                <p style={styles.whyCardDesc}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ─────────────────────────────────── */}
      <div style={styles.featSection}>
        <h2 style={{ ...styles.secTitle, textAlign: 'center' }}>ADVANCED FEATURES & SERVICES</h2>
        <p style={{ ...styles.secSub, textAlign: 'center', marginBottom: 28 }}>
          Everything onboard for a superior journey experience
        </p>
        <div style={styles.featGrid}>
          {[
            { icon: '🗺️', title: 'Planning', desc: 'Easy & flexible trip planning for any route.' },
            { icon: '📡', title: 'Tech', desc: 'Onboard high-speed Wi-Fi & advanced tech.' },
            { icon: '💺', title: 'Comfort', desc: 'Spacious & luxurious seating on every bus.' },
            { icon: '🛡️', title: 'Safety', desc: 'Modern buses, strict safety standards.' },
          ].map((f, i) => (
            <div key={i} style={styles.featCard}>
              <div style={styles.featIconBox}>{f.icon}</div>
              <h4 style={styles.featTitle}>{f.title}</h4>
              <p style={styles.featDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── REDEFINE SECTION ─────────────────────────── */}
      <div style={styles.redefineSection}>
        <div style={styles.redefineLeft}>
          <div style={styles.redefTag}>REDEFINING BUS TRAVEL</div>
          <h2 style={styles.redefH2}>
            <span style={{ color: '#00a03a' }}>REDEFINING</span> BUS TRAVEL<br />
            FOR A SUSTAINABLE FUTURE
          </h2>
          <p style={styles.redefSub}>SMART · CONNECTED · SUSTAINABLE MOBILITY</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { color: '#c8f5d8', title: 'Planning', desc: 'Easy & flexible trip planning' },
              { color: '#d0e4ff', title: 'Tech', desc: 'Onboard high-speed Wi-Fi & advanced tech' },
              { color: '#c8f0f0', title: 'Comfort', desc: 'Spacious & luxurious seating' },
              { color: '#e8d8ff', title: 'Safety', desc: 'Modern buses, strict safety standards.' },
            ].map((item, i) => (
              <div key={i} style={styles.redefItem}>
                <div style={{ ...styles.redefIcon, background: item.color }}>✓</div>
                <div>
                  <strong style={{ fontSize: 14, color: '#1a2050', display: 'block' }}>{item.title}</strong>
                  <span style={{ fontSize: 12, color: '#778' }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.redefineRight}>
          <svg viewBox="0 0 300 220" style={{ width: '100%', maxWidth: 340 }} fill="none">
            <circle cx="160" cy="100" r="80" fill="#d8eaff" opacity="0.5" />
            <circle cx="160" cy="100" r="80" fill="none" stroke="#a0c8f0" strokeWidth="1" strokeDasharray="4,4" />
            <ellipse cx="160" cy="100" rx="80" ry="30" fill="none" stroke="#a0c8f0" strokeWidth="0.8" opacity="0.6" />
            <path d="M10 180 Q80 120 160 140 Q240 160 290 130" stroke="#00c14a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="80" cy="148" r="6" fill="#e04040" />
            <line x1="80" y1="148" x2="80" y2="130" stroke="#e04040" strokeWidth="1.5" />
            <circle cx="240" cy="148" r="6" fill="#00c14a" />
            <line x1="240" y1="148" x2="240" y2="125" stroke="#00c14a" strokeWidth="1.5" />
            <rect x="130" y="148" width="70" height="32" rx="5" fill="#1a3080" />
            <rect x="130" y="148" width="70" height="14" rx="4" fill="#2a50c0" />
            {[134, 149, 164, 179].map((x, i) => (
              <rect key={i} x={x} y="151" width="12" height="8" rx="1.5" fill="#90c8f8" />
            ))}
            <circle cx="148" cy="182" r="7" fill="#1a1a2a" />
            <circle cx="148" cy="182" r="4" fill="#444" />
            <circle cx="182" cy="182" r="7" fill="#1a1a2a" />
            <circle cx="182" cy="182" r="4" fill="#444" />
            <text x="135" y="172" fontFamily="Arial" fontWeight="800" fontSize="7" fill="#fff" letterSpacing="1">NEXTGEN</text>
          </svg>
          <button style={styles.btnBookNow} onClick={() => navigate('/search')}>
            Book Now
          </button>
        </div>
      </div>

    </div>
  );
};

const styles = {
  /* HERO */
  hero: {
    background: 'linear-gradient(110deg, #0b1f6e 0%, #1040b0 45%, #2060d0 70%, #4090e8 100%)',
    minHeight: 360,
    padding: '44px 28px 0',
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    overflow: 'hidden',
  },
  heroSky: {
    position: 'absolute', top: 0, right: 0,
    width: '60%', height: '100%',
    background: 'linear-gradient(160deg, #7bbcf0 0%, #aad4f8 30%, #d0eaff 60%, #b8d8f5 100%)',
    clipPath: 'polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)',
  },
  heroRoad: {
    position: 'absolute', bottom: 0, right: 0,
    width: '65%', height: '45%',
    background: 'linear-gradient(180deg, #c8dff0 0%, #a0bcd8 100%)',
    clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
  },
  busWrap: {
    position: 'absolute', right: 18, bottom: 0,
    width: 340, height: 220, zIndex: 2,
  },
  heroContent: {
    position: 'relative', zIndex: 5,
    flex: 1, paddingBottom: 32, maxWidth: 460,
  },
  heroTitle: {
    fontSize: 32, fontWeight: 900, color: '#fff',
    lineHeight: 1.2, marginBottom: 10,
    textShadow: '0 2px 12px rgba(0,0,20,0.5)',
  },
  heroSub: { fontSize: 13, color: '#c8dff8', marginBottom: 24, lineHeight: 1.7 },
  searchBox: {
    background: '#fff', borderRadius: 10, padding: '14px 16px',
    display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end',
    maxWidth: 580, boxShadow: '0 6px 24px rgba(0,0,80,0.35)',
  },
  sf: { flex: 1, minWidth: 110 },
  sfLabel: { fontSize: 9, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4, fontWeight: 600 },
  sfInner: {
    display: 'flex', alignItems: 'center', gap: 6,
    border: '1px solid #dde', borderRadius: 6,
    padding: '7px 8px', background: '#f9fafd',
  },
  sfSelect: { border: 'none', background: 'transparent', fontSize: 12, color: '#333', outline: 'none', width: '100%' },
  dot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
  btnFind: {
    background: '#00c14a', color: '#fff', border: 'none',
    padding: '8px 20px', borderRadius: 6, fontSize: 13,
    fontWeight: 700, cursor: 'pointer', height: 36, whiteSpace: 'nowrap',
  },

  /* WHY */
  whySection: { padding: '48px 24px', background: '#f8f9fd', textAlign: 'center' },
  secTitle: { fontSize: 22, fontWeight: 800, color: '#1a2050', marginBottom: 6 },
  secSub: { fontSize: 13, color: '#778', marginBottom: 30, lineHeight: 1.6 },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 14, maxWidth: 880, margin: '0 auto',
  },
  whyCard: {
    background: '#fff', border: '1px solid #e8ecf5',
    borderRadius: 12, padding: '22px 18px',
    textAlign: 'left', display: 'flex', gap: 14, alignItems: 'flex-start',
  },
  whyIconWrap: {
    width: 56, height: 56, borderRadius: 10, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  whyCardTitle: { fontSize: 14, fontWeight: 700, color: '#1a2050', marginBottom: 5 },
  whyCardDesc: { fontSize: 12, color: '#778', lineHeight: 1.6 },

  /* FEATURES */
  featSection: { padding: '44px 24px', background: '#fff' },
  featGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 14, maxWidth: 880, margin: '0 auto',
  },
  featCard: {
    border: '1px solid #e8ecf5', borderRadius: 12,
    padding: '22px 16px', textAlign: 'center',
  },
  featIconBox: {
    width: 70, height: 70, margin: '0 auto 12px',
    borderRadius: 10, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    background: '#eef2ff', fontSize: 28,
  },
  featTitle: { fontSize: 14, fontWeight: 700, color: '#1a2050', marginBottom: 5 },
  featDesc: { fontSize: 12, color: '#889', lineHeight: 1.5 },

  /* REDEFINE */
  redefineSection: {
    background: '#f0f5ff', padding: '48px 24px',
    display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap',
  },
  redefineLeft: { flex: 1, minWidth: 260 },
  redefTag: { fontSize: 11, color: '#2060d0', fontWeight: 700, letterSpacing: 1, marginBottom: 8 },
  redefH2: { fontSize: 24, fontWeight: 800, color: '#1a2050', lineHeight: 1.3, marginBottom: 8 },
  redefSub: { fontSize: 11, color: '#778', letterSpacing: 2, marginBottom: 24 },
  redefItem: { display: 'flex', gap: 12, alignItems: 'center' },
  redefIcon: {
    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 700, color: '#1a6030',
  },
  redefineRight: {
    flex: 1, minWidth: 280, position: 'relative',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  btnBookNow: {
    position: 'absolute', bottom: 10, right: 10,
    background: '#00c14a', color: '#fff',
    padding: '12px 24px', borderRadius: 8,
    fontSize: 14, fontWeight: 700, border: 'none',
    cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,180,60,0.4)',
  },
};

export default HomePage;