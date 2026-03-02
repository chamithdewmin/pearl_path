import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { WhatsAppIcon, EditIcon, DeleteIcon } from './Icons';
import { API_ROOT } from '../config/api';

const Guide = ({ isAdmin, query }) => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(`${API_ROOT}/guides`);
        if (!cancelled) setGuides(res.data || []);
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load guides for cards', err);
          setGuides([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleContact = (name) => {
    // Contact details are not stored yet; keep this as a future enhancement.
    alert(`Contact details for ${name} are not configured yet.`);
  };

  const filtered = useMemo(() => {
    if (!query?.trim()) return guides;
    const q = query.trim().toLowerCase();
    return (guides || []).filter((g) => {
      const name = (g.name || '').toLowerCase();
      const skills = (g.skills || []).join(', ').toLowerCase();
      const langs = (g.languages || []).join(', ').toLowerCase();
      return name.includes(q) || skills.includes(q) || langs.includes(q);
    });
  }, [query, guides]);

  return (
    <div style={styles.grid}>
      {loading ? (
        <div>Loading guides...</div>
      ) : filtered.length === 0 ? (
        <div>No guides found.</div>
      ) : (
        filtered.map((guide) => {
          const img =
            guide.imageUrl ||
            'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80';
          const status = guide.availabilityStatus === 'unavailable' ? 'On Tour' : 'Available';
          const skills =
            (guide.skills && guide.skills.join(', ')) ||
            (guide.languages && guide.languages.join(', ')) ||
            '';
          const experience =
            typeof guide.yearsExperience === 'number'
              ? `${guide.yearsExperience}+ Years`
              : '';

          return (
            <article key={guide._id} className="card-enterprise" style={styles.card}>
              <div style={styles.imgWrap}>
                <img src={img} alt={guide.name} style={styles.img} />
                <span
                  className={status === 'Available' ? 'pill pill-success' : 'pill pill-warning'}
                  style={styles.status}
                >
                  {status}
                </span>
              </div>
              <div style={styles.body}>
                <h3 style={styles.title}>{guide.name}</h3>
                <p style={styles.skills}>{skills}</p>
                {experience && <p style={styles.experience}>Experience: {experience}</p>}
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
                      onClick={() => handleContact(guide.name)}
                    >
                      <WhatsAppIcon size={18} color="#fff" />
                      Contact guide
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
