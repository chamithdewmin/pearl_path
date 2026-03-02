import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  IconBed,
  IconCar,
  GuideIcon,
  ProfileIcon,
  BookingIcon,
  IconGift,
  IconHeart,
  LogoutIcon,
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
  { label: 'All-in-One', to: '/all-in-one', icon: null },
];

const menuItemStyle = {
  width: '100%',
  padding: '8px 14px',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: 14,
  color: '#1a1a2e',
  textAlign: 'left',
};

export default function PublicNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [provincesOpen, setProvincesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

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
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 10px',
                  borderRadius: 999,
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: '#ffb700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#003580',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}
                >
                  {(displayName || 'U').charAt(0)}
                </span>
                <span style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {displayName}
                </span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>

              {accountOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 6px 20px rgba(0,0,0,.18)',
                    padding: '6px 0',
                    minWidth: 220,
                    zIndex: 300,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      navigate('/account');
                    }}
                    style={menuItemStyle}
                  >
                    <ProfileIcon size={18} />
                    <span>My account</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      navigate('/account/bookings');
                    }}
                    style={menuItemStyle}
                  >
                    <BookingIcon size={18} />
                    <span>Bookings &amp; Trips</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      navigate('/account');
                    }}
                    style={menuItemStyle}
                  >
                    <IconGift />
                    <span>Genius loyalty program</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      navigate('/account');
                    }}
                    style={menuItemStyle}
                  >
                    <IconGift />
                    <span>Rewards &amp; Wallet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      navigate('/account/bookings');
                    }}
                    style={menuItemStyle}
                  >
                    <ProfileIcon size={18} />
                    <span>Reviews</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      navigate('/account/hotels');
                    }}
                    style={menuItemStyle}
                  >
                    <IconHeart />
                    <span>Saved</span>
                  </button>
                  <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '4px 0' }} />
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      logout();
                      navigate('/');
                    }}
                    style={menuItemStyle}
                  >
                    <LogoutIcon size={18} />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
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
