import React from 'react';
import Booking from '../../components/Booking';

export default function AccountBookings() {
  return (
    <div style={s.wrapper}>
      <div style={s.header}>
        <h1 style={s.title}>My bookings</h1>
        <p style={s.subtitle}>View and manage your hotel, vehicle and guide bookings.</p>
      </div>
      <Booking isAdmin={false} />
    </div>
  );
}

const s = {
  wrapper: {},
  header: { marginBottom: 'var(--space-6)' },
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-1)', color: 'var(--color-text)', borderLeft: '4px solid var(--color-primary)', paddingLeft: 'var(--space-4)' },
  subtitle: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
};
