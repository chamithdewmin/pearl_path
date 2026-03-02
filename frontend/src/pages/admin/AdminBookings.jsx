import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckIcon } from '../../components/Icons';
import { API_ROOT, getAuthHeaders } from '../../config/api';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_ROOT}/bookings`, {
        headers: getAuthHeaders(),
      });
      setBookings(res.data || []);
    } catch (err) {
      console.error('Failed to load bookings', err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const formatService = (b) => {
    if (b.hotel) return b.hotel.name || 'Hotel booking';
    if (b.vehicle) return b.vehicle.model || 'Vehicle booking';
    if (b.guide) return b.guide.name || 'Guide booking';
    return 'Custom package';
  };

  const handleMarkConfirmed = async (id) => {
    try {
      await axios.put(
        `${API_ROOT}/bookings/${id}`,
        { status: 'confirmed' },
        { headers: getAuthHeaders() },
      );
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status: 'confirmed' } : b)));
    } catch (err) {
      alert(err.response?.data?.message || 'Could not update booking status.');
    }
  };

  return (
    <div>
      <h1 style={s.title}>Bookings</h1>
      <div className="card-enterprise" style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>ID</th>
              <th style={s.th}>Tourist</th>
              <th style={s.th}>Service</th>
              <th style={s.th}>Dates</th>
              <th style={s.th}>Status</th>
              <th style={s.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={s.td}>Loading bookings...</td></tr>
            ) : bookings.length === 0 ? (
              <tr><td colSpan={6} style={s.td}>No bookings yet.</td></tr>
            ) : (
              bookings.map((b) => (
                <tr key={b._id} style={s.tr}>
                  <td style={s.td}>{b._id}</td>
                  <td style={s.td}>{b.tourist?.name || '—'}</td>
                  <td style={s.td}>{formatService(b)}</td>
                  <td style={s.td}>
                    {new Date(b.startDate).toLocaleDateString()} –{' '}
                    {new Date(b.endDate).toLocaleDateString()}
                  </td>
                  <td style={s.td}>
                    <span className={b.status === 'confirmed' ? 'pill pill-success' : b.status === 'pending' ? 'pill pill-warning' : 'pill'}>
                      {b.status}
                    </span>
                  </td>
                  <td style={s.td}>
                    {b.status === 'pending' && (
                      <button
                        type="button"
                        className="btn-primary icon-text"
                        style={s.approveBtn}
                        onClick={() => handleMarkConfirmed(b._id)}
                      >
                        <CheckIcon size={16} color="#fff" /> Mark confirmed
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const s = {
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-6)' },
  tableWrap: { overflow: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontWeight: 600 },
  tr: { borderBottom: '1px solid var(--color-border)' },
  td: { padding: 'var(--space-4)' },
  approveBtn: { padding: 'var(--space-2) var(--space-3)' },
};