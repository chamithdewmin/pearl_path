import React, { useState } from 'react';
import Guide from '../../components/Guide';
import { SearchIcon } from '../../components/Icons';

export default function AccountGuides() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={s.wrapper}>
      <div style={s.header}>
        <h1 style={s.title}>Guides</h1>
        <p style={s.subtitle}>Find local guides for history, wildlife and culture.</p>
      </div>
      <div style={s.toolbar}>
        <div style={s.searchBar}>
          <SearchIcon size={22} color="var(--color-text-muted)" />
          <input type="text" placeholder="Search guides..." className="input-enterprise" style={s.searchInput} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>
      <Guide isAdmin={false} query={searchQuery} />
    </div>
  );
}

const s = {
  wrapper: {},
  header: { marginBottom: 'var(--space-6)' },
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-1)', color: 'var(--color-text)', borderLeft: '4px solid var(--color-primary)', paddingLeft: 'var(--space-4)' },
  subtitle: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
  toolbar: { marginBottom: 'var(--space-6)' },
  searchBar: { display: 'flex', alignItems: 'center', gap: 'var(--space-3)', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-2) var(--space-4)', maxWidth: 360 },
  searchInput: { border: 'none', outline: 'none', flex: 1, padding: 'var(--space-2) 0' },
};
