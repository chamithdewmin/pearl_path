import React, { useMemo } from 'react';
import { WhatsAppIcon, EditIcon, DeleteIcon } from './Icons';

const guideData = [
  { id: 1, name: 'M M Dias Kumarasiri', skills: 'Historical Sites, Cultural Expert', experience: '10+ Years', phone: '+94771112223', img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400', status: 'Available' },
  { id: 2, name: 'G L Prasad Indika', skills: 'Wildlife Safari, Yala Specialist', experience: '8 Years', phone: '+94713334445', img: 'https://images.unsplash.com/photo-1540560953457-3f94e2e1329a?q=80&w=400', status: 'On Tour' },
  { id: 3, name: 'V Chandana Hewa', skills: 'Surfing, Coastal Navigation', experience: '5 Years', phone: '+94705556667', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400', status: 'Available' },
  { id: 4, name: 'Sampath Liyanage', skills: 'Bird Watching, Sinharaja Expert', experience: '12 Years', phone: '+94767778889', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400', status: 'Available' },
  { id: 5, name: 'Ruwan Wickramasinghe', skills: 'Diving, Marine Life Expert', experience: '6 Years', phone: '+94721119990', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400', status: 'On Tour' },
  { id: 6, name: 'Indika Rathnayake', skills: 'Adventure Hiking, Ella Specialist', experience: '7 Years', phone: '+94752223334', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400', status: 'Available' },
];

const Guide = ({ isAdmin, query }) => {
  const handleContact = (phone, name) => {
    const message = `Hello ${name}, I saw your profile on Southern Tourism and would like to book a tour.`;
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filtered = useMemo(() => {
    if (!query?.trim()) return guideData;
    const q = query.trim().toLowerCase();
    return guideData.filter((g) => g.name.toLowerCase().includes(q) || g.skills.toLowerCase().includes(q));
  }, [query]);

  return (
    <div style={styles.grid}>
      {filtered.map((guide) => (
        <article key={guide.id} className="card-enterprise" style={styles.card}>
          <div style={styles.imgWrap}>
            <img src={guide.img} alt={guide.name} style={styles.img} />
            <span className={guide.status === 'Available' ? 'pill pill-success' : 'pill pill-warning'} style={styles.status}>
              {guide.status}
            </span>
          </div>
          <div style={styles.body}>
            <h3 style={styles.title}>{guide.name}</h3>
            <p style={styles.skills}>{guide.skills}</p>
            <p style={styles.experience}>Experience: {guide.experience}</p>
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
                  style={styles.contactBtn}
                  disabled={guide.status !== 'Available'}
                  onClick={() => handleContact(guide.phone, guide.name)}
                >
                  <WhatsAppIcon size={18} color="#fff" />
                  Contact on WhatsApp
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
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-6)' },
  card: { overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  imgWrap: { position: 'relative', height: 180, overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  status: { position: 'absolute', top: 'var(--space-3)', right: 'var(--space-3)' },
  body: { padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column' },
  title: { fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 var(--space-1)' },
  skills: { fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 500, margin: '0 0 var(--space-1)' },
  experience: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', margin: '0 0 var(--space-4)' },
  footer: { marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' },
  contactBtn: { width: '100%', justifyContent: 'center' },
  adminActions: { display: 'flex', gap: 'var(--space-2)' },
  editBtn: { flex: 1, padding: 'var(--space-2) var(--space-3)', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' },
  deleteBtn: { flex: 1, padding: 'var(--space-2) var(--space-3)', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'var(--color-error-bg)', color: 'var(--color-error)', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' },
};

export default Guide;
