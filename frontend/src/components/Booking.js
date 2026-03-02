import React, { useState } from 'react';
import { CalendarIcon, CheckIcon } from './Icons';

const initialBookings = [
  { id: 'BK-1001', user: 'Kamal Perera', service: 'Pavana Hotel', date: '2026-03-10', status: 'Pending' },
  { id: 'BK-1002', user: 'Nimal Silva', service: 'Yala Safari Package', date: '2026-03-12', status: 'Confirmed' },
  { id: 'BK-1003', user: 'Sunil Shantha', service: 'Speed Cabs Luxury', date: '2026-03-15', status: 'Pending' },
];

const Booking = ({ isAdmin }) => {
  const [bookings, setBookings] = useState(initialBookings);

  const handleApprove = (id) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'Confirmed' } : b)));
    alert(`Booking ${id} has been approved.`);
  };

  return (
    <div className="card-enterprise" style={styles.wrapper}>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>{isAdmin ? 'Tourist' : 'Service'}</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              {isAdmin && <th style={styles.th}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} style={styles.row}>
                <td style={styles.td}>
                  <span style={styles.idBadge}>{b.id}</span>
                </td>
                <td style={styles.td}>{isAdmin ? b.user : b.service}</td>
                <td style={styles.td} className="icon-text">
                  <CalendarIcon size={16} color="var(--color-text-muted)" />
                  {b.date}
                </td>
                <td style={styles.td}>
                  <span className={b.status === 'Confirmed' ? 'pill pill-success' : 'pill pill-warning'} style={styles.pill}>
                    {b.status === 'Confirmed' && <CheckIcon size={12} color="currentColor" />}
                    {b.status}
                  </span>
                </td>
                {isAdmin && (
                  <td style={styles.td}>
                    {b.status === 'Pending' ? (
                      <button type="button" className="btn-primary icon-text" style={styles.approveBtn} onClick={() => handleApprove(b.id)}>
                        <CheckIcon size={16} color="#fff" />
                        Approve
                      </button>
                    ) : (
                      <span style={styles.finalized} className="icon-text">
                        <CheckIcon size={14} color="var(--color-success)" />
                        Finalized
                      </span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  wrapper: { padding: 'var(--space-6)', overflow: 'hidden' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' },
  headerRow: { borderBottom: '2px solid var(--color-border)' },
  th: { textAlign: 'left', padding: 'var(--space-4) var(--space-3)', color: 'var(--color-text-muted)', fontWeight: 600 },
  row: { borderBottom: '1px solid var(--color-border)' },
  td: { padding: 'var(--space-4) var(--space-3)', color: 'var(--color-text)' },
  idBadge: { fontFamily: 'ui-monospace, monospace', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary)' },
  pill: { display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)' },
  approveBtn: { padding: 'var(--space-2) var(--space-4)' },
  finalized: { color: 'var(--color-success)', fontSize: 'var(--text-sm)', fontWeight: 500 },
};

export default Booking;
