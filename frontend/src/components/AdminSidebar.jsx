import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  HotelIcon,
  CarIcon,
  GuideIcon,
  BookingIcon,
  ProfileIcon,
} from './Icons';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin', end: true, label: 'Dashboard', Icon: null },
  { to: '/admin/users', label: 'Users', Icon: ProfileIcon },
  { to: '/admin/guides', label: 'Guides', Icon: GuideIcon },
  { to: '/admin/vehicles', label: 'Vehicles', Icon: CarIcon },
  { to: '/admin/hotels', label: 'Hotels', Icon: HotelIcon },
  { to: '/admin/bookings', label: 'Bookings', Icon: BookingIcon },
];

export default function AdminSidebar({ collapsed, onToggleCollapse, onHide }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside style={sidebarStyle(collapsed)}>
      <div style={s.header}>
        <span style={s.logo}>{collapsed ? 'ST' : 'Southern Tourism Admin'}</span>
        <div style={s.headerActions}>
          <button type="button" onClick={onToggleCollapse} style={s.toggleBtn} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} title={collapsed ? 'Expand' : 'Collapse'}>
            {collapsed ? '→' : '←'}
          </button>
          {onHide && (
            <button type="button" onClick={onHide} style={s.hideBtn} aria-label="Hide sidebar" title="Hide sidebar">
              ✕
            </button>
          )}
        </div>
      </div>
      <nav style={s.nav}>
        {links.map(({ to, end, label, Icon }) => (
          <NavLink key={to} to={to} end={end} style={({ isActive }) => ({ ...s.link, ...(isActive ? s.linkActive : {}) })}>
            {Icon && <Icon size={20} color="currentColor" />}
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
      {!collapsed && (
        <div style={s.footer}>
          <button
            type="button"
            style={s.accountLinkBtn}
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
          >
            Sign out of admin
          </button>
          {onHide && (
            <button type="button" onClick={onHide} style={s.hideSidebarLink}>
              Hide sidebar
            </button>
          )}
        </div>
      )}
    </aside>
  );
}

function sidebarStyle(collapsed) {
  return {
    width: collapsed ? 72 : 260,
    minHeight: '100vh',
    background: 'var(--color-bg-card)',
    borderRight: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.2s',
    flexShrink: 0,
  };
}

const s = {
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)' },
  logo: { fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-primary)' },
  headerActions: { display: 'flex', alignItems: 'center', gap: 'var(--space-2)' },
  toggleBtn: { padding: 'var(--space-2)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 'var(--text-sm)' },
  hideBtn: { padding: 'var(--space-2)', background: 'transparent', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
  nav: { flex: 1, padding: 'var(--space-2)', overflowY: 'auto' },
  link: { display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', fontWeight: 500 },
  linkActive: { background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontWeight: 600 },
  footer: { padding: 'var(--space-3)', borderTop: '1px solid var(--color-border)' },
  accountLinkBtn: {
    display: 'block',
    width: '100%',
    marginBottom: 'var(--space-2)',
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--color-primary)',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: 0,
    cursor: 'pointer',
  },
  hideSidebarLink: { width: '100%', padding: 'var(--space-2)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textAlign: 'left', borderRadius: 'var(--radius-sm)' },
};
