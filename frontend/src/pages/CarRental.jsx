import React from 'react';
import Vehicle from '../components/Vehicle';

export default function CarRental() {
  return (
    <div className="main-booking" style={{ padding: 'var(--space-8) var(--space-6)' }}>
      <section className="sec-booking">
        <h1 className="sec-t-booking">Car rental</h1>
        <p className="sec-sub-booking">
          Browse real vehicles added in the admin panel. When you book, your reservation is stored in the database and
          appears under &quot;My bookings&quot;.
        </p>
        <Vehicle isAdmin={false} query="" />
      </section>
    </div>
  );
}
