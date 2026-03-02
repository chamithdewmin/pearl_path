import React from 'react';
import { Link } from 'react-router-dom';
import Hotel from '../components/Hotel';
import Vehicle from '../components/Vehicle';
import Guide from '../components/Guide';
import { HotelIcon, CarIcon, GuideIcon, ChevronRightIcon } from '../components/Icons';

const sectionStyle = {
  marginBottom: 'var(--space-10)',
};

const sectionHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 'var(--space-4)',
  marginBottom: 'var(--space-6)',
};

const sectionTitle = {
  fontSize: 'var(--text-xl)',
  fontWeight: 700,
  color: 'var(--color-text)',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
};

const viewAllLink = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--color-primary)',
  textDecoration: 'none',
};

export default function Home() {
  return (
    <>
      <div className="hero-booking" style={{ padding: 'var(--space-8) var(--space-6)' }}>
        <h1>Southern Tourism</h1>
        <p>Stays, car rentals and guides across Galle, Matara and Hambantota.</p>
      </div>

      <div className="main-booking" style={{ padding: '0 var(--space-6) var(--space-10)' }}>
        <section className="sec-booking" style={sectionStyle}>
          <div style={sectionHeader}>
            <h2 style={sectionTitle}>
              <HotelIcon size={24} color="var(--color-primary)" />
              Hotels
            </h2>
            <Link to="/hotels" style={viewAllLink}>
              View all hotels <ChevronRightIcon size={18} />
            </Link>
          </div>
          <Hotel isAdmin={false} query="" limit={6} />
        </section>

        <section className="sec-booking" style={sectionStyle}>
          <div style={sectionHeader}>
            <h2 style={sectionTitle}>
              <CarIcon size={24} color="var(--color-primary)" />
              Vehicles
            </h2>
            <Link to="/car-rental" style={viewAllLink}>
              View all vehicles <ChevronRightIcon size={18} />
            </Link>
          </div>
          <Vehicle isAdmin={false} query="" limit={6} />
        </section>

        <section className="sec-booking" style={sectionStyle}>
          <div style={sectionHeader}>
            <h2 style={sectionTitle}>
              <GuideIcon size={24} color="var(--color-primary)" />
              Guides
            </h2>
            <Link to="/guides" style={viewAllLink}>
              View all guides <ChevronRightIcon size={18} />
            </Link>
          </div>
          <Guide isAdmin={false} query="" limit={6} />
        </section>
      </div>
    </>
  );
}
