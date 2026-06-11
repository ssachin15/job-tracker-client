import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useScrollTop from '../../hooks/useScrollTop';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/jobs':      'My Jobs',
  '/resume':    'Resume',
  '/reminders': 'Reminders',
  '/settings':  'Settings',
};

function AppLayout() {
  useScrollTop();
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || 'Job Tracker';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title={title} />
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;