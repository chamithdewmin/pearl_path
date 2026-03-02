const API_BASE = 'http://localhost:4000/api';

// Utility helpers
async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Request failed');
  }
  return res.json();
}

function renderTable(containerId, items, columns, onEdit, onDelete) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!items.length) {
    container.innerHTML = '<p class="text-muted">No records found.</p>';
    return;
  }

  const headerRow = columns
    .map((c) => `<th scope="col">${c.label}</th>`)
    .join('') + '<th scope="col">Actions</th>';

  const bodyRows = items
    .map((item) => {
      const cells = columns
        .map((c) => `<td>${c.format ? c.format(item[c.key], item) : (item[c.key] ?? '')}</td>`)
        .join('');
      return `<tr>
        ${cells}
        <td>
          <button class="btn btn-sm btn-outline-primary me-1" data-id="${item._id}" data-action="edit">Edit</button>
          <button class="btn btn-sm btn-outline-danger" data-id="${item._id}" data-action="delete">Delete</button>
        </td>
      </tr>`;
    })
    .join('');

  container.innerHTML = `
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead><tr>${headerRow}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>
  `;

  container.querySelectorAll('button[data-action="edit"]').forEach((btn) => {
    btn.addEventListener('click', () => onEdit(btn.getAttribute('data-id')));
  });

  container.querySelectorAll('button[data-action="delete"]').forEach((btn) => {
    btn.addEventListener('click', () => onDelete(btn.getAttribute('data-id')));
  });
}

// Tourists
async function loadTourists() {
  const tourists = await apiRequest('/tourists');
  renderTable(
    'tourist-list',
    tourists,
    [
      { key: 'name', label: 'Name' },
      { key: 'contactPhone', label: 'Phone' },
      { key: 'contactEmail', label: 'Email' },
      { key: 'nationality', label: 'Nationality' },
      { key: 'preferences', label: 'Preferences' },
    ],
    fillTouristForm,
    deleteTourist
  );
}

async function fillTouristForm(id) {
  const t = await apiRequest(`/tourists/${id}`);
  document.getElementById('tourist-id').value = t._id;
  document.getElementById('tourist-name').value = t.name || '';
  document.getElementById('tourist-phone').value = t.contactPhone || '';
  document.getElementById('tourist-email').value = t.contactEmail || '';
  document.getElementById('tourist-nationality').value = t.nationality || '';
  document.getElementById('tourist-preferences').value = t.preferences || '';
}

async function deleteTourist(id) {
  if (!confirm('Delete this tourist?')) return;
  await apiRequest(`/tourists/${id}`, { method: 'DELETE' });
  loadTourists();
}

document.getElementById('tourist-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('tourist-id').value;
  const payload = {
    name: document.getElementById('tourist-name').value,
    contactPhone: document.getElementById('tourist-phone').value,
    contactEmail: document.getElementById('tourist-email').value,
    nationality: document.getElementById('tourist-nationality').value,
    preferences: document.getElementById('tourist-preferences').value,
  };
  const method = id ? 'PUT' : 'POST';
  const path = id ? `/tourists/${id}` : '/tourists';
  await apiRequest(path, { method, body: JSON.stringify(payload) });
  document.getElementById('tourist-form').reset();
  document.getElementById('tourist-id').value = '';
  loadTourists();
});

document.getElementById('tourist-reset').addEventListener('click', () => {
  document.getElementById('tourist-form').reset();
  document.getElementById('tourist-id').value = '';
});

// Hotels
async function loadHotels() {
  const hotels = await apiRequest('/hotels');
  renderTable(
    'hotel-list',
    hotels,
    [
      { key: 'name', label: 'Name' },
      { key: 'location', label: 'Location' },
      { key: 'pricePerNight', label: 'Price / Night' },
      {
        key: 'facilities',
        label: 'Facilities',
        format: (v) => (Array.isArray(v) ? v.join(', ') : ''),
      },
      { key: 'availability', label: 'Available', format: (v) => (v ? 'Yes' : 'No') },
    ],
    fillHotelForm,
    deleteHotel
  );
}

async function fillHotelForm(id) {
  const h = await apiRequest(`/hotels/${id}`);
  document.getElementById('hotel-id').value = h._id;
  document.getElementById('hotel-name').value = h.name || '';
  document.getElementById('hotel-location').value = h.location || '';
  document.getElementById('hotel-price').value = h.pricePerNight ?? '';
  document.getElementById('hotel-facilities').value = Array.isArray(h.facilities)
    ? h.facilities.join(', ')
    : '';
  document.getElementById('hotel-images').value = Array.isArray(h.images)
    ? h.images.join(', ')
    : '';
  document.getElementById('hotel-availability').checked = !!h.availability;
}

async function deleteHotel(id) {
  if (!confirm('Delete this hotel?')) return;
  await apiRequest(`/hotels/${id}`, { method: 'DELETE' });
  loadHotels();
}

document.getElementById('hotel-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('hotel-id').value;
  const facilities = document
    .getElementById('hotel-facilities')
    .value.split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const images = document
    .getElementById('hotel-images')
    .value.split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const payload = {
    name: document.getElementById('hotel-name').value,
    location: document.getElementById('hotel-location').value,
    pricePerNight: Number(document.getElementById('hotel-price').value),
    facilities,
    images,
    availability: document.getElementById('hotel-availability').checked,
  };
  const method = id ? 'PUT' : 'POST';
  const path = id ? `/hotels/${id}` : '/hotels';
  await apiRequest(path, { method, body: JSON.stringify(payload) });
  document.getElementById('hotel-form').reset();
  document.getElementById('hotel-id').value = '';
  document.getElementById('hotel-availability').checked = true;
  loadHotels();
});

document.getElementById('hotel-reset').addEventListener('click', () => {
  document.getElementById('hotel-form').reset();
  document.getElementById('hotel-id').value = '';
  document.getElementById('hotel-availability').checked = true;
});

// Vehicles
async function loadVehicles() {
  const vehicles = await apiRequest('/vehicles');
  renderTable(
    'vehicle-list',
    vehicles,
    [
      { key: 'type', label: 'Type' },
      { key: 'model', label: 'Model' },
      { key: 'pricePerDay', label: 'Price / Day' },
      { key: 'seats', label: 'Seats' },
      { key: 'availabilityStatus', label: 'Availability' },
    ],
    fillVehicleForm,
    deleteVehicle
  );
}

async function fillVehicleForm(id) {
  const v = await apiRequest(`/vehicles/${id}`);
  document.getElementById('vehicle-id').value = v._id;
  document.getElementById('vehicle-type').value = v.type || '';
  document.getElementById('vehicle-model').value = v.model || '';
  document.getElementById('vehicle-price').value = v.pricePerDay ?? '';
  document.getElementById('vehicle-seats').value = v.seats ?? '';
  document.getElementById('vehicle-availability').value = v.availabilityStatus || 'available';
}

async function deleteVehicle(id) {
  if (!confirm('Delete this vehicle?')) return;
  await apiRequest(`/vehicles/${id}`, { method: 'DELETE' });
  loadVehicles();
}

document.getElementById('vehicle-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('vehicle-id').value;
  const payload = {
    type: document.getElementById('vehicle-type').value,
    model: document.getElementById('vehicle-model').value,
    pricePerDay: Number(document.getElementById('vehicle-price').value),
    seats: Number(document.getElementById('vehicle-seats').value) || null,
    availabilityStatus: document.getElementById('vehicle-availability').value,
  };
  const method = id ? 'PUT' : 'POST';
  const path = id ? `/vehicles/${id}` : '/vehicles';
  await apiRequest(path, { method, body: JSON.stringify(payload) });
  document.getElementById('vehicle-form').reset();
  document.getElementById('vehicle-id').value = '';
  document.getElementById('vehicle-availability').value = 'available';
  loadVehicles();
});

document.getElementById('vehicle-reset').addEventListener('click', () => {
  document.getElementById('vehicle-form').reset();
  document.getElementById('vehicle-id').value = '';
  document.getElementById('vehicle-availability').value = 'available';
});

// Guides
async function loadGuides() {
  const guides = await apiRequest('/guides');
  renderTable(
    'guide-list',
    guides,
    [
      { key: 'name', label: 'Name' },
      {
        key: 'languages',
        label: 'Languages',
        format: (v) => (Array.isArray(v) ? v.join(', ') : ''),
      },
      { key: 'area', label: 'Area' },
      { key: 'pricePerDay', label: 'Price / Day' },
      { key: 'availabilityStatus', label: 'Availability' },
    ],
    fillGuideForm,
    deleteGuide
  );
}

async function fillGuideForm(id) {
  const g = await apiRequest(`/guides/${id}`);
  document.getElementById('guide-id').value = g._id;
  document.getElementById('guide-name').value = g.name || '';
  document.getElementById('guide-languages').value = Array.isArray(g.languages)
    ? g.languages.join(', ')
    : '';
  document.getElementById('guide-area').value = g.area || '';
  document.getElementById('guide-price').value = g.pricePerDay ?? '';
  document.getElementById('guide-availability').value = g.availabilityStatus || 'available';
  document.getElementById('guide-skills').value = Array.isArray(g.skills)
    ? g.skills.join(', ')
    : '';
}

async function deleteGuide(id) {
  if (!confirm('Delete this guide?')) return;
  await apiRequest(`/guides/${id}`, { method: 'DELETE' });
  loadGuides();
}

document.getElementById('guide-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('guide-id').value;
  const languages = document
    .getElementById('guide-languages')
    .value.split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const skills = document
    .getElementById('guide-skills')
    .value.split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const payload = {
    name: document.getElementById('guide-name').value,
    languages,
    area: document.getElementById('guide-area').value,
    pricePerDay: Number(document.getElementById('guide-price').value),
    availabilityStatus: document.getElementById('guide-availability').value,
    skills,
  };
  const method = id ? 'PUT' : 'POST';
  const path = id ? `/guides/${id}` : '/guides';
  await apiRequest(path, { method, body: JSON.stringify(payload) });
  document.getElementById('guide-form').reset();
  document.getElementById('guide-id').value = '';
  document.getElementById('guide-availability').value = 'available';
  loadGuides();
});

document.getElementById('guide-reset').addEventListener('click', () => {
  document.getElementById('guide-form').reset();
  document.getElementById('guide-id').value = '';
  document.getElementById('guide-availability').value = 'available';
});

// Bookings
async function loadBookings() {
  const bookings = await apiRequest('/bookings');
  renderTable(
    'booking-list',
    bookings,
    [
      {
        key: 'tourist',
        label: 'Tourist',
        format: (v, row) => (v && v.name) || v || row.tourist,
      },
      {
        key: 'hotel',
        label: 'Hotel',
        format: (v, row) => (v && v.name) || v || row.hotel,
      },
      {
        key: 'vehicle',
        label: 'Vehicle',
        format: (v, row) => (v && v.model) || v || row.vehicle,
      },
      {
        key: 'guide',
        label: 'Guide',
        format: (v, row) => (v && v.name) || v || row.guide,
      },
      {
        key: 'startDate',
        label: 'Start',
        format: (v) => (v ? new Date(v).toLocaleDateString() : ''),
      },
      {
        key: 'endDate',
        label: 'End',
        format: (v) => (v ? new Date(v).toLocaleDateString() : ''),
      },
      { key: 'status', label: 'Status' },
    ],
    fillBookingForm,
    deleteBooking
  );
}

async function fillBookingForm(id) {
  const b = await apiRequest(`/bookings/${id}`);
  document.getElementById('booking-id').value = b._id;
  document.getElementById('booking-tourist').value =
    (b.tourist && b.tourist._id) || b.tourist || '';
  document.getElementById('booking-hotel').value =
    (b.hotel && b.hotel._id) || b.hotel || '';
  document.getElementById('booking-vehicle').value =
    (b.vehicle && b.vehicle._id) || b.vehicle || '';
  document.getElementById('booking-guide').value =
    (b.guide && b.guide._id) || b.guide || '';
  document.getElementById('booking-start').value = b.startDate
    ? b.startDate.substring(0, 10)
    : '';
  document.getElementById('booking-end').value = b.endDate
    ? b.endDate.substring(0, 10)
    : '';
  document.getElementById('booking-price').value = b.totalPrice ?? '';
  document.getElementById('booking-status').value = b.status || 'pending';
}

async function deleteBooking(id) {
  if (!confirm('Delete this booking?')) return;
  await apiRequest(`/bookings/${id}`, { method: 'DELETE' });
  loadBookings();
}

document.getElementById('booking-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('booking-id').value;
  const payload = {
    tourist: document.getElementById('booking-tourist').value,
    hotel: document.getElementById('booking-hotel').value || null,
    vehicle: document.getElementById('booking-vehicle').value || null,
    guide: document.getElementById('booking-guide').value || null,
    startDate: document.getElementById('booking-start').value,
    endDate: document.getElementById('booking-end').value,
    totalPrice: Number(document.getElementById('booking-price').value) || null,
    status: document.getElementById('booking-status').value,
  };
  const method = id ? 'PUT' : 'POST';
  const path = id ? `/bookings/${id}` : '/bookings';
  await apiRequest(path, { method, body: JSON.stringify(payload) });
  document.getElementById('booking-form').reset();
  document.getElementById('booking-id').value = '';
  document.getElementById('booking-status').value = 'pending';
  loadBookings();
});

document.getElementById('booking-reset').addEventListener('click', () => {
  document.getElementById('booking-form').reset();
  document.getElementById('booking-id').value = '';
  document.getElementById('booking-status').value = 'pending';
});

// Reviews
async function loadReviews() {
  const reviews = await apiRequest('/reviews');
  renderTable(
    'review-list',
    reviews,
    [
      {
        key: 'tourist',
        label: 'Tourist',
        format: (v, row) => (v && v.name) || v || row.tourist,
      },
      { key: 'rating', label: 'Rating' },
      { key: 'comment', label: 'Comment' },
      {
        key: 'createdAt',
        label: 'Created',
        format: (v) => (v ? new Date(v).toLocaleString() : ''),
      },
    ],
    fillReviewForm,
    deleteReview
  );
}

async function fillReviewForm(id) {
  const r = await apiRequest(`/reviews/${id}`);
  document.getElementById('review-id').value = r._id;
  document.getElementById('review-tourist').value =
    (r.tourist && r.tourist._id) || r.tourist || '';
  document.getElementById('review-hotel').value =
    (r.hotel && r.hotel._id) || r.hotel || '';
  document.getElementById('review-vehicle').value =
    (r.vehicle && r.vehicle._id) || r.vehicle || '';
  document.getElementById('review-guide').value =
    (r.guide && r.guide._id) || r.guide || '';
  document.getElementById('review-rating').value = r.rating ?? '';
  document.getElementById('review-comment').value = r.comment || '';
}

async function deleteReview(id) {
  if (!confirm('Delete this review?')) return;
  await apiRequest(`/reviews/${id}`, { method: 'DELETE' });
  loadReviews();
}

document.getElementById('review-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('review-id').value;
  const payload = {
    tourist: document.getElementById('review-tourist').value,
    hotel: document.getElementById('review-hotel').value || null,
    vehicle: document.getElementById('review-vehicle').value || null,
    guide: document.getElementById('review-guide').value || null,
    rating: Number(document.getElementById('review-rating').value),
    comment: document.getElementById('review-comment').value,
  };
  const method = id ? 'PUT' : 'POST';
  const path = id ? `/reviews/${id}` : '/reviews';
  await apiRequest(path, { method, body: JSON.stringify(payload) });
  document.getElementById('review-form').reset();
  document.getElementById('review-id').value = '';
  loadReviews();
});

document.getElementById('review-reset').addEventListener('click', () => {
  document.getElementById('review-form').reset();
  document.getElementById('review-id').value = '';
});

// Initial load
async function init() {
  try {
    await Promise.all([
      loadTourists(),
      loadHotels(),
      loadVehicles(),
      loadGuides(),
      loadBookings(),
      loadReviews(),
    ]);
  } catch (err) {
    alert('Error loading data. Make sure the backend is running: ' + err.message);
  }
}

window.addEventListener('DOMContentLoaded', init);

