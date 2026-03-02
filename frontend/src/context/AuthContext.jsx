import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Read auth state from sessionStorage so login only lasts for the browser session,
  // and is fully cleared when the user logs out or closes the tab.
  const [auth, setAuth] = useState(() => {
    try {
      const saved = sessionStorage.getItem('southern_tourism_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Normalise shape: API logins use { token, user }, demo logins pass user directly
  const user = auth?.user || auth || null;
  const token = auth?.token || null;

  const login = (data) => {
    const next = data;
    setAuth(next);
    try {
      sessionStorage.setItem('southern_tourism_user', JSON.stringify(next));
    } catch (e) {}
  };

  const logout = () => {
    setAuth(null);
    try {
      sessionStorage.removeItem('southern_tourism_user');
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ auth, user, token, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
