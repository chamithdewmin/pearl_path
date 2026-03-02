import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { TOURISM_USERS_API } from '../config/api';
import { useAuth } from '../context/AuthContext';
import { ProfileIcon } from '../components/Icons';

export default function AdminSignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${TOURISM_USERS_API}/login`, {
        email: email.trim(),
        password,
      });

      const payload = res.data;
      const role = payload?.user?.role || payload?.role;

      if (role !== 'admin' && role !== 'ADMIN') {
        alert('This account is not an admin. Please use the normal sign-in page.');
        return;
      }

      login(payload);
      navigate(from, { replace: true });
    } catch (err) {
      alert(err.response?.status === 401 ? 'Wrong email or password.' : 'Admin login failed.');
    }
  };

  return (
    <div style={s.wrapper}>
      <div className="card-enterprise" style={s.box}>
        <div style={s.header}>
          <ProfileIcon size={32} color="var(--color-primary)" />
          <h1 style={s.title}>Admin sign in</h1>
          <p style={s.subtitle}>Southern Tourism – Admin panel</p>
        </div>
        <form onSubmit={handleSubmit} style={s.form}>
          <input
            className="input-enterprise"
            style={s.input}
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-enterprise"
            style={s.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" style={s.btn}>
            Sign in to admin
          </button>
        </form>
        <p style={s.footer}>
          For normal users, use the{' '}
          <Link to="/signin" style={s.link}>
            main sign-in page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

const s = {
  wrapper: {
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-8)',
  },
  box: { width: '100%', maxWidth: 400, padding: 'var(--space-8)' },
  header: { textAlign: 'center', marginBottom: 'var(--space-6)' },
  title: { fontSize: 'var(--text-xl)', fontWeight: 700, marginTop: 'var(--space-3)' },
  subtitle: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
  form: { display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' },
  input: { margin: 0 },
  btn: { width: '100%', marginTop: 'var(--space-2)' },
  footer: { textAlign: 'center', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' },
  link: { color: 'var(--color-primary)', fontWeight: 600 },
};

