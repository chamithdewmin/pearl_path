import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProfileIcon } from '../components/Icons';

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', phone: '', address: '', country: 'Sri Lanka', role: 'TOURIST' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/tourism/users/register', form);
      alert('Account created. Sign in now.');
      navigate('/signin');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div style={s.wrapper}>
      <div className="card-enterprise" style={s.box}>
        <div style={s.header}>
          <ProfileIcon size={32} color="var(--color-primary)" />
          <h1 style={s.title}>Sign up</h1>
          <p style={s.subtitle}>Create your Southern Tourism account to book and rent.</p>
        </div>
        <form onSubmit={handleSubmit} style={s.form}>
          <input className="input-enterprise" style={s.input} placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
          <input className="input-enterprise" style={s.input} type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input-enterprise" style={s.input} type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <input className="input-enterprise" style={s.input} placeholder="Phone (+94...)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="input-enterprise" style={s.input} placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <button type="submit" className="btn-primary" style={s.btn}>Create account</button>
        </form>
        <p style={s.footer}>
          Already have an account? <Link to="/signin" style={s.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const s = {
  wrapper: { minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' },
  box: { width: '100%', maxWidth: 420, padding: 'var(--space-8)' },
  header: { textAlign: 'center', marginBottom: 'var(--space-6)' },
  title: { fontSize: 'var(--text-xl)', fontWeight: 700, marginTop: 'var(--space-3)' },
  subtitle: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
  form: { display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' },
  input: { margin: 0 },
  btn: { width: '100%', marginTop: 'var(--space-2)' },
  footer: { textAlign: 'center', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' },
  link: { color: 'var(--color-primary)', fontWeight: 600 },
};
