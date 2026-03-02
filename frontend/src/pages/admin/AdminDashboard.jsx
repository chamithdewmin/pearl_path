import React from 'react';
import { Link } from 'react-router-dom';
import { HotelIcon, CarIcon, GuideIcon, BookingIcon, ProfileIcon } from '../../components/Icons';

const STATS = [
  { value: 156, label: 'Total users', Icon: ProfileIcon, color: 'var(--color-primary)' },
  { value: 15, label: 'Hotels', Icon: HotelIcon, color: 'var(--color-success)' },
  { value: 24, label: 'Vehicles', Icon: CarIcon, color: 'var(--color-info)' },
  { value: 10, label: 'Guides', Icon: GuideIcon, color: 'var(--color-warning)' },
  { value: 48, label: 'Total bookings', Icon: BookingIcon, color: 'var(--color-primary)' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={s.title}>Dashboard</h1>
      <p style={s.subtitle}>Overview of Southern Tourism system.</p>
      <div style={s.grid}>
        {STATS.map(({ value, label, Icon, color }) => (
          <div key={label} className="card-enterprise" style={s.card}>
            <div style={{ ...s.iconWrap, background: color + '20', color }}><Icon size={28} color={color} /></div>
            <span style={s.value}>{value}</span>
            <span style={s.label}>{label}</span>
          </div>
        ))}
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
