import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EditIcon, DeleteIcon, AddIcon } from '../../components/Icons';
import { API_ROOT, getAuthHeaders } from '../../config/api';

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const emptyForm = { name: '', district: 'Galle', location: '', pricePerNight: '' };
  const [form, setForm] = useState(emptyForm);

  const loadHotels = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_ROOT}/hotels`, { headers: getAuthHeaders() });
      setHotels(res.data || []);
    } catch (err) {
      console.error('Failed to load hotels', err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotels();
  }, []);

  const handleEdit = (hotel) => {
    setEditing(hotel._id);
    setForm({
      name: hotel.name || '',
      district: hotel.district || 'Galle',
      location: hotel.location || '',
      pricePerNight: hotel.pricePerNight ?? '',
    });
  };

  const handleDelete = async (hotelId) => {
    if (!window.confirm('Delete this hotel?')) return;
    try {
      await axios.delete(`${API_ROOT}/hotels/${hotelId}`, { headers: getAuthHeaders() });
      setHotels((prev) => prev.filter((h) => h._id !== hotelId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete hotel');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      district: form.district,
      location: form.location,
      pricePerNight: Number(form.pricePerNight) || 0,
    };
    try {
      if (editing) {
        const res = await axios.put(`${API_ROOT}/hotels/${editing}`, payload, { headers: getAuthHeaders() });
        setHotels((prev) => prev.map((h) => (h._id === editing ? res.data : h)));
      } else {
        const res = await axios.post(`${API_ROOT}/hotels`, payload, { headers: getAuthHeaders() });
        setHotels((prev) => [res.data, ...prev]);
      }
      setForm(emptyForm);
      setEditing(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save hotel');
    }
  };

  return (
    <div>
      <h1 style={s.title}>Hotels</h1>

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
            <label style={s.label}>Location</label>
            <input
              className="input-enterprise"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <div style={s.formField}>
            <label style={s.label}>Price / night (LKR)</label>
            <input
              type="number"
              className="input-enterprise"
              value={form.pricePerNight}
              onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary icon-text" style={s.saveBtn}>
            <AddIcon size={18} color="#fff" />
            {editing ? 'Update hotel' : 'Add hotel'}
          </button>
        </form>
      </div>

      <div className="card-enterprise" style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Name</th>
              <th style={s.th}>District</th>
              <th style={s.th}>Location</th>
              <th style={s.th}>Price / night</th>
              <th style={s.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={s.td}>Loading hotels...</td></tr>
            ) : hotels.length === 0 ? (
              <tr><td colSpan={5} style={s.td}>No hotels yet.</td></tr>
            ) : (
              hotels.map((h) => (
                <tr key={h._id} style={s.tr}>
                  <td style={s.td}>{h.name}</td>
                  <td style={s.td}>{h.district}</td>
                  <td style={s.td}>{h.location}</td>
                  <td style={s.td}>{h.pricePerNight?.toLocaleString?.('en-LK') || h.pricePerNight}</td>
                  <td style={s.td}>
                    <button type="button" style={s.iconBtn} onClick={() => handleEdit(h)} aria-label="Edit hotel">
                      <EditIcon size={18} />
                    </button>
                    <button
                      type="button"
                      style={s.iconBtn}
                      onClick={() => handleDelete(h._id)}
                      aria-label="Delete hotel"
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