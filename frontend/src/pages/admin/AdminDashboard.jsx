import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HotelIcon, CarIcon, GuideIcon, BookingIcon, ProfileIcon } from '../../components/Icons';
import { API_ROOT, getAuthHeaders } from '../../config/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(`${API_ROOT}/admin/overview`, {
          headers: getAuthHeaders(),
        });
        if (!cancelled) setStats(res.data);
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load admin stats', err);
          setStats(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = [
    { key: 'users', value: stats?.userCount ?? 0, label: 'Total users', Icon: ProfileIcon, color: 'var(--color-primary)' },
    { key: 'hotels', value: stats?.hotelCount ?? 0, label: 'Hotels', Icon: HotelIcon, color: 'var(--color-success)' },
    { key: 'vehicles', value: stats?.vehicleCount ?? 0, label: 'Vehicles', Icon: CarIcon, color: 'var(--color-info)' },
    { key: 'guides', value: stats?.guideCount ?? 0, label: 'Guides', Icon: GuideIcon, color: 'var(--color-warning)' },
    { key: 'bookings', value: stats?.bookingCount ?? 0, label: 'Total bookings', Icon: BookingIcon, color: 'var(--color-primary)' },
  ];

  return (
    <div>
      <h1 style={s.title}>Dashboard</h1>
      <p style={s.subtitle}>Overview of Southern Tourism system.</p>
      <div style={s.grid}>
        {loading ? (
          <div>Loading stats...</div>
        ) : (
          cards.map(({ key, value, label, Icon, color }) => (
            <div key={key} className="card-enterprise" style={s.card}>
              <div style={{ ...s.iconWrap, background: color + '20', color }}>
                <Icon size={28} color={color} />
              </div>
              <span style={s.value}>{value}</span>
              <span style={s.label}>{label}</span>
            </div>
          ))
        )}
      </div>
      <div style={s.links}>
        <Link to="/admin/users" style={s.link}>Manage users</Link>
        <Link to="/admin/bookings" style={s.link}>View bookings</Link>
      </div>
    </div>
  );
}

const s = {
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' },
  subtitle: { color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-6)' },
  card: { padding: 'var(--space-6)', textAlign: 'center' },
  iconWrap: { width: 56, height: 56, borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' },
  value: { display: 'block', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-text)' },
  label: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
  links: { marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)' },
  link: { color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' },
};
