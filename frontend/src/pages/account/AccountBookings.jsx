import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Booking from '../../components/Booking';
import { TOURISM_BOOKINGS_API } from '../../config/api';

export default function AccountBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(TOURISM_BOOKINGS_API);
        if (!cancelled) {
          setBookings(res.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load bookings', err);
          setBookings([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={s.wrapper}>
      <div style={s.header}>
        <h1 style={s.title}>My bookings</h1>
        <p style={s.subtitle}>View and manage your hotel, vehicle and guide bookings.</p>
      </div>
      <Booking bookings={bookings} loading={loading} />
    </div>
  );
}

const s = {
  wrapper: {},
  header: { marginBottom: 'var(--space-6)' },
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-1)', color: 'var(--color-text)', borderLeft: '4px solid var(--color-primary)', paddingLeft: 'var(--space-4)' },
  subtitle: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
};
