import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const BookingSuccessPage = () => {
  const { state } = useLocation();
  const booking = state?.booking;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>
        <h2 style={styles.title}>Booking Confirmed!</h2>
        <p style={{ color: '#666' }}>Your ticket has been booked successfully.</p>

        {booking && (
          <div style={styles.details}>
            <div style={styles.row}>
              <span>Booking Ref</span>
              <strong style={{ color: '#003087', fontSize: '1.2rem' }}>{booking.booking_ref}</strong>
            </div>
            <div style={styles.row}>
              <span>Passenger</span>
              <strong>{booking.passenger_name}</strong>
            </div>
            <div style={styles.row}>
              <span>Gender / Age</span>
              <strong>{booking.passenger_gender} / {booking.passenger_age} yrs</strong>
            </div>
            <div style={styles.row}>
              <span>Amount Paid</span>
              <strong style={{ color: '#00c851' }}>₹{booking.total_amount}</strong>
            </div>
            <div style={styles.row}>
              <span>Payment ID</span>
              <span style={{ fontSize: '0.8rem', color: '#888' }}>{booking.razorpay_payment_id}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <Link to="/" style={styles.btnPrimary}>🏠 Go Home</Link>
          <Link to="/my-bookings" style={styles.btnSecondary}>📋 My Bookings</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#f0fff5' },
  card: { background: 'white', borderRadius: '16px', padding: '50px 40px', maxWidth: '480px', width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,200,80,0.15)' },
  icon: { fontSize: '5rem', marginBottom: '16px' },
  title: { color: '#003087', fontSize: '2rem', fontWeight: 900 },
  details: { background: '#f8f9fa', borderRadius: '12px', padding: '20px', marginTop: '24px', textAlign: 'left' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' },
  btnPrimary: { background: '#003087', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 },
  btnSecondary: { background: '#f0f9ff', color: '#003087', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, border: '1px solid #003087' },
};

export default BookingSuccessPage;