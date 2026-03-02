import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { LocationIcon, EditIcon, DeleteIcon, ChevronRightIcon, StarIcon } from './Icons';
import { API_ROOT } from '../config/api';

const Hotel = ({ isAdmin, query }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(`${API_ROOT}/hotels`);
        if (!cancelled) {
          setHotels(res.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load hotels for cards', err);
          setHotels([]);
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
    if (!query?.trim()) return hotels;
    const q = query.trim().toLowerCase();
    return (hotels || []).filter((h) => {
      const name = (h.name || '').toLowerCase();
      const loc = (h.location || h.district || '').toLowerCase();
      return name.includes(q) || loc.includes(q);
    });
  }, [query, hotels]);

  return (
    <div style={styles.grid}>
      {loading ? (
        <div>Loading hotels...</div>
      ) : filtered.length === 0 ? (
        <div>No hotels found.</div>
      ) : (
        filtered.map((hotel) => {
          const img =
            (hotel.images && hotel.images[0]) ||
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80';
          const districtLabel = hotel.district || 'Southern Province';
          const locationLabel = hotel.location || '';
          const priceLabel = typeof hotel.pricePerNight === 'number'
            ? `LKR ${hotel.pricePerNight.toLocaleString('en-LK')}`
            : hotel.pricePerNight || 'Contact for price';

          const descParts = [];
          if (hotel.address) descParts.push(hotel.address);
          if (hotel.facilities && hotel.facilities.length) {
            descParts.push(hotel.facilities.slice(0, 3).join(', '));
          }
          const description = descParts.join(' • ') || 'Comfortable stay in Southern Sri Lanka.';

          return (
            <article key={hotel._id} className="card-enterprise" style={styles.card}>
              <div style={styles.imgWrap}>
                <img src={img} alt={hotel.name} style={styles.img} />
            <span style={styles.locationBadge}>
              <LocationIcon size={14} color="currentColor" />
                {districtLabel}
            </span>
            <div style={styles.rating}>
              <StarIcon size={14} color="var(--color-warning)" />
              <span>4.8</span>
            </div>
              </div>
              <div style={styles.body}>
                <h3 style={styles.title}>{hotel.name}</h3>
                <p style={styles.desc}>{description}</p>
                <div style={styles.footer}>
                  <div style={styles.priceWrap}>
                    <span style={styles.price}>{priceLabel}</span>
                <span style={styles.unit}>/ night</span>
              </div>
              {isAdmin ? (
                <div style={styles.adminActions}>
                  <button type="button" style={styles.editBtn} className="icon-text" aria-label="Edit">
                    <EditIcon size={16} color="currentColor" /> Edit
                  </button>
                  <button type="button" style={styles.deleteBtn} className="icon-text" aria-label="Delete">
                    <DeleteIcon size={16} color="currentColor" /> Delete
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn-primary icon-text"
                  style={styles.bookBtn}
                  onClick={() => alert(`Booking request sent for ${hotel.name}`)}
                >
                  See availability
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
  imgWrap: { position: 'relative', height: 200, overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  locationBadge: { position: 'absolute', top: 'var(--space-3)', left: 'var(--space-3)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', padding: 'var(--space-1) var(--space-3)', background: 'rgba(0,0,0,0.6)', color: '#fff', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 600 },
  rating: { position: 'absolute', bottom: 'var(--space-3)', right: 'var(--space-3)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', padding: 'var(--space-1) var(--space-2)', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text)' },
  body: { padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column' },
  title: { fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 var(--space-2)' },
  desc: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: '0 0 var(--space-4)', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  footer: { marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' },
  priceWrap: { marginBottom: 'var(--space-3)' },
  price: { fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-primary)' },
  unit: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginLeft: 'var(--space-1)' },
  bookBtn: { width: '100%', justifyContent: 'center' },
  adminActions: { display: 'flex', gap: 'var(--space-2)' },
  editBtn: { flex: 1, padding: 'var(--space-2) var(--space-3)', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' },
  deleteBtn: { flex: 1, padding: 'var(--space-2) var(--space-3)', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'var(--color-error-bg)', color: 'var(--color-error)', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' },
};

export default Hotel;
