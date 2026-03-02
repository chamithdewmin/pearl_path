import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Booking from '../../components/Booking';
import { TOURISM_BOOKINGS_API, REVIEWS_API, getAuthHeaders } from '../../config/api';
import { useAuth } from '../../context/AuthContext';

export default function AccountBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewTarget, setReviewTarget] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(TOURISM_BOOKINGS_API, {
          headers: getAuthHeaders(),
        });
        if (!cancelled) {
          setBookings(res.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load bookings', err);
          setBookings([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpenReview = (booking) => {
    setReviewTarget(booking);
    setRating(5);
    setComment('');
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewTarget || !user) return;

    const targetIds = {};
    if (reviewTarget.hotel?._id) targetIds.hotel = reviewTarget.hotel._id;
    else if (reviewTarget.vehicle?._id) targetIds.vehicle = reviewTarget.vehicle._id;
    else if (reviewTarget.guide?._id) targetIds.guide = reviewTarget.guide._id;

    try {
      setSubmittingReview(true);
      await axios.post(
        REVIEWS_API,
        {
          tourist: user._id,
          rating: Number(rating),
          comment: comment || undefined,
          ...targetIds,
        },
        { headers: getAuthHeaders() },
      );
      alert('Thank you for your review.');
      setReviewTarget(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Could not submit review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div style={s.wrapper}>
      <div style={s.header}>
        <h1 style={s.title}>My bookings</h1>
        <p style={s.subtitle}>View and manage your hotel, vehicle and guide bookings.</p>
      </div>
      <Booking bookings={bookings} loading={loading} enableReview onReview={handleOpenReview} />
      {reviewTarget && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2 style={{ marginBottom: 4 }}>Review your stay / trip</h2>
            <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--color-text-muted)' }}>
              Share your experience to help other travellers.
            </p>
            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ fontSize: 13, marginBottom: 4 }}>Rating</div>
                <select
                  className="input-enterprise"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 13, marginBottom: 4 }}>Comment (optional)</div>
                <textarea
                  className="input-enterprise"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you liked and what could be improved."
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setReviewTarget(null)}
                  disabled={submittingReview}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submittingReview}>
                  {submittingReview ? 'Submitting...' : 'Submit review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  wrapper: {},
  header: { marginBottom: 'var(--space-6)' },
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-1)', color: 'var(--color-text)', borderLeft: '4px solid var(--color-primary)', paddingLeft: 'var(--space-4)' },
  subtitle: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
};

const modalStyles = {
  overlay: {
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
    maxWidth: 480,
    background: '#fff',
    borderRadius: 12,
    padding: 'var(--space-6)',
    boxShadow: '0 20px 40px rgba(0,0,0,.25)',
  },
};
