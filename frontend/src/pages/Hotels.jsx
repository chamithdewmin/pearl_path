import React, { useState } from 'react';
import Hotel from '../components/Hotel';
import { SearchIcon } from '../components/Icons';

export default function Hotels() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="main-booking" style={s.wrapper}>
      <section className="sec-booking">
        <h1 className="sec-t-booking">Hotels</h1>
        <p className="sec-sub-booking">
          Browse hotels from our database. Book a stay and manage your reservations in My account.
        </p>
        <div style={s.toolbar}>
          <div style={s.searchBar}>
            <SearchIcon size={22} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search hotels..."
              className="input-enterprise"
              style={s.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Hotel isAdmin={false} query={searchQuery} />
      </section>
    </div>
  );
}

const s = {
  wrapper: { padding: 'var(--space-8) var(--space-6)' },
  toolbar: { marginBottom: 'var(--space-6)' },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-2) var(--space-4)',
    maxWidth: 360,
  },
  searchInput: { border: 'none', outline: 'none', flex: 1, padding: 'var(--space-2) 0' },
};
