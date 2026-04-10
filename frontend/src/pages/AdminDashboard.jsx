import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [tab, setTab] = useState('stats');
  const [stats, setStats] = useState({});
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [busForm, setBusForm] = useState({ bus_number: '', bus_name: '', bus_type: 'Volvo AC', total_seats: 40 });
  const [routeForm, setRouteForm] = useState({ from_city: '', to_city: '', distance_km: '' });
  const [scheduleForm, setScheduleForm] = useState({ route_id: '', bus_id: '', departure_time: '', arrival_time: '', travel_date: '', price: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (tab === 'stats') axios.get('/api/bookings/stats').then(r => setStats(r.data.data));
    if (tab === 'buses') axios.get('/api/buses').then(r => setBuses(r.data.data));
    if (tab === 'routes') axios.get('/api/routes').then(r => setRoutes(r.data.data));
    if (tab === 'schedules') {
      axios.get('/api/schedules').then(r => setSchedules(r.data.data));
      axios.get('/api/buses').then(r => setBuses(r.data.data));
      axios.get('/api/routes').then(r => setRoutes(r.data.data));
    }
    if (tab === 'bookings') axios.get('/api/bookings').then(r => setBookings(r.data.data));
  }, [tab]);

  const showMsg = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const addBus = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/buses', busForm);
      showMsg('✅ Bus added!');
      setBusForm({ bus_number: '', bus_name: '', bus_type: 'Volvo AC', total_seats: 40 });
      axios.get('/api/buses').then(r => setBuses(r.data.data));
    } catch (err) { showMsg('❌ ' + (err.response?.data?.message || 'Error')); }
  };

  const addRoute = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/routes', routeForm);
      showMsg('✅ Route added!');
      setRouteForm({ from_city: '', to_city: '', distance_km: '' });
      axios.get('/api/routes').then(r => setRoutes(r.data.data));
    } catch (err) { showMsg('❌ ' + (err.response?.data?.message || 'Error')); }
  };

  const addSchedule = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/schedules', scheduleForm);
      showMsg('✅ Schedule created!');
      axios.get('/api/schedules').then(r => setSchedules(r.data.data));
    } catch (err) { showMsg('❌ ' + (err.response?.data?.message || 'Error')); }
  };

  const tabs = ['stats', 'buses', 'routes', 'schedules', 'bookings'];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛠 Admin Dashboard</h2>

      {/* Tabs */}
      <div style={styles.tabRow}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ ...styles.tabBtn, background: tab === t ? '#003087' : '#f0f0f0', color: tab === t ? 'white' : '#333' }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {msg && <div style={styles.msg}>{msg}</div>}

      {/* Stats */}
      {tab === 'stats' && (
        <div style={styles.statsGrid}>
          {[
            { label: 'Total Bookings', value: stats.totalBookings, icon: '🎫' },
            { label: 'Total Revenue', value: `₹${(stats.totalRevenue || 0).toLocaleString()}`, icon: '💰' },
            { label: 'Total Customers', value: stats.totalCustomers, icon: '👥' },
            { label: 'Total Routes', value: stats.totalRoutes, icon: '🗺️' },
          ].map((s, i) => (
            <div key={i} style={styles.statCard}>
              <div style={{ fontSize: '2.5rem' }}>{s.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#003087' }}>{s.value ?? '...'}</div>
              <div style={{ color: '#888' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Buses */}
      {tab === 'buses' && (
        <div>
          <form onSubmit={addBus} style={styles.form}>
            <h3>Add New Bus</h3>
            <div style={styles.formRow}>
              <input style={styles.input} placeholder="Bus Number (NG005)" value={busForm.bus_number} onChange={e => setBusForm({ ...busForm, bus_number: e.target.value })} required />
              <input style={styles.input} placeholder="Bus Name" value={busForm.bus_name} onChange={e => setBusForm({ ...busForm, bus_name: e.target.value })} required />
              <select style={styles.input} value={busForm.bus_type} onChange={e => setBusForm({ ...busForm, bus_type: e.target.value })}>
                {['Volvo AC', 'AC Sleeper', 'AC Seater', 'Non-AC Seater', 'Non-AC Sleeper'].map(t => <option key={t}>{t}</option>)}
              </select>
              <input style={styles.input} type="number" placeholder="Total Seats" value={busForm.total_seats} onChange={e => setBusForm({ ...busForm, total_seats: e.target.value })} required />
            </div>
            <button type="submit" style={styles.addBtn}>+ Add Bus</button>
          </form>
          <table style={styles.table}>
            <thead><tr>{['#', 'Bus No.', 'Name', 'Type', 'Seats'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr></thead>
            <tbody>
              {buses.map((b, i) => (
                <tr key={b.id}>
                  <td style={styles.td}>{i + 1}</td>
                  <td style={styles.td}>{b.bus_number}</td>
                  <td style={styles.td}>{b.bus_name}</td>
                  <td style={styles.td}>{b.bus_type}</td>
                  <td style={styles.td}>{b.total_seats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Routes */}
      {tab === 'routes' && (
        <div>
          <form onSubmit={addRoute} style={styles.form}>
            <h3>Add New Route</h3>
            <div style={styles.formRow}>
              <input style={styles.input} placeholder="From City" value={routeForm.from_city} onChange={e => setRouteForm({ ...routeForm, from_city: e.target.value })} required />
              <input style={styles.input} placeholder="To City" value={routeForm.to_city} onChange={e => setRouteForm({ ...routeForm, to_city: e.target.value })} required />
              <input style={styles.input} type="number" placeholder="Distance (km)" value={routeForm.distance_km} onChange={e => setRouteForm({ ...routeForm, distance_km: e.target.value })} />
            </div>
            <button type="submit" style={styles.addBtn}>+ Add Route</button>
          </form>
          <table style={styles.table}>
            <thead><tr>{['#', 'From', 'To', 'Distance'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr></thead>
            <tbody>
              {routes.map((r, i) => (
                <tr key={r.id}>
                  <td style={styles.td}>{i + 1}</td>
                  <td style={styles.td}>{r.from_city}</td>
                  <td style={styles.td}>{r.to_city}</td>
                  <td style={styles.td}>{r.distance_km} km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Schedules */}
      {tab === 'schedules' && (
        <div>
          <form onSubmit={addSchedule} style={styles.form}>
            <h3>Add New Schedule</h3>
            <div style={styles.formRow}>
              <select style={styles.input} value={scheduleForm.route_id} onChange={e => setScheduleForm({ ...scheduleForm, route_id: e.target.value })} required>
                <option value="">Select Route</option>
                {routes.map(r => <option key={r.id} value={r.id}>{r.from_city} → {r.to_city}</option>)}
              </select>
              <select style={styles.input} value={scheduleForm.bus_id} onChange={e => setScheduleForm({ ...scheduleForm, bus_id: e.target.value })} required>
                <option value="">Select Bus</option>
                {buses.map(b => <option key={b.id} value={b.id}>{b.bus_name} ({b.bus_number})</option>)}
              </select>
              <input style={styles.input} type="date" value={scheduleForm.travel_date} onChange={e => setScheduleForm({ ...scheduleForm, travel_date: e.target.value })} required />
              <input style={styles.input} type="time" placeholder="Departure" value={scheduleForm.departure_time} onChange={e => setScheduleForm({ ...scheduleForm, departure_time: e.target.value })} required />
              <input style={styles.input} type="time" placeholder="Arrival" value={scheduleForm.arrival_time} onChange={e => setScheduleForm({ ...scheduleForm, arrival_time: e.target.value })} required />
              <input style={styles.input} type="number" placeholder="Price (₹)" value={scheduleForm.price} onChange={e => setScheduleForm({ ...scheduleForm, price: e.target.value })} required />
            </div>
            <button type="submit" style={styles.addBtn}>+ Add Schedule</button>
          </form>
          <table style={styles.table}>
            <thead><tr>{['Route', 'Bus', 'Date', 'Depart', 'Arrive', 'Price', 'Seats', 'Status'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr></thead>
            <tbody>
              {schedules.map(s => (
                <tr key={s.id}>
                  <td style={styles.td}>{s.from_city} → {s.to_city}</td>
                  <td style={styles.td}>{s.bus_name}</td>
                  <td style={styles.td}>{s.travel_date?.split('T')[0]}</td>
                  <td style={styles.td}>{s.departure_time?.slice(0,5)}</td>
                  <td style={styles.td}>{s.arrival_time?.slice(0,5)}</td>
                  <td style={styles.td}>₹{s.price}</td>
                  <td style={styles.td}>{s.available_seats}</td>
                  <td style={styles.td}><span style={{ color: s.status === 'active' ? 'green' : 'red' }}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bookings */}
      {tab === 'bookings' && (
        <table style={styles.table}>
          <thead><tr>{['Ref', 'Customer', 'Route', 'Date', 'Passenger', 'Amount', 'Status'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr></thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td style={styles.td}><strong>{b.booking_ref}</strong></td>
                <td style={styles.td}>{b.user_name}<br /><small style={{ color: '#888' }}>{b.email}</small></td>
                <td style={styles.td}>{b.from_city} → {b.to_city}</td>
                <td style={styles.td}>{b.travel_date?.split('T')[0]}</td>
                <td style={styles.td}>{b.passenger_name}</td>
                <td style={styles.td}>₹{b.total_amount}</td>
                <td style={styles.td}><span style={{ color: b.payment_status === 'paid' ? 'green' : 'red', fontWeight: 700 }}>{b.payment_status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '1100px', margin: '30px auto', padding: '0 20px' },
  heading: { color: '#003087', fontSize: '2rem', fontWeight: 900 },
  tabRow: { display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' },
  tabBtn: { padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' },
  msg: { background: '#e8fff0', border: '1px solid #b3e6c8', color: '#006030', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: 600 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
  statCard: { background: 'white', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '30px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  form: { background: 'white', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '24px', marginBottom: '24px' },
  formRow: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  input: { flex: '1 1 180px', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem' },
  addBtn: { marginTop: '12px', padding: '10px 24px', background: '#003087', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  th: { background: '#003087', color: 'white', padding: '12px 16px', textAlign: 'left', fontWeight: 700 },
  td: { padding: '12px 16px', borderBottom: '1px solid #f0f0f0', fontSize: '0.9rem' },
};

export default AdminDashboard;