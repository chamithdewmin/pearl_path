import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { LocationIcon, EditIcon, DeleteIcon, ChevronRightIcon } from './Icons';
import { API_ROOT } from '../config/api';

const Vehicle = ({ isAdmin, query }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(`${API_ROOT}/vehicles`);
        if (!cancelled) setVehicles(res.data || []);
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load vehicles for cards', err);
          setVehicles([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query?.trim()) return vehicles;
    const q = query.trim().toLowerCase();
    return (vehicles || []).filter((v) => {
      const name = `${v.type || ''} ${v.model || ''}`.toLowerCase();
      const dist = (v.district || '').toLowerCase();
      return name.includes(q) || dist.includes(q);
    });
  }, [query, vehicles]);

  return (
    <div style={styles.grid}>
      {loading ? (
        <div>Loading vehicles...</div>
      ) : filtered.length === 0 ? (
        <div>No vehicles found.</div>
      ) : (
        filtered.map((vehicle) => {
          const title = `${vehicle.type || ''} ${vehicle.model || ''}`.trim() || 'Vehicle';
          const img =
            vehicle.imageUrl ||
            'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80';
          const district = vehicle.district || 'Southern Province';
          const priceLabel =
            typeof vehicle.pricePerDay === 'number'
              ? `LKR ${vehicle.pricePerDay.toLocaleString('en-LK')} / day`
              : vehicle.pricePerDay || 'Contact for price';
          const descParts = [];
          if (vehicle.seats) descParts.push(`${vehicle.seats} seats`);
          if (vehicle.availabilityStatus) descParts.push(vehicle.availabilityStatus);
          const description = descParts.join(' • ') || 'Comfortable transport option.';

          return (
            <article key={vehicle._id} className="card-enterprise" style={styles.card}>
              <div style={styles.imgWrap}>
                <img src={img} alt={title} style={styles.img} />
                <span style={styles.priceBadge}>{priceLabel}</span>
              </div>
              <div style={styles.body}>
                <h3 style={styles.title}>{title}</h3>
                <p style={styles.client} className="icon-text">
                  <LocationIcon size={16} color="var(--color-primary)" />
                  {district}
                </p>
                <p style={styles.desc}>{description}</p>
                <div style={styles.footer}>
                  {isAdmin ? (
                    <div style={styles.adminActions}>
                      <button type="button" style={styles.editBtn} className="icon-text">
                        <EditIcon size={16} color="currentColor" /> Edit
                      </button>
                      <button type="button" style={styles.deleteBtn} className="icon-text">
                        <DeleteIcon size={16} color="currentColor" /> Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn-primary icon-text"
                      style={styles.bookBtn}
                      onClick={() => alert(`Checking availability for ${title}...`)}
                    >
                      Rent now
                      <ChevronRightIcon size={18} color="#fff" />
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })
      )}
    </div>
  );
};

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' },
  card: { overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  imgWrap: { position: 'relative', height: 180, overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  priceBadge: { position: 'absolute', bottom: 'var(--space-3)', right: 'var(--space-3)', padding: 'var(--space-2) var(--space-3)', background: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 700 },
  body: { padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column' },
  title: { fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 var(--space-2)' },
  client: { fontSize: 'var(--text-sm)', color: 'var(--color-primary)', margin: '0 0 var(--space-2)' },
  desc: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: '0 0 var(--space-4)', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  footer: { marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' },
  bookBtn: { width: '100%', justifyContent: 'center' },
  adminActions: { display: 'flex', gap: 'var(--space-2)' },
  editBtn: { flex: 1, padding: 'var(--space-2) var(--space-3)', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' },
  deleteBtn: { flex: 1, padding: 'var(--space-2) var(--space-3)', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'var(--color-error-bg)', color: 'var(--color-error)', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' },
};

export default Vehicle;
