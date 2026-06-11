import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TITLES = {
  '/dashboard':  'Dashboard — Job Tracker',
  '/jobs':       'My Jobs — Job Tracker',
  '/resume':     'Resume — Job Tracker',
  '/reminders':  'Reminders — Job Tracker',
  '/settings':   'Settings — Job Tracker',
  '/login':      'Sign In — Job Tracker',
  '/register':   'Create Account — Job Tracker',
};

function usePageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] || 'Job Tracker';
  }, [pathname]);
}

export default usePageTitle;
