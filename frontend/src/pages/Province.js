import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { HotelIcon, CarIcon, GuideIcon } from '../components/Icons';

const PROVINCES = {
  galle: { name: 'Galle', desc: 'Historic fort, beaches and rainforest.' },
  matara: { name: 'Matara', desc: 'Coastal city and cultural sites.' },
  hambantota: { name: 'Hambantota', desc: 'Yala safari, ports and nature.' },
};

export default function Province() {
  const { slug } = useParams();
  const province = PROVINCES[slug] || PROVINCES.galle;

  return (
    <div style={s.wrapper}>
      <div style={s.container}>
        <h1 style={s.title}>{province.name}</h1>
        <p style={s.desc}>{province.desc}</p>
        <p style={s.lead}>Book stays, vehicles and guides in {province.name}. Use the All-in-One package to plan your full trip.</p>
        <div style={s.links}>
          <Link to="/all-in-one" style={s.linkCard}>
            <HotelIcon size={28} color="var(--color-primary)" />
            <span>Stays in {province.name}</span>
          </Link>
          <Link to="/all-in-one" style={s.linkCard}>
            <CarIcon size={28} color="var(--color-primary)" />
            <span>Rent a car</span>
          </Link>
          <Link to="/all-in-one" style={s.linkCard}>
            <GuideIcon size={28} color="var(--color-primary)" />
            <span>Guides</span>
          </Link>
        </div>
        <Link to="/all-in-one" className="btn-primary" style={s.cta}>Book All-in-One in {province.name}</Link>
      </div>
    </div>
  );
}

const s = {
  wrapper: { padding: 'var(--space-12) var(--space-8)' },
  container: { maxWidth: 720, margin: '0 auto' },
  title: { fontSize: 'var(--text-3xl)', fontWeight: 700, marginBottom: 'var(--space-2)' },
  desc: { fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' },
  lead: { marginBottom: 'var(--space-8)' },
  links: { display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' },
  linkCard: { display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none', color: 'var(--color-text)', fontWeight: 600 },
  cta: { textDecoration: 'none', color: '#fff' },
};
