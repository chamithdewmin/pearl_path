import React from 'react';
import { Link } from 'react-router-dom';

export default function AllInOne() {
  return (
    <div style={s.wrapper}>
      <div style={s.container}>
        <h1 style={s.title}>All-in-One Package</h1>
        <p style={s.subtitle}>
          Use your account to build a custom package from real data in the system. First browse hotels, then vehicles,
          then guides – every booking you make is stored in the database and visible under &quot;My bookings&quot;.
        </p>

        <div className="card-enterprise" style={s.card}>
          <ol style={s.list}>
            <li>
              <strong>Browse stays:</strong> Go to <Link to="/account/hotels">My account → Hotels</Link> and pick a
              hotel you like. Use &quot;See availability&quot; to create a booking.
            </li>
            <li>
              <strong>Add transport:</strong> Visit <Link to="/account/vehicles">My account → Transport</Link> or the{' '}
              <Link to="/car-rental">Car rental</Link> page and book a vehicle. These cards are powered by the vehicles
              you add in the admin panel.
            </li>
            <li>
              <strong>Select guides:</strong> Explore <Link to="/account/guides">My account → Guides</Link> or the{' '}
              <Link to="/guides">Guides</Link> page to see guides from your database and make guide bookings.
            </li>
            <li>
              <strong>Review everything:</strong> Open <Link to="/account/bookings">My account → My bookings</Link> to
              see all bookings together. Completed bookings can be reviewed and those reviews feed back into hotel,
              vehicle and guide ratings.
            </li>
          </ol>
          <p style={s.note}>
            All content on these pages is driven by your MongoDB collections (hotels, vehicles, guides, bookings). No
            dummy demo data is shown – if there is no data in the database, the lists will appear empty.
          </p>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrapper: { padding: 'var(--space-10) var(--space-8)' },
  container: { maxWidth: 800, margin: '0 auto' },
  title: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' },
  subtitle: { color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' },
  card: { padding: 'var(--space-8)' },
  list: {
    margin: 0,
    paddingLeft: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text)',
  },
  note: {
    marginTop: 'var(--space-5)',
    fontSize: 'var(--text-xs)',
    color: 'var(--color-text-muted)',
  },
};
