import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
  const navigate = useNavigate();
  const schedule = JSON.parse(localStorage.getItem('selectedSchedule') || '{}');
  const [passenger, setPassenger] = useState({ name: '', age: '', gender: '' });
  const [agreed, setAgreed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!schedule.id) {
    return (
      <div style={styles.center}>
        No bus selected. <a href="/">Go Home</a>
      </div>
    );
  }

  const handlePassengerSubmit = (e) => {
    e.preventDefault();
    if (!passenger.name || !passenger.age || !passenger.gender)
      return alert('Please fill all passenger details.');
    if (!agreed)
      return alert('Please accept the Terms & Conditions.');
    setShowPayment(true);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Step 1: Create Razorpay order
      const orderRes = await axios.post('/api/bookings/create-order', {
        schedule_id: schedule.id,
        passenger_name: passenger.name,
        passenger_age: passenger.age,
        passenger_gender: passenger.gender,
        seat_count: 1,
      });

      const { order_id, amount, key } = orderRes.data.data;

      // Step 2: Open Razorpay popup
      const options = {
        key,
        amount,
        currency: 'INR',
        name: 'NextGen Travel',
        description: `${schedule.from_city} → ${schedule.to_city}`,
        order_id,
        handler: async (response) => {
          // Step 3: Verify payment on backend
          try {
            const verifyRes = await axios.post('/api/bookings/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              schedule_id: schedule.id,
              passenger_name: passenger.name,
              passenger_age: passenger.age,
              passenger_gender: passenger.gender,
              total_amount: schedule.price,
              seat_count: 1,
            });

            if (verifyRes.data.success) {
              localStorage.removeItem('selectedSchedule');
              navigate('/booking-success', {
                state: { booking: verifyRes.data.data }
              });
            }
          } catch (err) {
            alert('Payment verification failed. Contact support.');
          }
        },
        prefill: { name: passenger.name },
        theme: { color: '#003087' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.response?.data?.message || 'Payment failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Complete Your Booking</h2>

      {/* Journey Summary */}
      <div style={styles.summaryBox}>
        <h3 style={{ color: '#003087', margin: 0 }}>{schedule.bus_name}</h3>
        <p style={{ margin: '8px 0', fontSize: '1.1rem' }}>
          📍 {schedule.from_city} → {schedule.to_city}
        </p>
        <p style={{ margin: 0, color: '#666' }}>
          🕐 {schedule.departure_time?.slice(0,5)} | 📅 {schedule.travel_date}
        </p>
        <div style={styles.priceTag}>₹{schedule.price}</div>
      </div>

      {/* Passenger Details Form */}
      <div style={styles.formBox}>
        <h3>👤 Passenger Details</h3>
        <form onSubmit={handlePassengerSubmit}>
          <label style={styles.label}>Full Name</label>
          <input
            style={styles.input}
            placeholder="Enter passenger name"
            value={passenger.name}
            onChange={e => setPassenger({ ...passenger, name: e.target.value })}
          />

          <label style={styles.label}>Age</label>
          <input
            style={styles.input}
            type="number"
            placeholder="Age"
            min="1" max="120"
            value={passenger.age}
            onChange={e => setPassenger({ ...passenger, age: e.target.value })}
          />

          <label style={styles.label}>Gender</label>
          <select
            style={styles.input}
            value={passenger.gender}
            onChange={e => setPassenger({ ...passenger, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* T&C Checkbox */}
          <div style={styles.tcBox}>
            <input
              type="checkbox"
              id="tc"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              style={{ marginRight: '10px', width: '18px', height: '18px' }}
            />
            <label htmlFor="tc" style={{ cursor: 'pointer' }}>
              ✅ I have read and agree to all{' '}
              <span style={{ color: '#003087', textDecoration: 'underline' }}>
                Terms & Conditions
              </span>
            </label>
          </div>

          {!showPayment && (
            <button type="submit" style={styles.proceedBtn}>
              Proceed to Payment →
            </button>
          )}
        </form>

        {/* Payment Button — shown after T&C accepted */}
        {showPayment && (
          <div style={styles.paymentBox}>
            <h3>💳 Payment</h3>
            <p>Amount to pay: <strong style={{ fontSize: '1.4rem', color: '#003087' }}>₹{schedule.price}</strong></p>
            <button
              onClick={handlePayment}
              disabled={loading}
              style={styles.payBtn}
            >
              {loading ? '⏳ Processing...' : '💳 Pay with Razorpay'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '700px', margin: '40px auto', padding: '0 20px' },
  heading: { fontSize: '2rem', fontWeight: 800, color: '#003087', marginBottom: '24px' },
  center: { textAlign: 'center', padding: '80px', fontSize: '1.1rem' },
  summaryBox: {
    background: 'linear-gradient(135deg, #003087, #0066cc)',
    color: 'white',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '24px',
    position: 'relative',
  },
  priceTag: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '2rem',
    fontWeight: 900,
    background: '#00c851',
    padding: '8px 16px',
    borderRadius: '8px',
  },
  formBox: {
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '30px',
  },
  label: { display: 'block', fontWeight: 600, marginTop: '16px', marginBottom: '6px', color: '#333' },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  tcBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    background: '#f0f9ff',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #b3d9ff',
  },
  proceedBtn: {
    marginTop: '20px',
    width: '100%',
    padding: '14px',
    background: '#003087',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 700,
    cursor: 'pointer',
  },
  paymentBox: {
    marginTop: '24px',
    background: '#f8f9fa',
    padding: '24px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  payBtn: {
    background: '#00c851',
    color: 'white',
    border: 'none',
    padding: '16px 40px',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default BookingPage;