import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCities = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get('/api/routes/cities', {
          signal: controller.signal,
          timeout: 10000, // ⏱️ 10 sec timeout (important in production)
        });

        // ✅ Validate response properly
        if (res.status === 200 && Array.isArray(res.data?.data)) {
          setCities(res.data.data);
        } else {
          throw new Error('Invalid API response format');
        }

      } catch (err) {
        // ❌ Handle different error types
        if (axios.isCancel(err)) {
          console.log('Request cancelled');
        } else if (err.code === 'ECONNABORTED') {
          setError('Server is taking too long to respond');
        } else if (err.response) {
          // Server responded with error (4xx, 5xx)
          setError(err.response.data?.message || 'Server error');
        } else if (err.request) {
          // No response (network / backend down)
          setError('Network error. Please check your connection.');
        } else {
          setError(err.message);
        }

        console.error('Fetch Cities Error:', err);
        setCities([]); // safe fallback
      } finally {
        setLoading(false);
      }
    };

    fetchCities();

    // 🧹 Cleanup (important in production)
    return () => controller.abort();
  }, []);

  // 👇 UI handling (important part of production)
  if (loading) return <p>Loading cities...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <select>
      <option value="">Select city</option>
      {cities.map((c, i) => (
        <option key={i} value={c}>{c}</option>
      ))}
    </select>
  );
};

export default HomePage;