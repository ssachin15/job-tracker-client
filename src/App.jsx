import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import usePageTitle from './hooks/usePageTitle';

import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute    from './components/layout/PublicRoute';
import AppLayout      from './components/layout/AppLayout';

import LandingPage    from './Pages/LandingPage';
import LoginPage      from './Pages/auth/LoginPage';
import RegisterPage   from './Pages/auth/RegisterPage';
import DashboardPage  from './Pages/dashboard/DashboardPage';
import JobsPage       from './Pages/jobs/JobsPage';
import ResumePage     from './Pages/resume/ResumePage';
import RemindersPage  from './Pages/dashboard/RemindersPage';
import SettingsPage   from './Pages/dashboard/SettingsPage';

function App() {
  usePageTitle();
  const { isAuth } = useAuthStore();

  return (
    <Routes>
      {/* Root — show landing if not logged in, dashboard if logged in */}
      <Route
        path="/"
        element={isAuth ? <Navigate to="/dashboard" replace /> : <LandingPage />}
      />

      {/* Public routes — redirect to dashboard if already logged in */}
      <Route element={<PublicRoute />}>
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected routes — redirect to login if not logged in */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard"  element={<DashboardPage />} />
          <Route path="/jobs"       element={<JobsPage />} />
          <Route path="/jobs/:id"   element={<JobsPage />} />
          <Route path="/resume"     element={<ResumePage />} />
          <Route path="/reminders"  element={<RemindersPage />} />
          <Route path="/settings"   element={<SettingsPage />} />
        </Route>
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;