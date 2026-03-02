import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ProfileIcon } from '../components/Icons';

const DEMO_USERS = {
  'admin@gmail.com': { fullName: 'Administrator', role: 'ADMIN', username: 'admin', phone: '' },
  'tourist@gmail.com': { fullName: 'Demo Tourist', role: 'TOURIST', username: 'tourist', phone: '+94 77 123 4567' },
  'guide@gmail.com': { fullName: 'Demo Guide', role: 'GUIDE', username: 'guide', phone: '+94 77 234 5678' },
  'hotel@gmail.com': { fullName: 'Demo Hotel Owner', role: 'HOTEL_OWNER', username: 'hotel', phone: '+94 77 345 6789' },
};

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/account';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const key = email.trim().toLowerCase();
    const demo = DEMO_USERS[key];
    if (demo && password === '12345678') {
      login({ ...demo, email: key, address: '', country: 'Sri Lanka' });
      navigate(from, { replace: true });
      return;
    }
    try {
      const res = await axios.post('http://localhost:8081/api/tourism/users/login', { email: email.trim(), password });
      login(res.data);
      navigate(from, { replace: true });
    } catch (err) {
      alert(err.response?.status === 401 ? 'Wrong email or password.' : 'Login failed.');
    }
  };

  return (
    <div style={s.wrapper}>
      <div className="card-enterprise" style={s.box}>
        <div style={s.header}>
          <ProfileIcon size={32} color="var(--color-primary)" />
          <h1 style={s.title}>Sign in</h1>
          <p style={s.subtitle}>Southern Tourism</p>
        </div>
        <form onSubmit={handleSubmit} style={s.form}>
          <input className="input-enterprise" style={s.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input-enterprise" style={s.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn-primary" style={s.btn}>Sign in</button>
        </form>
        <p style={s.footer}>
          New here? <Link to="/signup" style={s.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const s = {
  wrapper: { minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' },
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
