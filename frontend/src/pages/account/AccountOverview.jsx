import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { HotelIcon, CarIcon, GuideIcon, BookingIcon } from '../../components/Icons';

const quickLinks = [
  { to: '/account/hotels', label: 'Browse hotels', Icon: HotelIcon },
  { to: '/account/vehicles', label: 'Rent a vehicle', Icon: CarIcon },
  { to: '/account/guides', label: 'Find a guide', Icon: GuideIcon },
  { to: '/account/bookings', label: 'My bookings', Icon: BookingIcon },
];

export default function AccountOverview() {
  const { user } = useOutletContext();

  return (
    <div style={s.wrapper}>
      <h1 style={s.title}>Welcome back, {user?.fullName || user?.email || 'Guest'}</h1>
      <p style={s.subtitle}>Manage your stays, vehicles, guides and bookings in one place.</p>

      <div style={s.section}>
        <h2 style={s.sectionTitle}>Quick links</h2>
        <div style={s.grid}>
          {quickLinks.map(({ to, label, Icon }) => (
            <Link key={to} to={to} style={s.card}>
              <div style={s.cardIcon}>
                <Icon size={28} color="var(--color-primary)" />
              </div>
              <span style={s.cardLabel}>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div style={s.section}>
        <h2 style={s.sectionTitle}>Details</h2>
        <div className="card-enterprise" style={s.detailsCard}>
          <p style={s.detailRow}><strong>Email</strong> {user?.email}</p>
          <p style={s.detailRow}><strong>Name</strong> {user?.fullName || '—'}</p>
          <p style={s.detailRow}><strong>Role</strong> {user?.role === 'ADMIN' ? 'Administrator' : 'User'}</p>
          <Link to="/account/profile" style={s.profileLink}>Edit profile →</Link>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrapper: {},
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--color-text)' },
  subtitle: { color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' },
  section: { marginBottom: 'var(--space-8)' },
  sectionTitle: { fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--color-text)', borderLeft: '4px solid var(--color-primary)', paddingLeft: 'var(--space-3)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 'var(--space-4)' },
  card: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-6)', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none', color: 'var(--color-text)', transition: 'box-shadow 0.2s' },
  cardIcon: { width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardLabel: { fontSize: 'var(--text-sm)', fontWeight: 600 },
  detailsCard: { padding: 'var(--space-6)', maxWidth: 480 },
  detailRow: { marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' },
  profileLink: { display: 'inline-block', marginTop: 'var(--space-4)', color: 'var(--color-primary)', fontWeight: 600, fontSize: 'var(--text-sm)', textDecoration: 'none' },
};
