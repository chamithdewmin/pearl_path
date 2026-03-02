import React, { useMemo } from 'react';
import { LocationIcon, EditIcon, DeleteIcon, ChevronRightIcon } from './Icons';

const vehicleData = [
  { id: 1, name: 'Luxury Toyota Premio', client: 'Speed Cabs & Tours - Matara', price: 'LKR 85 / km', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600', description: 'Premium sedan for city tours and airport drops with A/C.' },
  { id: 2, name: 'Toyota KDH Super Long', client: 'Luvic Rent A Car - Galle', price: 'LKR 110 / km', img: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=600', description: 'Ideal for family groups (14 seater) with luxury seating.' },
  { id: 3, name: 'Off-Road Safari Jeep', client: 'Vihan Poojan Safari - Hambantota', price: 'LKR 15,000 / Tour', img: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=600', description: 'Modified 4x4 for Yala and Udawalawe wildlife safaris.' },
  { id: 4, name: 'Hybrid Honda Vezel', client: 'Southern Express - Galle', price: 'LKR 95 / km', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600', description: 'Eco-friendly SUV for comfortable coastal travel.' },
  { id: 5, name: 'Suzuki Alto (Budget)', client: 'Eco Rent - Matara', price: 'LKR 50 / km', img: 'https://images.unsplash.com/photo-1620050186938-48b48f5727d9?q=80&w=600', description: 'Economy choice for short distance city travel.' },
  { id: 6, name: 'Micro Luxury Bus', client: 'Southern Tours - Hambantota', price: 'LKR 25,000 / Day', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600', description: 'Executive 29-seater bus for corporate outings.' },
];

const Vehicle = ({ isAdmin, query }) => {
  const filtered = useMemo(() => {
    if (!query?.trim()) return vehicleData;
    const q = query.trim().toLowerCase();
    return vehicleData.filter((v) => v.name.toLowerCase().includes(q) || v.client.toLowerCase().includes(q));
  }, [query]);

  return (
    <div style={styles.grid}>
      {filtered.map((vehicle) => (
        <article key={vehicle.id} className="card-enterprise" style={styles.card}>
          <div style={styles.imgWrap}>
            <img src={vehicle.img} alt={vehicle.name} style={styles.img} />
            <span style={styles.priceBadge}>{vehicle.price}</span>
          </div>
          <div style={styles.body}>
            <h3 style={styles.title}>{vehicle.name}</h3>
            <p style={styles.client} className="icon-text">
              <LocationIcon size={16} color="var(--color-primary)" />
              {vehicle.client}
            </p>
            <p style={styles.desc}>{vehicle.description}</p>
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
                  onClick={() => alert(`Checking availability for ${vehicle.name}...`)}
                >
                  Rent now
                  <ChevronRightIcon size={18} color="#fff" />
                </button>
              )}
            </div>
          </div>
        </article>
      ))}
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
