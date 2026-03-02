import React from 'react';
import { Link } from 'react-router-dom';

export default function Provinces() {
  return (
    <div style={s.wrapper}>
      <div style={s.container}>
        <h1 style={s.title}>Southern Provinces</h1>
        <p style={s.lead}>Explore Galle, Matara and Hambantota. Book your stay, vehicle and guide from the All-in-One package.</p>
        <div style={s.grid}>
          {['galle', 'matara', 'hambantota'].map((slug) => (
            <Link key={slug} to={`/provinces/${slug}`} style={s.card}>
              {slug.charAt(0).toUpperCase() + slug.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  wrapper: { padding: 'var(--space-12) var(--space-8)' },
  container: { maxWidth: 800, margin: '0 auto' },
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)' },
  lead: { color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' },
  card: { padding: 'var(--space-8)', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none', color: 'var(--color-primary)', fontWeight: 700, textAlign: 'center' },
};
