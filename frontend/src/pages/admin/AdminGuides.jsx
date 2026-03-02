import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EditIcon, DeleteIcon, AddIcon } from '../../components/Icons';
import { API_ROOT, getAuthHeaders } from '../../config/api';

export default function AdminGuides() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const emptyForm = { name: '', district: 'Galle', languages: '', pricePerDay: '' };
  const [form, setForm] = useState(emptyForm);

  const loadGuides = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_ROOT}/guides`, { headers: getAuthHeaders() });
      setGuides(res.data || []);
    } catch (err) {
      console.error('Failed to load guides', err);
      setGuides([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuides();
  }, []);

  const handleEdit = (g) => {
    setEditing(g._id);
    setForm({
      name: g.name || '',
      district: g.district || 'Galle',
      languages: (g.languages || []).join(', '),
      pricePerDay: g.pricePerDay ?? '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this guide?')) return;
    try {
      await axios.delete(`${API_ROOT}/guides/${id}`, { headers: getAuthHeaders() });
      setGuides((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete guide');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      district: form.district,
      languages: form.languages
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean),
      pricePerDay: Number(form.pricePerDay) || 0,
    };
    try {
      if (editing) {
        const res = await axios.put(`${API_ROOT}/guides/${editing}`, payload, { headers: getAuthHeaders() });
        setGuides((prev) => prev.map((g) => (g._id === editing ? res.data : g)));
      } else {
        const res = await axios.post(`${API_ROOT}/guides`, payload, { headers: getAuthHeaders() });
        setGuides((prev) => [res.data, ...prev]);
      }
      setForm(emptyForm);
      setEditing(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save guide');
    }
  };

  return (
    <div>
      <h1 style={s.title}>Guides</h1>

      <div className="card-enterprise" style={s.formCard}>
        <form onSubmit={handleSubmit} style={s.formRow}>
          <div style={s.formField}>
            <label style={s.label}>Name</label>
            <input
              className="input-enterprise"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div style={s.formField}>
            <label style={s.label}>District</label>
            <select
              className="input-enterprise"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
            >
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Hambantota">Hambantota</option>
            </select>
          </div>
          <div style={s.formField}>
            <label style={s.label}>Languages</label>
            <input
              className="input-enterprise"
              placeholder="English, Sinhala, Tamil"
              value={form.languages}
              onChange={(e) => setForm({ ...form, languages: e.target.value })}
            />
          </div>
          <div style={s.formField}>
            <label style={s.label}>Price / day (LKR)</label>
            <input
              type="number"
              className="input-enterprise"
              value={form.pricePerDay}
              onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary icon-text" style={s.saveBtn}>
            <AddIcon size={18} color="#fff" />
            {editing ? 'Update guide' : 'Add guide'}
          </button>
        </form>
      </div>

      <div className="card-enterprise" style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Name</th>
              <th style={s.th}>District</th>
              <th style={s.th}>Languages</th>
              <th style={s.th}>Price / day</th>
              <th style={s.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={s.td}>Loading guides...</td></tr>
            ) : guides.length === 0 ? (
              <tr><td colSpan={5} style={s.td}>No guides yet.</td></tr>
            ) : (
              guides.map((g) => (
                <tr key={g._id} style={s.tr}>
                  <td style={s.td}>{g.name}</td>
                  <td style={s.td}>{g.district}</td>
                  <td style={s.td}>{(g.languages || []).join(', ')}</td>
                  <td style={s.td}>{g.pricePerDay?.toLocaleString?.('en-LK') || g.pricePerDay}</td>
                  <td style={s.td}>
                    <button type="button" style={s.iconBtn} onClick={() => handleEdit(g)} aria-label="Edit guide">
                      <EditIcon size={18} />
                    </button>
                    <button
                      type="button"
                      style={s.iconBtn}
                      onClick={() => handleDelete(g._id)}
                      aria-label="Delete guide"
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
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-6)' },
  formCard: { marginBottom: 'var(--space-6)', padding: 'var(--space-6)' },
  formRow: { display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'flex-end' },
  formField: { flex: '1 1 180px' },
  label: { display: 'block', marginBottom: 4, fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 },
  saveBtn: { padding: 'var(--space-3) var(--space-5)' },
  tableWrap: { overflow: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontWeight: 600 },
  tr: { borderBottom: '1px solid var(--color-border)' },
  td: { padding: 'var(--space-4)' },
  iconBtn: { padding: 'var(--space-2)', background: 'none', border: 'none', cursor: 'pointer', marginRight: 'var(--space-2)' },
};