import React from 'react';
import Guide from '../components/Guide';

export default function Guides() {
  return (
    <div className="main-booking" style={{ padding: 'var(--space-8) var(--space-6)' }}>
      <section className="sec-booking">
        <h1 className="sec-t-booking">Guides</h1>
        <p className="sec-sub-booking">
          All guides shown here come from your database. Add or update guides in the admin panel and they will appear
          on this page and in the account area.
        </p>
        <Guide isAdmin={false} query="" />
      </section>
    </div>
  );
}
