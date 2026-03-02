const API_ROOT =
  process.env.REACT_APP_API_BASE ||
  process.env.VITE_API_URL ||
  'https://demo.logozodev.com/api';

export const TOURISM_USERS_API = `${API_ROOT}/tourism/users`;
export const TOURISM_BOOKINGS_API = `${API_ROOT}/tourism/my-bookings`;

