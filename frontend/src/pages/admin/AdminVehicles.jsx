import React from 'react';
import { EditIcon, DeleteIcon } from '../../components/Icons';

const MOCK = [
  { id: 1, name: 'Luxury Toyota Premio', client: 'Speed Cabs', price: 'LKR 85/km' },
  { id: 2, name: 'Off-Road Safari Jeep', client: 'Vihan Poojan', price: 'LKR 15,000/Tour' },
];

export default function AdminVehicles() {
  return (
    <div>
      <h1 style={s.title}>Vehicles</h1>
      <div className="card-enterprise" style={s.tableWrap}>
        <table style={s.table}>
          <thead><tr><th style={s.th}>Name</th><th style={s.th}>Client</th><th style={s.th}>Price</th><th style={s.th}>Actions</th></tr></thead>
          <tbody>
            {MOCK.map((v) => (
              <tr key={v.id} style={s.tr}>
                <td style={s.td}>{v.name}</td>
                <td style={s.td}>{v.client}</td>
                <td style={s.td}>{v.price}</td>
                <td style={s.td}><button type="button" style={s.iconBtn}><EditIcon size={18} /></button><button type="button" style={s.iconBtn}><DeleteIcon size={18} color="var(--color-error)" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const s = { title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-6)' }, tableWrap: { overflow: 'auto' }, table: { width: '100%', borderCollapse: 'collapse' }, th: { textAlign: 'left', padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontWeight: 600 }, tr: { borderBottom: '1px solid var(--color-border)' }, td: { padding: 'var(--space-4)' }, iconBtn: { padding: 'var(--space-2)', background: 'none', border: 'none', cursor: 'pointer', marginRight: 'var(--space-2)' } };