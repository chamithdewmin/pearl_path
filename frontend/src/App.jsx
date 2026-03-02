import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import PublicNavbar from './components/PublicNavbar';
import GlobalLoadingBar from './components/GlobalLoadingBar';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import AllInOne from './pages/AllInOne';
import CarRental from './pages/CarRental';
import Guides from './pages/Guides';
import Province from './pages/Province';
import Provinces from './pages/Provinces';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdminSignIn from './pages/AdminSignIn';
import AccountLayout from './pages/account/AccountLayout';
import AccountOverview from './pages/account/AccountOverview';
import AccountHotels from './pages/account/AccountHotels';
import AccountVehicles from './pages/account/AccountVehicles';
import AccountGuides from './pages/account/AccountGuides';
import AccountBookings from './pages/account/AccountBookings';
import AccountProfile from './pages/account/AccountProfile';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminGuides from './pages/admin/AdminGuides';
import AdminVehicles from './pages/admin/AdminVehicles';
import AdminHotels from './pages/admin/AdminHotels';
import AdminBookings from './pages/admin/AdminBookings';

const footerCols = [
  {
    title: 'Support',
    links: [
      { label: 'Contact us', to: '/contact' },
      { label: 'Sign in', to: '/signin' },
      { label: 'Register', to: '/signup' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'All-in-One package', to: '/all-in-one' },
      { label: 'Southern Provinces', to: '/provinces' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Provinces',
    links: [
      { label: 'Galle', to: '/provinces/galle' },
      { label: 'Matara', to: '/provinces/matara' },
      { label: 'Hambantota', to: '/provinces/hambantota' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'My account', to: '/account' },
      { label: 'Sign in', to: '/signin' },
      { label: 'Admin login', to: '/admin/login' },
    ],
  },
];

function PublicLayout({ children }) {
  return (
    <div className="app-booking" style={layoutStyles.wrapper}>
      <PublicNavbar />
      <main style={layoutStyles.main}>{children}</main>
      <footer className="footer-booking">
        <div className="fg-booking">
          {footerCols.map((col, i) => (
            <div key={i} className="fc-booking">
              <h4>{col.title}</h4>
              {col.links.map((l, j) => (
                <Link key={j} to={l.to}>{l.label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="fb-booking">
          <p>Southern Tourism — Stays, car rentals & guides across Galle, Matara & Hambantota.</p>
          <p>© {new Date().getFullYear()} Southern Tourism. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;
  const role = user?.role;
  // Admins should use the admin panel, not the normal account area
  if (role === 'ADMIN' || role === 'admin') return <Navigate to="/admin" replace />;
  return children;
}

function RequireAdmin({ children }) {
  const { user } = useAuth();
  const role = user?.role;
  const isAdmin = role === 'ADMIN' || role === 'admin';
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/account" replace />;
  return children;
}

function RouteLoadingTracker() {
  const location = useLocation();
  const { showLoading, hideLoading } = useLoading();

  React.useEffect(() => {
    showLoading();
    const timeout = setTimeout(() => {
      hideLoading();
    }, 400);
    return () => clearTimeout(timeout);
  }, [location.pathname, showLoading, hideLoading]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <BrowserRouter>
          <GlobalLoadingBar />
          <RouteLoadingTracker />
          <Routes>
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><AboutUs /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactUs /></PublicLayout>} />
            <Route path="/all-in-one" element={<PublicLayout><AllInOne /></PublicLayout>} />
            <Route path="/car-rental" element={<PublicLayout><CarRental /></PublicLayout>} />
            <Route path="/guides" element={<PublicLayout><Guides /></PublicLayout>} />
            <Route path="/provinces" element={<PublicLayout><Provinces /></PublicLayout>} />
            <Route path="/provinces/:slug" element={<PublicLayout><Province /></PublicLayout>} />
            <Route path="/signin" element={<PublicLayout><SignIn /></PublicLayout>} />
            <Route path="/signup" element={<PublicLayout><SignUp /></PublicLayout>} />
            {/* Admin login uses a clean page without public navbar/footer */}
            <Route path="/admin/login" element={<AdminSignIn />} />

            <Route
              path="/account"
              element={(
                <RequireAuth>
                  <AccountLayout />
                </RequireAuth>
              )}
            >
              <Route index element={<AccountProfile />} />
              <Route path="hotels" element={<AccountHotels />} />
              <Route path="vehicles" element={<AccountVehicles />} />
              <Route path="guides" element={<AccountGuides />} />
              <Route path="bookings" element={<AccountBookings />} />
              <Route path="profile" element={<AccountProfile />} />
            </Route>

            <Route
              path="/admin"
              element={(
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              )}
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="guides" element={<AdminGuides />} />
              <Route path="vehicles" element={<AdminVehicles />} />
              <Route path="hotels" element={<AdminHotels />} />
              <Route path="bookings" element={<AdminBookings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LoadingProvider>
    </AuthProvider>
  );
}

const layoutStyles = {
  wrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  main: { flex: 1 },
};

export default App;
