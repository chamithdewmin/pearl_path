import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Hotel from '../components/Hotel';
import Vehicle from '../components/Vehicle';
import Guide from '../components/Guide';
import Booking from '../components/Booking';
import GuideChat from '../components/GuideChat';
import {
  SearchIcon,
  HotelIcon,
  CarIcon,
  GuideIcon,
  BookingIcon,
  ProfileIcon,
  AddIcon,
  CameraIcon,
} from '../components/Icons';

function UserProfile({ user, setUser }) {
  const [profileData, setProfileData] = useState({
    ...user,
    password: '',
    phone: user.phone || '+94 ',
    address: user.address || '',
    country: user.country || 'Sri Lanka',
    profilePic: null,
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setUser({ ...user, fullName: profileData.fullName, phone: profileData.phone, address: profileData.address, country: profileData.country });
    alert('Profile updated.');
  };

  return (
    <div className="card-enterprise" style={s.profileCard}>
      <h2 style={s.sectionTitle}>My profile</h2>
      <div style={s.profileLayout}>
        <div style={s.profilePicSection}>
          <div style={s.picCircle}>
            {profileData.profilePic ? (
              <img src={URL.createObjectURL(profileData.profilePic)} style={s.picImg} alt="Profile" />
            ) : (
              <ProfileIcon size={56} color="var(--color-text-light)" />
            )}
          </div>
          <input type="file" id="picUpload" style={{ display: 'none' }} onChange={(e) => setProfileData({ ...profileData, profilePic: e.target.files[0] })} />
          <label htmlFor="picUpload" style={s.uploadBtn}>Change photo</label>
        </div>
        <form onSubmit={handleProfileUpdate} style={s.profileForm}>
          <div style={s.inputRow}>
            <div style={s.inputGroup}>
              <label style={s.fieldLabel}>Full name</label>
              <input className="input-enterprise" style={s.formInput} value={profileData.fullName} onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })} />
            </div>
            <div style={s.inputGroup}>
              <label style={s.fieldLabel}>Phone</label>
              <input className="input-enterprise" style={s.formInput} value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} />
            </div>
          </div>
          <div style={s.inputGroup}>
            <label style={s.fieldLabel}>Address</label>
            <input className="input-enterprise" style={s.formInput} value={profileData.address} onChange={(e) => setProfileData({ ...profileData, address: e.target.value })} />
          </div>
          <div style={s.inputRow}>
            <div style={s.inputGroup}>
              <label style={s.fieldLabel}>Country</label>
              <input className="input-enterprise" style={s.formInput} value={profileData.country} onChange={(e) => setProfileData({ ...profileData, country: e.target.value })} />
            </div>
            <div style={s.inputGroup}>
              <label style={s.fieldLabel}>New password</label>
              <input className="input-enterprise" style={s.formInput} type="password" placeholder="Leave blank to keep" onChange={(e) => setProfileData({ ...profileData, password: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="btn-primary" style={s.saveProfileBtn}>Save changes</button>
        </form>
      </div>
    </div>
  );
}

function AdminForm({ activeForm, setActiveForm, selectedImage, setSelectedImage }) {
  if (!activeForm) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage) { alert('Please upload a photo.'); return; }
    alert(`${activeForm} saved.`);
    setActiveForm(null);
    setSelectedImage(null);
  };
  return (
    <div style={s.formOverlay}>
      <div className="card-enterprise" style={s.formContainer}>
        <h2 style={s.formTitle}>Add new {activeForm}</h2>
        <form onSubmit={handleSubmit}>
          <input className="input-enterprise" style={s.formInput} placeholder={`${activeForm} name`} required />
          <input className="input-enterprise" style={s.formInput} placeholder="Location / District" required />
          <input className="input-enterprise" style={s.formInput} placeholder="Price (LKR)" required />
          <textarea className="input-enterprise" style={{ ...s.formInput, height: 80 }} placeholder="Description" required />
          <div style={s.photoUploadBox}>
            <span className="icon-text" style={s.photoLabel}><CameraIcon size={20} color="var(--color-primary)" /> Upload photo</span>
            <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} style={s.fileInput} />
          </div>
          <div style={s.formActions}>
            <button type="submit" className="btn-primary" style={s.submitFormBtn}>Save</button>
            <button type="button" onClick={() => { setActiveForm(null); setSelectedImage(null); }} style={s.cancelFormBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Account() {
  const { user, isLoggedIn, login } = useAuth();
  const [activeTab, setActiveTab] = useState('HOTELS');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeForm, setActiveForm] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!isLoggedIn) return <Navigate to="/signin" state={{ from: '/account' }} replace />;

  const setUser = (data) => login({ ...user, ...data });

  const tabs = [
    { id: 'HOTELS', label: 'Hotels', Icon: HotelIcon },
    { id: 'VEHICLES', label: 'Vehicles', Icon: CarIcon },
    { id: 'GUIDES', label: 'Guides', Icon: GuideIcon },
    { id: 'MY_BOOKINGS', label: 'My bookings', Icon: BookingIcon },
    { id: 'CHAT', label: 'Chat with guide', Icon: GuideIcon },
    { id: 'PROFILE', label: 'Profile', Icon: ProfileIcon },
  ];

  return (
    <div style={s.wrapper}>
      <AdminForm activeForm={activeForm} setActiveForm={setActiveForm} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      <div style={s.container}>
        <div style={s.searchSection}>
          <div style={s.searchBar}>
            <SearchIcon size={22} color="var(--color-text-muted)" />
            <input type="text" placeholder={`Search ${activeTab.toLowerCase()}...`} className="input-enterprise" style={s.searchInput} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        {user.role === 'ADMIN' && activeTab !== 'PROFILE' && activeTab !== 'CHAT' && (
          <div style={s.statsRow}>
            {[{ value: '15', label: 'Hotels' }, { value: '24', label: 'Vehicles' }, { value: '10', label: 'Guides' }, { value: '08', label: 'Bookings' }].map((item) => (
              <div key={item.label} className="card-enterprise" style={s.statBox}><span style={s.statValue}>{item.value}</span><span style={s.statLabel}>{item.label}</span></div>
            ))}
          </div>
        )}

        <nav style={s.tabBar}>
          {tabs.map(({ id, label, Icon }) => (
            <button key={id} type="button" style={activeTab === id ? s.activeTab : s.tab} onClick={() => setActiveTab(id)} className="icon-text">
              <Icon size={20} color={activeTab === id ? '#fff' : 'var(--color-text-muted)'} />
              {label}
            </button>
          ))}
        </nav>

        <div style={s.contentArea}>
          {activeTab === 'HOTELS' && (
            <section>
              <div style={s.sectionHeader}>
                <h2 style={s.sectionTitle}>Stays</h2>
                {user.role === 'ADMIN' && <button className="btn-primary icon-text" style={s.addBtn} onClick={() => setActiveForm('HOTEL')}><AddIcon size={18} color="#fff" /> Add hotel</button>}
              </div>
              <Hotel isAdmin={user.role === 'ADMIN'} query={searchQuery} />
            </section>
          )}
          {activeTab === 'VEHICLES' && (
            <section>
              <div style={s.sectionHeader}>
                <h2 style={s.sectionTitle}>Transport</h2>
                {user.role === 'ADMIN' && <button className="btn-primary icon-text" style={s.addBtn} onClick={() => setActiveForm('VEHICLE')}><AddIcon size={18} color="#fff" /> Add vehicle</button>}
              </div>
              <Vehicle isAdmin={user.role === 'ADMIN'} query={searchQuery} />
            </section>
          )}
          {activeTab === 'GUIDES' && (
            <section>
              <div style={s.sectionHeader}>
                <h2 style={s.sectionTitle}>Guides</h2>
                {user.role === 'ADMIN' && <button className="btn-primary icon-text" style={s.addBtn} onClick={() => setActiveForm('GUIDE')}><AddIcon size={18} color="#fff" /> Add guide</button>}
              </div>
              <Guide isAdmin={user.role === 'ADMIN'} query={searchQuery} />
            </section>
          )}
          {activeTab === 'MY_BOOKINGS' && <section><h2 style={s.sectionTitle}>My bookings</h2><Booking isAdmin={user.role === 'ADMIN'} /></section>}
          {activeTab === 'CHAT' && <GuideChat />}
          {activeTab === 'PROFILE' && <UserProfile user={user} setUser={setUser} />}
        </div>
      </div>
    </div>
  );
}

const s = {
  wrapper: { minHeight: '100vh', background: 'var(--color-bg)', padding: 'var(--space-8) var(--space-6)' },
  container: { maxWidth: 1280, margin: '0 auto' },
  searchSection: { marginBottom: 'var(--space-8)' },
  searchBar: { display: 'flex', alignItems: 'center', gap: 'var(--space-3)', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-2) var(--space-4)', maxWidth: 560 },
  searchInput: { border: 'none', outline: 'none', flex: 1, padding: 'var(--space-2) 0' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' },
  statBox: { padding: 'var(--space-6)', textAlign: 'center' },
  statValue: { display: 'block', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-primary)' },
  statLabel: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
  tabBar: { display: 'flex', gap: 'var(--space-1)', background: 'var(--color-bg-card)', padding: 'var(--space-1)', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-8)', border: '1px solid var(--color-border)', flexWrap: 'wrap' },
  tab: { display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3) var(--space-5)', borderRadius: 'var(--radius-full)', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer' },
  activeTab: { display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3) var(--space-5)', borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--color-primary)', color: '#fff', fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer' },
  sectionTitle: { fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-text)', marginBottom: 'var(--space-6)', borderLeft: '4px solid var(--color-primary)', paddingLeft: 'var(--space-4)' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' },
  addBtn: { padding: 'var(--space-2) var(--space-5)' },
  contentArea: { minHeight: 400 },
  formOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 'var(--space-6)' },
  formContainer: { width: '100%', maxWidth: 520, padding: 'var(--space-8)' },
  formTitle: { fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--space-6)' },
  formInput: { marginBottom: 'var(--space-4)' },
  photoUploadBox: { marginBottom: 'var(--space-4)', padding: 'var(--space-4)', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)' },
  photoLabel: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' },
  fileInput: { marginTop: 'var(--space-2)' },
  formActions: { display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)' },
  submitFormBtn: { flex: 1 },
  cancelFormBtn: { flex: 1, padding: 'var(--space-3)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer' },
  profileCard: { padding: 'var(--space-8)' },
  profileLayout: { display: 'flex', gap: 'var(--space-10)', marginTop: 'var(--space-6)' },
  profilePicSection: { textAlign: 'center', minWidth: 200 },
  picCircle: { width: 160, height: 160, borderRadius: '50%', background: 'var(--color-bg)', border: '2px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' },
  picImg: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' },
  uploadBtn: { fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' },
  profileForm: { flex: 1 },
  inputRow: { display: 'flex', gap: 'var(--space-4)', marginBottom: 0 },
  inputGroup: { flex: 1, marginBottom: 'var(--space-4)' },
  fieldLabel: { display: 'block', marginBottom: 'var(--space-1)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontWeight: 500 },
  saveProfileBtn: { marginTop: 'var(--space-4)' },
};
