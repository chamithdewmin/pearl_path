import React from 'react';

export default function AboutUs() {
  return (
    <div style={s.wrapper}>
      <div style={s.container}>
        <h1 style={s.title}>About Southern Tourism</h1>
        <p style={s.lead}>
          We are the leading booking platform for the Southern Province of Sri Lanka—Galle, Matara and Hambantota.
        </p>
        <div style={s.content}>
          <p>
            Southern Tourism brings together handpicked stays, trusted vehicle rentals and expert local guides in one place. 
            Whether you are planning a beach holiday in Galle, a safari in Yala, or a cultural tour in Matara, you can book 
            your entire trip step by step with our All-in-One package or choose individual services.
          </p>
          <p>
            Only registered users can make bookings, rent cars and chat with guides—so sign up once and manage everything from your account.
          </p>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrapper: { padding: 'var(--space-12) var(--space-8)' },
  container: { maxWidth: 720, margin: '0 auto' },
  title: { fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-text)', marginBottom: 'var(--space-4)' },
  lead: { fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' },
  content: { fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--color-text)' },
};
