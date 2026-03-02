import React, { useState } from 'react';
import Logo from './Logo';

/**
 * Shared layout for both /account and /admin: sidebar (collapsible, hideable) + header + content.
 * @param {React.ReactNode} sidebar - Sidebar content (e.g. AdminSidebar or AccountSidebar)
 * @param {string} headerTitle - Title in the top bar (e.g. "My account" or "Admin panel")
 * @param {React.ReactNode} children - Main content (e.g. <Outlet />)
 */
export default function DashboardLayout({ sidebar, headerTitle, children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const sidebarWithProps = React.isValidElement(sidebar)
    ? React.cloneElement(sidebar, {
        collapsed: sidebarCollapsed,
        onToggleCollapse: () => setSidebarCollapsed((c) => !c),
        onHide: () => setSidebarHidden(true),
      })
    : sidebar;

  return (
    <div style={s.wrapper}>
      {!sidebarHidden && sidebarWithProps}
      <div style={s.main}>
        <header style={s.header}>
          {sidebarHidden && (
            <button
              type="button"
              onClick={() => setSidebarHidden(false)}
              style={s.showSidebarBtn}
              aria-label="Show sidebar"
            >
              ☰ Menu
            </button>
          )}
          <Logo to="/" size="sm" />
          <span style={s.breadcrumb}>{headerTitle}</span>
        </header>
        <div style={s.content}>{children}</div>
      </div>
    </div>
  );
}

const s = {
  wrapper: { display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' },
  main: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
    padding: 'var(--space-4)',
    background: 'var(--color-bg-card)',
    borderBottom: '1px solid var(--color-border)',
  },
  showSidebarBtn: {
    padding: 'var(--space-2) var(--space-3)',
    background: 'var(--color-primary)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
  },
  breadcrumb: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontWeight: 600 },
  content: { flex: 1, padding: 'var(--space-6)', overflow: 'auto' },
};
