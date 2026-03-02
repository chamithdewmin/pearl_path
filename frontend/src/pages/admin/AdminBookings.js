import React from 'react';
import { CheckIcon } from '../../components/Icons';

const MOCK = [
  { id: 'BK-1001', user: 'Kamal Perera', service: 'Pavana Hotel', date: '2026-03-10', status: 'Pending' },
  { id: 'BK-1002', user: 'Nimal Silva', service: 'Yala Safari', date: '2026-03-12', status: 'Confirmed' },
];

export default function AdminBookings() {
  return (
    <div>
      <h1 style={s.title}>Bookings</h1>
      <div className="card-enterprise" style={s.tableWrap}>
        <table style={s.table}>
          <thead><tr><th style={s.th}>ID</th><th style={s.th}>User</th><th style={s.th}>Service</th><th style={s.th}>Date</th><th style={s.th}>Status</th><th style={s.th}>Action</th></tr></thead>
          <tbody>
            {MOCK.map((b) => (
              <tr key={b.id} style={s.tr}>
                <td style={s.td}>{b.id}</td>
                <td style={s.td}>{b.user}</td>
                <td style={s.td}>{b.service}</td>
                <td style={s.td}>{b.date}</td>
                <td style={s.td}><span className={b.status === 'Confirmed' ? 'pill pill-success' : 'pill pill-warning'}>{b.status}</span></td>
                <td style={s.td}>{b.status === 'Pending' && <button type="button" className="btn-primary icon-text" style={s.approveBtn}><CheckIcon size={16} color="#fff" /> Approve</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const s = { title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-6)' }, tableWrap: { overflow: 'auto' }, table: { width: '100%', borderCollapse: 'collapse' }, th: { textAlign: 'left', padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontWeight: 600 }, tr: { borderBottom: '1px solid var(--color-border)' }, td: { padding: 'var(--space-4)' }, approveBtn: { padding: 'var(--space-2) var(--space-3)' } };