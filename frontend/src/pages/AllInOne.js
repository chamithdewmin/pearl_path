import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HotelIcon, CarIcon, GuideIcon, ChevronRightIcon, CheckIcon } from '../components/Icons';

const STEPS = [
  { id: 'location', label: 'Location & dates', Icon: null },
  { id: 'hotel', label: 'Choose stay', Icon: HotelIcon },
  { id: 'vehicle', label: 'Rent vehicle', Icon: CarIcon },
  { id: 'guide', label: 'Select guide', Icon: GuideIcon },
  { id: 'review', label: 'Review & book', Icon: CheckIcon },
];

export default function AllInOne() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    hotelId: null,
    vehicleId: null,
    guideId: null,
  });

  const currentStepId = STEPS[step]?.id;

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else alert('Booking submitted! (Demo)');
  };

  const handleBookAction = () => {
    if (!user) {
      navigate('/signin', { state: { from: '/all-in-one' } });
      return;
    }
    handleNext();
  };

  return (
    <div style={s.wrapper}>
      <div style={s.container}>
        <h1 style={s.title}>All-in-One Package</h1>
        <p style={s.subtitle}>
          {user ? 'Complete your booking step by step.' : 'Sign in to book. You can select location, stay, vehicle and guide in one flow.'}
        </p>

        <div style={s.steps}>
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              style={stepStyle(i <= step, i === step)}
              onClick={() => user && setStep(i)}
            >
              {i < step ? <CheckIcon size={18} color="var(--color-success)" /> : s.Icon ? <s.Icon size={18} color="currentColor" /> : null}
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        <div className="card-enterprise" style={s.card}>
          {currentStepId === 'location' && (
            <div style={s.stepContent}>
              <h2 style={s.stepTitle}>Where and when?</h2>
              <input
                className="input-enterprise"
                style={s.input}
                placeholder="Location (e.g. Galle, Matara)"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <input type="date" className="input-enterprise" style={s.input} value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} />
              <input type="date" className="input-enterprise" style={s.input} value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} />
            </div>
          )}
          {currentStepId === 'hotel' && (
            <div style={s.stepContent}>
              <h2 style={s.stepTitle}>Choose your stay</h2>
              <p style={s.stepDesc}>Select a hotel (demo list). Only registered users can confirm.</p>
              {['Pavana Hotel - Galle', 'Jetwing Lighthouse', 'Mirissa Beach Villa'].map((name, i) => (
                <button key={name} type="button" style={s.optionBtn(form.hotelId === i)} onClick={() => setForm({ ...form, hotelId: i })}>
                  {name}
                </button>
              ))}
            </div>
          )}
          {currentStepId === 'vehicle' && (
            <div style={s.stepContent}>
              <h2 style={s.stepTitle}>Rent a vehicle</h2>
              <p style={s.stepDesc}>Select a car or jeep (demo).</p>
              {['Luxury Toyota Premio', 'Off-Road Safari Jeep', 'Micro Luxury Bus'].map((name, i) => (
                <button key={name} type="button" style={s.optionBtn(form.vehicleId === i)} onClick={() => setForm({ ...form, vehicleId: i })}>
                  {name}
                </button>
              ))}
            </div>
          )}
          {currentStepId === 'guide' && (
            <div style={s.stepContent}>
              <h2 style={s.stepTitle}>Select a guide</h2>
              <p style={s.stepDesc}>You can also chat with guides from your account.</p>
              {['M M Dias Kumarasiri', 'G L Prasad Indika', 'V Chandana Hewa'].map((name, i) => (
                <button key={name} type="button" style={s.optionBtn(form.guideId === i)} onClick={() => setForm({ ...form, guideId: i })}>
                  {name}
                </button>
              ))}
            </div>
          )}
          {currentStepId === 'review' && (
            <div style={s.stepContent}>
              <h2 style={s.stepTitle}>Review & book</h2>
              <p style={s.stepDesc}>Location: {form.location || '—'} · Check-in: {form.checkIn || '—'} · Check-out: {form.checkOut || '—'}</p>
              <p style={s.stepDesc}>Hotel, vehicle and guide selected. Click Book now to confirm (demo).</p>
            </div>
          )}

          <div style={s.actions}>
            {step > 0 && (
              <button type="button" style={s.backBtn} onClick={() => setStep((s) => s - 1)}>
                Back
              </button>
            )}
            {!user && step === 0 && (
              <Link to="/signup" className="btn-primary" style={s.nextBtn}>Sign up to continue</Link>
            )}
            {user && (
              <button type="button" className="btn-primary icon-text" style={s.nextBtn} onClick={step < STEPS.length - 1 ? () => setStep((s) => s + 1) : handleBookAction}>
                {step < STEPS.length - 1 ? 'Next' : 'Book now'}
                <ChevronRightIcon size={18} color="#fff" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function stepStyle(active, current) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: 'var(--space-2) var(--space-4)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    background: current ? 'var(--color-primary)' : active ? 'var(--color-primary-light)' : 'var(--color-bg)',
    color: current ? '#fff' : active ? 'var(--color-primary)' : 'var(--color-text-muted)',
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    cursor: 'pointer',
  };
}

const s = {
  wrapper: { padding: 'var(--space-10) var(--space-8)' },
  container: { maxWidth: 700, margin: '0 auto' },
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' },
  subtitle: { color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' },
  steps: { display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-8)' },
  card: { padding: 'var(--space-8)' },
  stepContent: {},
  stepTitle: { fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-4)' },
  stepDesc: { color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' },
  input: { marginBottom: 'var(--space-4)', maxWidth: 400 },
  optionBtn: (selected) => ({
    display: 'block',
    width: '100%',
    maxWidth: 400,
    padding: 'var(--space-4)',
    marginBottom: 'var(--space-2)',
    textAlign: 'left',
    borderRadius: 'var(--radius-md)',
    border: `2px solid ${selected ? 'var(--color-primary)' : 'var(--color-border)'}`,
    background: selected ? 'var(--color-primary-light)' : 'var(--color-bg-card)',
    cursor: 'pointer',
    fontWeight: 600,
  }),
  actions: { display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-8)' },
  backBtn: { padding: 'var(--space-3) var(--space-5)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer' },
  nextBtn: { marginLeft: 'auto', textDecoration: 'none', color: '#fff' },
};
