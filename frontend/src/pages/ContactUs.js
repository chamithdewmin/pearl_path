import React from 'react';
import { LocationIcon } from '../components/Icons';

export default function ContactUs() {
  return (
    <div style={s.wrapper}>
      <div style={s.container}>
        <h1 style={s.title}>Contact Us</h1>
        <p style={s.lead}>Get in touch with the Southern Tourism team.</p>
        <div className="card-enterprise" style={s.card}>
          <div style={s.row}>
            <LocationIcon size={24} color="var(--color-primary)" />
            <div>
              <strong>Southern Tourism</strong><br />
              Southern Province, Sri Lanka<br />
              Galle · Matara · Hambantota
            </div>
          </div>
          <p style={s.note}>For bookings and support, sign in to your account or use the All-in-One booking flow. Registered users can also chat with guides from their dashboard.</p>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrapper: { padding: 'var(--space-12) var(--space-8)' },
  container: { maxWidth: 560, margin: '0 auto' },
  title: { fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-text)', marginBottom: 'var(--space-4)' },
  lead: { color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' },
  card: { padding: 'var(--space-8)' },
  row: { display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', marginBottom: 'var(--space-4)' },
  note: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
};
