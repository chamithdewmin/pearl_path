import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EditIcon, DeleteIcon, AddIcon } from '../../components/Icons';
import { API_ROOT, getAuthHeaders } from '../../config/api';

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const emptyForm = { type: 'car', model: '', district: 'Galle', pricePerDay: '', seats: '' };
  const [form, setForm] = useState(emptyForm);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_ROOT}/vehicles`, { headers: getAuthHeaders() });
      setVehicles(res.data || []);
    } catch (err) {
      console.error('Failed to load vehicles', err);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleEdit = (vehicle) => {
    setEditing(vehicle._id);
    setForm({
      type: vehicle.type || 'car',
      model: vehicle.model || '',
      district: vehicle.district || 'Galle',
      pricePerDay: vehicle.pricePerDay ?? '',
      seats: vehicle.seats ?? '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this vehicle?')) return;
    try {
      await axios.delete(`${API_ROOT}/vehicles/${id}`, { headers: getAuthHeaders() });
      setVehicles((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete vehicle');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      type: form.type,
      model: form.model,
      district: form.district,
      pricePerDay: Number(form.pricePerDay) || 0,
      seats: Number(form.seats) || undefined,
    };
    try {
      if (editing) {
        const res = await axios.put(`${API_ROOT}/vehicles/${editing}`, payload, { headers: getAuthHeaders() });
        setVehicles((prev) => prev.map((v) => (v._id === editing ? res.data : v)));
      } else {
        const res = await axios.post(`${API_ROOT}/vehicles`, payload, { headers: getAuthHeaders() });
        setVehicles((prev) => [res.data, ...prev]);
      }
      setForm(emptyForm);
      setEditing(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save vehicle');
    }
  };

  return (
    <div>
      <h1 style={s.title}>Vehicles</h1>

      <div className="card-enterprise" style={s.formCard}>
        <form onSubmit={handleSubmit} style={s.formRow}>
          <div style={s.formField}>
            <label style={s.label}>Type</label>
            <select
              className="input-enterprise"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="bike">Bike</option>
            </select>
          </div>
          <div style={s.formField}>
            <label style={s.label}>Model</label>
            <input
              className="input-enterprise"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
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
            <label style={s.label}>Price / day (LKR)</label>
            <input
              type="number"
              className="input-enterprise"
              value={form.pricePerDay}
              onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
            />
          </div>
          <div style={s.formField}>
            <label style={s.label}>Seats</label>
            <input
              type="number"
              className="input-enterprise"
              value={form.seats}
              onChange={(e) => setForm({ ...form, seats: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary icon-text" style={s.saveBtn}>
            <AddIcon size={18} color="#fff" />
            {editing ? 'Update vehicle' : 'Add vehicle'}
          </button>
        </form>
      </div>

      <div className="card-enterprise" style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Type</th>
              <th style={s.th}>Model</th>
              <th style={s.th}>District</th>
              <th style={s.th}>Price / day</th>
              <th style={s.th}>Seats</th>
              <th style={s.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={s.td}>Loading vehicles...</td></tr>
            ) : vehicles.length === 0 ? (
              <tr><td colSpan={6} style={s.td}>No vehicles yet.</td></tr>
            ) : (
              vehicles.map((v) => (
                <tr key={v._id} style={s.tr}>
                  <td style={s.td}>{v.type}</td>
                  <td style={s.td}>{v.model}</td>
                  <td style={s.td}>{v.district}</td>
                  <td style={s.td}>{v.pricePerDay?.toLocaleString?.('en-LK') || v.pricePerDay}</td>
                  <td style={s.td}>{v.seats}</td>
                  <td style={s.td}>
                    <button type="button" style={s.iconBtn} onClick={() => handleEdit(v)} aria-label="Edit vehicle">
                      <EditIcon size={18} />
                    </button>
                    <button
                      type="button"
                      style={s.iconBtn}
                      onClick={() => handleDelete(v._id)}
                      aria-label="Delete vehicle"
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
  formField: { flex: '1 1 160px' },
  label: { display: 'block', marginBottom: 4, fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 },
  saveBtn: { padding: 'var(--space-3) var(--space-5)' },
  tableWrap: { overflow: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontWeight: 600 },
  tr: { borderBottom: '1px solid var(--color-border)' },
  td: { padding: 'var(--space-4)' },
  iconBtn: { padding: 'var(--space-2)', background: 'none', border: 'none', cursor: 'pointer', marginRight: 'var(--space-2)' },
};