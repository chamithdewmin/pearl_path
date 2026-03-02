import React from 'react';
import { CalendarIcon, CheckIcon } from './Icons';

const Booking = ({ bookings, loading }) => {
  return (
    <div className="card-enterprise" style={styles.wrapper}>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Service</th>
              <th style={styles.th}>Start date</th>
              <th style={styles.th}>End date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={styles.loadingCell}>
                  Loading your bookings...
                </td>
              </tr>
            ) : !bookings || bookings.length === 0 ? (
              <tr>
                <td colSpan={5} style={styles.loadingCell}>
                  You do not have any bookings yet.
                </td>
              </tr>
            ) : (
              bookings.map((b) => {
                const serviceParts = [];
                if (b.hotel && b.hotel.name) serviceParts.push(b.hotel.name);
                if (b.vehicle && (b.vehicle.model || b.vehicle.type)) {
                  serviceParts.push(b.vehicle.model || b.vehicle.type);
                }
                if (b.guide && b.guide.name) serviceParts.push(b.guide.name);
                const serviceLabel = serviceParts.join(' • ') || 'Custom package';

                const start = b.startDate ? new Date(b.startDate) : null;
                const end = b.endDate ? new Date(b.endDate) : null;

                return (
                  <tr key={b._id || b.id} style={styles.row}>
                    <td style={styles.td}>
                      <span style={styles.idBadge}>{b._id || b.id}</span>
                    </td>
                    <td style={styles.td}>{serviceLabel}</td>
                    <td style={styles.td} className="icon-text">
                      {start && (
                        <>
                          <CalendarIcon size={16} color="var(--color-text-muted)" />
                          {start.toLocaleDateString()}
                        </>
                      )}
                    </td>
                    <td style={styles.td} className="icon-text">
                      {end && (
                        <>
                          <CalendarIcon size={16} color="var(--color-text-muted)" />
                          {end.toLocaleDateString()}
                        </>
                      )}
                    </td>
                    <td style={styles.td}>
                      <span
                        className={
                          b.status === 'confirmed' || b.status === 'completed'
                            ? 'pill pill-success'
                            : b.status === 'cancelled'
                              ? 'pill pill-danger'
                              : 'pill pill-warning'
                        }
                        style={styles.pill}
                      >
                        {(b.status === 'confirmed' || b.status === 'completed') && (
                          <CheckIcon size={12} color="currentColor" />
                        )}
                        {b.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  wrapper: { padding: 'var(--space-6)', overflow: 'hidden' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' },
  headerRow: { borderBottom: '2px solid var(--color-border)' },
  th: { textAlign: 'left', padding: 'var(--space-4) var(--space-3)', color: 'var(--color-text-muted)', fontWeight: 600 },
  row: { borderBottom: '1px solid var(--color-border)' },
  td: { padding: 'var(--space-4) var(--space-3)', color: 'var(--color-text)' },
  idBadge: {
    fontFamily: 'ui-monospace, monospace',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    color: 'var(--color-primary)',
    wordBreak: 'break-all',
  },
  pill: { display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', textTransform: 'capitalize' },
  loadingCell: { padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-text-muted)' },
};

export default Booking;
