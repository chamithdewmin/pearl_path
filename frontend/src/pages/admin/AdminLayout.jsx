import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import AdminSidebar from '../../components/AdminSidebar';

export default function AdminLayout() {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/admin/login" replace />;
  if (user?.role !== 'ADMIN' && user?.role !== 'admin') return <Navigate to="/" replace />;

  return (
    <DashboardLayout sidebar={<AdminSidebar />} headerTitle="Admin panel">
      <Outlet />
    </DashboardLayout>
  );
}
