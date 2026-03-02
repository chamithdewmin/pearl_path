import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  IconBed,
  IconCar,
  IconCompass,
  IconGlobe,
  GuideIcon,
  IconTaxi,
} from './Icons';

const PROVINCES = [
  { name: 'Galle', slug: 'galle' },
  { name: 'Matara', slug: 'matara' },
  { name: 'Hambantota', slug: 'hambantota' },
];

const TABS = [
  { label: 'Stays', to: '/', end: true, icon: <IconBed /> },
  { label: 'Car rental', to: '/car-rental', end: true, icon: <IconCar /> },
  { label: 'Guides', to: '/guides', end: true, icon: <GuideIcon size={18} color="currentColor" /> },
  { label: 'Attractions', to: '/provinces', icon: <IconCompass /> },
  { label: 'All-in-One', to: '/all-in-one', icon: null },
];

export default function PublicNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [provincesOpen, setProvincesOpen] = useState(false);

  const displayName = user?.fullName || user?.name || user?.email || '';

  return (
    <nav className="nav-booking">
      <div className="nav-booking-inner">
        <Link to="/" className="nav-logo-booking" aria-label="Southern Tourism Home">
          Southern Tourism<span>.</span>
        </Link>
        <div className="nav-tabs-booking">
          {TABS.map(({ label, to, end, icon }) => (
            <NavLink
              key={label}
              to={to}
              end={end}
              className={({ isActive }) => `nav-tab-booking ${isActive ? 'active' : ''}`}
            >
              {icon}
              {label}
            </NavLink>
          ))}
          <div
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            onMouseEnter={() => setProvincesOpen(true)}
            onMouseLeave={() => setProvincesOpen(false)}
          >
            <NavLink
              to="/provinces"
              className={({ isActive }) => `nav-tab-booking ${isActive ? 'active' : ''}`}
            >
              Southern Provinces
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
            </NavLink>
            {provincesOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: 4,
                  minWidth: 180,
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  boxShadow: '0 4px 16px rgba(0,0,0,.15)',
                  padding: 8,
                  zIndex: 200,
                }}
              >
                {PROVINCES.map((p) => (
                  <Link key={p.slug} to={`/provinces/${p.slug}`} style={{ display: 'block', padding: '10px 12px', color: '#1a1a2e', textDecoration: 'none', fontSize: 13, fontWeight: 600 }} onClick={() => setProvincesOpen(false)}>
                    {p.name}
                  </Link>
                ))}
                <Link to="/provinces" style={{ display: 'block', padding: '10px 12px', color: '#003580', textDecoration: 'none', fontSize: 13, fontWeight: 600, borderTop: '1px solid #eee' }} onClick={() => setProvincesOpen(false)}>
                  All provinces
                </Link>
              </div>
            )}
          </div>
          <NavLink to="/about" className={({ isActive }) => `nav-tab-booking ${isActive ? 'active' : ''}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-tab-booking ${isActive ? 'active' : ''}`}>Contact</NavLink>
        </div>
        <div className="nav-actions-booking">
          <button type="button" className="nav-flag-booking" aria-label="Currency">
            <IconGlobe /> LKR
          </button>
          {user ? (
            <>
              {displayName && (
                <span style={{ color: '#fff', fontSize: 13, marginRight: 8 }}>
                  {displayName}
                </span>
              )}
              <Link
                to={user.role === 'ADMIN' || user.role === 'admin' ? '/admin' : '/account'}
                className="nbtn-booking out"
              >
                {user.role === 'ADMIN' || user.role === 'admin' ? 'Admin panel' : 'My account'}
              </Link>
              <button type="button" className="nbtn-booking out" onClick={() => { logout(); navigate('/'); }}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/signup" className="nbtn-booking out">Register</Link>
              <Link to="/signin" className="nbtn-booking solid">Sign in</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
