import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { WhatsAppIcon, EditIcon, DeleteIcon } from './Icons';
import { API_ROOT, getAuthHeaders } from '../config/api';
import { useAuth } from '../context/AuthContext';

const Guide = ({ isAdmin, query, limit }) => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingTarget, setBookingTarget] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

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
    alert(`Contact details for ${name} are not configured yet.`);
  };

  const handleOpenBooking = (guide) => {
    if (!user) {
      navigate('/signin', { replace: false });
      return;
    }
    setBookingTarget(guide);
    setStartDate('');
    setEndDate('');
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!bookingTarget || !startDate || !endDate) return;
    setSubmitting(true);
    try {
      await axios.post(
        `${API_ROOT}/bookings`,
        {
          tourist: user._id,
          guide: bookingTarget._id,
          startDate,
          endDate,
        },
        { headers: getAuthHeaders() },
      );
      alert('Guide booking created. You can see it under My bookings.');
      setBookingTarget(null);
      navigate('/account/bookings');
    } catch (err) {
      alert(err.response?.data?.message || 'Could not create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
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

  const displayList = limit != null ? filtered.slice(0, limit) : filtered;

  return (
    <>
      <div style={styles.grid}>
      {loading ? (
        <div>Loading guides...</div>
      ) : displayList.length === 0 ? (
        <div>No guides found.</div>
      ) : (
        displayList.map((guide) => {
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
      {bookingTarget && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={{ marginBottom: 8 }}>Book {bookingTarget.name}</h2>
            <p style={{ marginBottom: 16, fontSize: 14, color: 'var(--color-text-muted)' }}>
              Select the dates for your tour with this guide.
            </p>
            <form onSubmit={handleCreateBooking} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label style={styles.modalLabel}>
                Start date
                <input
                  type="date"
                  className="input-enterprise"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </label>
              <label style={styles.modalLabel}>
                End date
                <input
                  type="date"
                  className="input-enterprise"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </label>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setBookingTarget(null)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Booking...' : 'Confirm booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
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
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    width: '100%',
    maxWidth: 420,
    background: '#fff',
    borderRadius: 12,
    padding: 'var(--space-6)',
    boxShadow: '0 20px 40px rgba(0,0,0,.25)',
  },
  modalLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontSize: 13,
    color: 'var(--color-text-muted)',
  },
};

export default Guide;
