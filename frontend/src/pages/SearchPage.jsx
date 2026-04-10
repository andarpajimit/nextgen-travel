import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/schedules/search?from=${from}&to=${to}&date=${date}`)
      .then(res => { setBuses(res.data.data); setLoading(false); })
      .catch(() => { setError('No buses found.'); setLoading(false); });
  }, [from, to, date]);

  const handleBook = (schedule) => {
    if (!user) {
      alert('Please login to book a ticket!');
      navigate('/login');
      return;
    }
    // Store selected bus in localStorage and go to booking page
    localStorage.setItem('selectedSchedule', JSON.stringify(schedule));
    navigate('/book');
  };

  if (loading) return <div style={styles.center}>🔍 Searching buses...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        🚌 {from} → {to} | {new Date(date).toDateString()}
      </h2>
      <p style={{ color: '#666' }}>{buses.length} bus(es) found</p>

      {error && <div style={styles.error}>{error}</div>}

      {buses.length === 0 && !error && (
        <div style={styles.empty}>No buses available for this route/date.</div>
      )}

      {buses.map(bus => (
        <div key={bus.id} style={styles.busCard}>
          <div style={styles.busLeft}>
            <h3 style={{ color: '#003087', margin: 0 }}>{bus.bus_name}</h3>
            <span style={styles.busType}>{bus.bus_type}</span>
            <div style={styles.timeRow}>
              <span style={styles.time}>{bus.departure_time.slice(0,5)}</span>
              <span style={styles.arrow}>──────►</span>
              <span style={styles.time}>{bus.arrival_time.slice(0,5)}</span>
            </div>
            <div style={styles.amenities}>
              {(bus.amenities || []).map(a => (
                <span key={a} style={styles.amenityTag}>{a}</span>
              ))}
            </div>
          </div>
          <div style={styles.busRight}>
            <div style={styles.price}>₹{bus.price}</div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>{bus.available_seats} seats left</div>
            <button
              onClick={() => handleBook(bus)}
              style={{
                ...styles.bookBtn,
                background: bus.available_seats === 0 ? '#ccc' : '#00c851',
                cursor: bus.available_seats === 0 ? 'not-allowed' : 'pointer',
              }}
              disabled={bus.available_seats === 0}
            >
              {bus.available_seats === 0 ? 'FULL' : 'BOOK NOW'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { maxWidth: '900px', margin: '40px auto', padding: '0 20px' },
  heading: { fontSize: '1.8rem', fontWeight: 800, color: '#003087', marginBottom: '8px' },
  center: { textAlign: 'center', padding: '80px', fontSize: '1.2rem' },
  error: { background: '#ffe0e0', color: '#c00', padding: '15px', borderRadius: '8px' },
  empty: { textAlign: 'center', padding: '60px', color: '#888', fontSize: '1.1rem' },
  busCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    flexWrap: 'wrap',
    gap: '16px',
  },
  busLeft: { flex: 1 },
  busType: { background: '#e8f4ff', color: '#003087', padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem' },
  timeRow: { display: 'flex', alignItems: 'center', gap: '12px', margin: '12px 0' },
  time: { fontSize: '1.4rem', fontWeight: 700, color: '#003087' },
  arrow: { color: '#888', flex: 1 },
  amenities: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  amenityTag: { background: '#f0f9f0', color: '#00a040', border: '1px solid #b3e6c8', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem' },
  busRight: { textAlign: 'center' },
  price: { fontSize: '2rem', fontWeight: 900, color: '#003087' },
  bookBtn: { color: 'white', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '1rem', fontWeight: 700, marginTop: '10px' },
};

export default SearchPage;