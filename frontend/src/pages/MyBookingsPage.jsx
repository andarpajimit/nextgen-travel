import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/bookings/my-bookings')
      .then(res => { setBookings(res.data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '80px' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ color: '#003087', fontSize: '2rem', fontWeight: 900 }}>My Bookings 📋</h2>
      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>No bookings yet. <a href="/">Book a bus!</a></div>
      ) : (
        bookings.map(b => (
          <div key={b.id} style={styles.card}>
            <div style={styles.top}>
              <div>
                <strong style={{ fontSize: '1.2rem', color: '#003087' }}>{b.from_city} → {b.to_city}</strong>
                <p style={{ margin: '4px 0', color: '#666' }}>{b.bus_name} | {b.bus_type}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={styles.ref}>{b.booking_ref}</div>
                <span style={{ ...styles.badge, background: b.payment_status === 'paid' ? '#e8fff0' : '#ffe0e0', color: b.payment_status === 'paid' ? '#00a040' : '#c00' }}>
                  {b.payment_status.toUpperCase()}
                </span>
              </div>
            </div>
            <div style={styles.details}>
              <span>📅 {new Date(b.travel_date).toDateString()}</span>
              <span>🕐 {b.departure_time?.slice(0,5)} → {b.arrival_time?.slice(0,5)}</span>
              <span>👤 {b.passenger_name} | {b.passenger_gender} | {b.passenger_age} yrs</span>
              <span style={{ color: '#003087', fontWeight: 700 }}>₹{b.total_amount}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  card: { background: 'white', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  top: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' },
  ref: { fontWeight: 900, color: '#003087', fontSize: '1.1rem' },
  badge: { display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 },
  details: { display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f0f0f0', color: '#555', fontSize: '0.9rem' },
};

export default MyBookingsPage;