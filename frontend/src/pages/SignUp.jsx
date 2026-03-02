import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TOURISM_USERS_API } from '../config/api';
import { ProfileIcon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', phone: '', address: '', country: 'Sri Lanka', role: 'TOURIST' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: form.email,
        password: form.password,
        name: form.fullName,
        phone: form.phone,
        address: form.address,
        country: form.country,
      };
      const res = await axios.post(`${TOURISM_USERS_API}/register`, payload);
      login(res.data);
      navigate('/account');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div style={s.wrapper}>
      <div className="card-enterprise" style={s.box}>
        <div style={s.header}>
          <ProfileIcon size={32} color="var(--color-primary)" />
          <h1 style={s.title}>Sign in or create an account</h1>
          <p style={s.subtitle}>Use your email or continue with Google, Facebook, or Apple.</p>
        </div>

        <form onSubmit={handleSubmit} style={s.form}>
          <input
            className="input-enterprise"
            style={s.input}
            placeholder="Full name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />
          <input
            className="input-enterprise"
            style={s.input}
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="input-enterprise"
            style={s.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" className="btn-primary" style={s.btn}>
            Continue with email
          </button>
        </form>

        <div style={s.dividerRow}>
          <span style={s.dividerLine} />
          <span style={s.dividerText}>or use one of these options</span>
          <span style={s.dividerLine} />
        </div>

        <div style={s.socialRow}>
          <button
            type="button"
            style={{ ...s.socialBtn, backgroundColor: '#fff', color: '#000', borderColor: '#ddd' }}
            onClick={() => alert('Google sign-in will be added here.')}
          >
            Continue with Google
          </button>
          <button
            type="button"
            style={{ ...s.socialBtn, backgroundColor: '#1877f2', color: '#fff', borderColor: '#1877f2' }}
            onClick={() => alert('Facebook sign-in will be added here.')}
          >
            Continue with Facebook
          </button>
          <button
            type="button"
            style={{ ...s.socialBtn, backgroundColor: '#000', color: '#fff', borderColor: '#000' }}
            onClick={() => alert('Apple sign-in will be added here.')}
          >
            Continue with Apple
          </button>
        </div>

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
  dividerRow: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'var(--color-border)' },
  dividerText: { whiteSpace: 'nowrap' },
  socialRow: { display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' },
  socialBtn: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid transparent', fontSize: 14, fontWeight: 500, cursor: 'pointer' },
  footer: { textAlign: 'center', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' },
  link: { color: 'var(--color-primary)', fontWeight: 600 },
};
