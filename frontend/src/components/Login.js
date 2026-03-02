import React, { useState } from 'react';
import axios from 'axios';
import { TOURISM_USERS_API } from '../config/api';
import { HotelIcon, ProfileIcon } from './Icons';

const Login = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    country: '',
    role: 'TOURIST',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const DEMO_USERS = {
      'admin@gmail.com': { fullName: 'Administrator', role: 'ADMIN', username: 'admin', phone: '' },
      'tourist@gmail.com': { fullName: 'Demo Tourist', role: 'TOURIST', username: 'tourist', phone: '+94 77 123 4567' },
    };
    const email = formData.email.trim().toLowerCase();
    const demo = DEMO_USERS[email];
    if (!isRegistering && demo && formData.password === '12345678') {
      onLoginSuccess({ ...demo, email, address: '', country: 'Sri Lanka' });
      return;
    }

    try {
      if (isRegistering) {
        await axios.post(`${TOURISM_USERS_API}/register`, formData);
        alert('Registration successful. You can sign in now.');
        setIsRegistering(false);
      } else {
        const res = await axios.post(`${TOURISM_USERS_API}/login`, {
          email: formData.email.trim(),
          password: formData.password,
        });
        onLoginSuccess(res.data);
      }
    } catch (err) {
      const msg =
        err.response?.status === 401
          ? 'Wrong email or password.'
          : err.code === 'ERR_NETWORK' || !err.response
            ? 'Cannot reach server. Is the backend running on http://localhost:8081?'
            : 'Something went wrong. Check your credentials.';
      alert(msg);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div className="login-grid" style={styles.grid}>
        <div style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.heroIcon}>
              <HotelIcon size={48} color="var(--color-primary)" />
            </div>
            <h1 style={styles.heroTitle}>Southern Tourism</h1>
            <p style={styles.heroSubtitle}>
              Book stays, transport and local guides across the Southern Province. One account, one dashboard.
            </p>
            <ul style={styles.heroList}>
              <li style={styles.heroListItem}>Hotels & villas</li>
              <li style={styles.heroListItem}>Vehicles & safari jeeps</li>
              <li style={styles.heroListItem}>Expert local guides</li>
            </ul>
          </div>
        </div>

        <div style={styles.formSection}>
          <div className="card-enterprise" style={styles.authBox}>
            <div style={styles.formHeader}>
              <ProfileIcon size={32} color="var(--color-primary)" />
              <h2 style={styles.formTitle}>{isRegistering ? 'Create account' : 'Sign in'}</h2>
              <p style={styles.formSubtitle}>Southern Tourism System</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              {isRegistering && (
                <>
                  <input
                    className="input-enterprise"
                    style={styles.input}
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                  <input
                    className="input-enterprise"
                    style={styles.input}
                    placeholder="Phone (+94...)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <input
                    className="input-enterprise"
                    style={styles.input}
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                  <input
                    className="input-enterprise"
                    style={styles.input}
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                  />
                </>
              )}

              <input
                className="input-enterprise"
                style={styles.input}
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                className="input-enterprise"
                style={styles.input}
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              <button type="submit" className="btn-primary" style={styles.submitBtn}>
                {isRegistering ? 'Create account' : 'Sign in'}
              </button>
            </form>

            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              style={styles.toggleText}
            >
              {isRegistering ? 'Already have an account? Sign in' : 'New here? Create an account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: { minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)', maxWidth: 960, width: '100%', alignItems: 'center' },
  hero: { padding: 'var(--space-8)' },
  heroContent: {},
  heroIcon: { width: 72, height: 72, borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-6)' },
  heroTitle: { fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-text)', marginBottom: 'var(--space-3)' },
  heroSubtitle: { fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-6)' },
  heroList: { listStyle: 'none', padding: 0, margin: 0 },
  heroListItem: { fontSize: 'var(--text-sm)', color: 'var(--color-text)', padding: 'var(--space-2) 0', paddingLeft: 'var(--space-5)', position: 'relative', listStyle: 'none' },
  formSection: { display: 'flex', justifyContent: 'center' },
  authBox: { width: '100%', maxWidth: 420, padding: 'var(--space-8)' },
  formHeader: { textAlign: 'center', marginBottom: 'var(--space-6)' },
  formTitle: { fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-1)' },
  formSubtitle: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
  form: { display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' },
  input: { marginBottom: 0 },
  submitBtn: { width: '100%', padding: 'var(--space-4)', marginTop: 'var(--space-2)' },
  toggleText: { display: 'block', width: '100%', marginTop: 'var(--space-4)', padding: 0, background: 'none', border: 'none', fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 500, cursor: 'pointer', textAlign: 'center' },
};

export default Login;
