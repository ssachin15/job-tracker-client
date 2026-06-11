import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import useAuthStore from '../../store/authStore';

function Navbar({ title = 'Dashboard' }) {
  const { user } = useAuthStore();

  return (
    <header className="h-14 bg-white/80 backdrop-blur-sm border-b
                       border-gray-200 flex items-center justify-between
                       px-4 md:px-6 sticky top-0 z-30">
      {/* Title — pushed right on mobile to avoid hamburger overlap */}
      <h2 className="text-gray-900 font-semibold text-base ml-10 md:ml-0">
        {title}
      </h2>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Link to="/reminders"
              className="relative w-8 h-8 flex items-center justify-center
                         rounded-xl text-gray-400 hover:text-gray-900
                         hover:bg-gray-100 transition-all"
              title="View Reminders">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5
                           bg-brand-500 rounded-full" />
        </Link>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center
                        justify-center shadow-sm shadow-brand-600/20">
          <span className="text-white text-xs font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
