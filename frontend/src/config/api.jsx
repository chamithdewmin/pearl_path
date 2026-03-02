export const API_ROOT =
  process.env.REACT_APP_API_BASE ||
  process.env.VITE_API_URL ||
  'https://demo.logozodev.com/api';

export const TOURISM_USERS_API = `${API_ROOT}/tourism/users`;
export const TOURISM_BOOKINGS_API = `${API_ROOT}/tourism/my-bookings`;
export const REVIEWS_API = `${API_ROOT}/reviews`;

export function getAuthHeaders() {
  try {
    // Must match AuthContext: token is stored in sessionStorage at login
    const raw = sessionStorage.getItem('southern_tourism_user');
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const token = parsed?.token;
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
}

