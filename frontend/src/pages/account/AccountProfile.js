import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ProfileIcon } from '../../components/Icons';

export default function AccountProfile() {
  const { user, setUser } = useOutletContext();
  const [profileData, setProfileData] = useState({
    ...user,
    password: '',
    phone: user?.phone || '+94 ',
    address: user?.address || '',
    country: user?.country || 'Sri Lanka',
    profilePic: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ fullName: profileData.fullName, phone: profileData.phone, address: profileData.address, country: profileData.country });
    alert('Profile updated.');
  };

  return (
    <div style={s.wrapper}>
      <div style={s.header}>
        <h1 style={s.title}>My profile</h1>
        <p style={s.subtitle}>Update your name, phone, address and password.</p>
      </div>
      <div className="card-enterprise" style={s.card}>
        <div style={s.layout}>
          <div style={s.picSection}>
            <div style={s.picCircle}>
              {profileData.profilePic ? (
                <img src={URL.createObjectURL(profileData.profilePic)} style={s.picImg} alt="Profile" />
              ) : (
                <ProfileIcon size={56} color="var(--color-text-light)" />
              )}
            </div>
            <input type="file" id="picUpload" style={{ display: 'none' }} accept="image/*" onChange={(e) => setProfileData({ ...profileData, profilePic: e.target.files[0] })} />
            <label htmlFor="picUpload" style={s.uploadLabel}>Change photo</label>
          </div>
          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Full name</label>
                <input className="input-enterprise" style={s.input} value={profileData.fullName || ''} onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Phone</label>
                <input className="input-enterprise" style={s.input} value={profileData.phone || ''} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} />
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Address</label>
              <input className="input-enterprise" style={s.input} value={profileData.address || ''} onChange={(e) => setProfileData({ ...profileData, address: e.target.value })} />
            </div>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Country</label>
                <input className="input-enterprise" style={s.input} value={profileData.country || ''} onChange={(e) => setProfileData({ ...profileData, country: e.target.value })} />
              </div>
              <div style={s.field}>
                <label style={s.label}>New password</label>
                <input className="input-enterprise" style={s.input} type="password" placeholder="Leave blank to keep" onChange={(e) => setProfileData({ ...profileData, password: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="btn-primary" style={s.saveBtn}>Save changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrapper: {},
  header: { marginBottom: 'var(--space-6)' },
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-1)', color: 'var(--color-text)', borderLeft: '4px solid var(--color-primary)', paddingLeft: 'var(--space-4)' },
  subtitle: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
  card: { padding: 'var(--space-8)' },
  layout: { display: 'flex', gap: 'var(--space-10)', flexWrap: 'wrap' },
  picSection: { textAlign: 'center', minWidth: 200 },
  picCircle: { width: 160, height: 160, borderRadius: '50%', background: 'var(--color-bg)', border: '2px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' },
  picImg: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' },
  uploadLabel: { fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' },
  form: { flex: 1, minWidth: 280 },
  row: { display: 'flex', gap: 'var(--space-4)', marginBottom: 0 },
  field: { flex: 1, marginBottom: 'var(--space-4)' },
  label: { display: 'block', marginBottom: 'var(--space-1)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontWeight: 500 },
  input: {},
  saveBtn: { marginTop: 'var(--space-4)' },
};
