import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ to = '/', size = 'md', className = '' }) {
  const sizes = { sm: 28, md: 36, lg: 44 };
  const h = sizes[size] || sizes.md;
  return (
    <Link to={to} className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }} aria-label="Southern Tourism Home">
      <svg width={h} height={h} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="40" height="40" rx="8" fill="var(--color-primary)" />
        <path d="M12 28V16l8-4 8 4v12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M12 16l8 4 8-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="2" fill="white" />
      </svg>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: size === 'lg' ? '1.35rem' : size === 'sm' ? '1rem' : '1.2rem', color: 'var(--color-primary)' }}>
        Southern Tourism
      </span>
    </Link>
  );
}
