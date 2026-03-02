import React, { useMemo } from 'react';
import { LocationIcon, EditIcon, DeleteIcon, ChevronRightIcon, StarIcon } from './Icons';

const hotelData = [
  { id: 1, name: 'Pavana Hotel - Galle', location: 'Galle', price: 'LKR 12,000', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600', description: 'Luxury stay near Galle Fort with ocean views and premium service.' },
  { id: 2, name: 'Heaven Grade - Matara', location: 'Matara', price: 'LKR 8,500', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600', description: 'Budget friendly comfort in the heart of Matara city center.' },
  { id: 3, name: 'Sunset Villa - Hambantota', location: 'Hambantota', price: 'LKR 15,000', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600', description: 'Perfect sunset views and easy access to Yala safari tours.' },
  { id: 4, name: 'Almayans Bungalow - Galle', location: 'Galle', price: 'LKR 10,000', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600', description: 'A peaceful retreat away from the city hustle.' },
  { id: 5, name: 'The Blue Water Hotel', location: 'Waduwa / Southern Coast', price: 'LKR 45,000', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600', description: 'Luxury 5-star experience with ocean views and infinity pool.' },
  { id: 6, name: 'Jetwing Lighthouse', location: 'Galle Fort Area', price: 'LKR 55,000', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600', description: 'Iconic Bawa design overlooking the Indian Ocean.' },
  { id: 7, name: 'Mirissa Beach Villa', location: 'Mirissa / Weligama', price: 'LKR 12,000', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600', description: 'Budget-friendly stay just steps away from the surfing beach.' },
  { id: 8, name: 'Cinnamon Wild Yala', location: 'Tissamaharama / Yala', price: 'LKR 38,000', img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=600', description: 'A rustic wild experience near the Yala National Park entrance.' },
  { id: 9, name: 'Amanwella Resort', location: 'Tangalle / Southern Coast', price: 'LKR 85,000', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600', description: 'Ultra-luxury suites with private pools and secluded beach access.' },
  { id: 10, name: 'Unawatuna Surf Lodge', location: 'Unawatuna Beach', price: 'LKR 8,500', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600', description: 'Perfect spot for backpackers and surf enthusiasts.' },
];

const Hotel = ({ isAdmin, query }) => {
  const filtered = useMemo(() => {
    if (!query?.trim()) return hotelData;
    const q = query.trim().toLowerCase();
    return hotelData.filter((h) => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q));
  }, [query]);

  return (
    <div style={styles.grid}>
      {filtered.map((hotel) => (
        <article key={hotel.id} className="card-enterprise" style={styles.card}>
          <div style={styles.imgWrap}>
            <img src={hotel.img} alt={hotel.name} style={styles.img} />
            <span style={styles.locationBadge}>
              <LocationIcon size={14} color="currentColor" />
              {hotel.location}
            </span>
            <div style={styles.rating}>
              <StarIcon size={14} color="var(--color-warning)" />
              <span>4.8</span>
            </div>
          </div>
          <div style={styles.body}>
            <h3 style={styles.title}>{hotel.name}</h3>
            <p style={styles.desc}>{hotel.description}</p>
            <div style={styles.footer}>
              <div style={styles.priceWrap}>
                <span style={styles.price}>{hotel.price}</span>
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
      ))}
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
