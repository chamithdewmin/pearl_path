import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import AccountSidebar from '../../components/AccountSidebar';

export default function AccountLayout() {
  const { auth, user, isLoggedIn, login } = useAuth();

  if (!isLoggedIn) return <Navigate to="/signin" state={{ from: '/account' }} replace />;

  const setUser = (data) => {
    const nextUser = { ...(user || {}), ...data };
    if (auth && auth.user) {
      login({ ...auth, user: nextUser });
    } else {
      login(nextUser);
    }
  };

  return (
    <DashboardLayout sidebar={<AccountSidebar />} headerTitle="My account">
      <Outlet context={{ user, setUser }} />
    </DashboardLayout>
  );
}
