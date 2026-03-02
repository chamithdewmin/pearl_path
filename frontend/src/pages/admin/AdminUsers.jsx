import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DeleteIcon } from '../../components/Icons';
import { API_ROOT, getAuthHeaders } from '../../config/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(`${API_ROOT}/admin/users`, {
          headers: getAuthHeaders(),
        });
        if (!cancelled) {
          setUsers(res.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load users', err);
          setUsers([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(`${API_ROOT}/admin/users/${id}`, {
        headers: getAuthHeaders(),
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const visibleUsers = users.filter((u) => u.email !== 'admin@gmail.com');

  return (
    <div>
      <h1 style={s.title}>Users</h1>
      <p style={s.subtitle}>
        {loading ? 'Loading users...' : `Total registered: ${visibleUsers.length}`}
      </p>
      <div className="card-enterprise" style={s.tableWrap}>
        <table style={s.table}>
          <thead><tr><th style={s.th}>Name</th><th style={s.th}>Email</th><th style={s.th}>Role</th><th style={s.th}>Actions</th></tr></thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={s.td}>Loading users...</td>
              </tr>
            ) : visibleUsers.length === 0 ? (
              <tr>
                <td colSpan={4} style={s.td}>No users found.</td>
              </tr>
            ) : (
              visibleUsers.map((u) => (
                <tr key={u._id} style={s.tr}>
                  <td style={s.td}>{u.name || '—'}</td>
                  <td style={s.td}>{u.email}</td>
                  <td style={{ ...s.td, textTransform: 'capitalize', color: 'var(--color-text)' }}>
                    {u.role}
                  </td>
                  <td style={s.td}>
                    <button
                      type="button"
                      style={s.iconBtn}
                      onClick={() => handleDelete(u._id)}
                      title="Delete"
                    >
                      <DeleteIcon size={18} color="var(--color-error)" />
                    </button>
                  </td>
                </tr>
              ))
            )}
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
