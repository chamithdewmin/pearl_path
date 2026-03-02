import React, { useState } from 'react';
import { EditIcon, DeleteIcon } from '../../components/Icons';

const MOCK_USERS = [
  { id: 1, fullName: 'Administrator', email: 'admin@gmail.com', role: 'ADMIN' },
  { id: 2, fullName: 'Demo Tourist', email: 'tourist@gmail.com', role: 'TOURIST' },
  { id: 3, fullName: 'Demo Guide', email: 'guide@gmail.com', role: 'GUIDE' },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(MOCK_USERS);

  const handleDelete = (id) => { if (window.confirm('Delete user?')) setUsers((u) => u.filter((x) => x.id !== id)); };

  return (
    <div>
      <h1 style={s.title}>Users</h1>
      <p style={s.subtitle}>Total registered: {users.length}</p>
      <div className="card-enterprise" style={s.tableWrap}>
        <table style={s.table}>
          <thead><tr><th style={s.th}>Name</th><th style={s.th}>Email</th><th style={s.th}>Role</th><th style={s.th}>Actions</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={s.tr}>
                <td style={s.td}>{u.fullName}</td>
                <td style={s.td}>{u.email}</td>
                <td style={s.td}><span className="pill pill-muted">{u.role}</span></td>
                <td style={s.td}>
                  <button type="button" style={s.iconBtn} title="Edit"><EditIcon size={18} /></button>
                  <button type="button" style={s.iconBtn} onClick={() => handleDelete(u.id)} title="Delete"><DeleteIcon size={18} color="var(--color-error)" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const s = {
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' },
  subtitle: { color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' },
  tableWrap: { overflow: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontWeight: 600 },
  tr: { borderBottom: '1px solid var(--color-border)' },
  td: { padding: 'var(--space-4)' },
  iconBtn: { padding: 'var(--space-2)', background: 'none', border: 'none', cursor: 'pointer', marginRight: 'var(--space-2)' },
};
