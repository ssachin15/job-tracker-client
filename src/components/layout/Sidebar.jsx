import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, FileText,
  Bell, Settings, LogOut, ChevronLeft,
  ChevronRight, Sparkles, Menu, X,
} from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import { authAPI } from '../../api/auth';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/jobs',      icon: Briefcase,       label: 'Jobs'      },
  { to: '/resume',    icon: FileText,        label: 'Resume'    },
  { to: '/reminders', icon: Bell,            label: 'Reminders' },
  { to: '/settings',  icon: Settings,        label: 'Settings'  },
];

function Sidebar() {
  const [collapsed,    setCollapsed]    = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try { await authAPI.logout(); } catch {}
    logout();
    navigate('/login');
    toast.success('Logged out');
    setMobileOpen(false);
  };

  const NavContent = ({ onNavClick }) => (
    <>
      {/* Logo */}
      <div className={clsx(
        'flex items-center gap-3 px-4 py-5 border-b border-gray-200',
        collapsed && 'justify-center'
      )}>
        <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center
                        justify-center flex-shrink-0 shadow-sm shadow-brand-600/20">
          <Sparkles size={15} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-gray-900 text-sm tracking-tight">
            Job Tracker
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavClick}
            className={({ isActive }) =>
              clsx(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl',
                'text-sm font-medium transition-all duration-150',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'text-brand-700 bg-brand-50 border border-brand-200'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              )
            }
            title={collapsed ? label : undefined}
          >
            {({ isActive }) => (
              <>
                {isActive && !collapsed && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2
                                   w-0.5 h-4 bg-brand-500 rounded-full" />
                )}
                <Icon size={17} className="flex-shrink-0" />
                {!collapsed && label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-2 py-3 border-t border-gray-200 space-y-0.5">
        <div className={clsx(
          'flex items-center gap-3 px-3 py-2 rounded-xl',
          collapsed && 'justify-center'
        )}>
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center
                          justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className={clsx(
            'flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm',
            'text-gray-500 hover:text-red-600 hover:bg-red-50',
            'transition-all duration-150',
            collapsed && 'justify-center px-2'
          )}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-white
                   border border-gray-200 rounded-xl flex items-center justify-center
                   text-gray-500 hover:text-gray-900 transition-colors shadow-sm"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40 animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={clsx(
        'md:hidden fixed left-0 top-0 h-full w-64 bg-white border-r',
        'border-gray-200 z-50 flex flex-col transition-transform duration-300',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center
                     text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={16} />
        </button>
        <NavContent onNavClick={() => setMobileOpen(false)} />
      </div>

      {/* Desktop sidebar */}
      <aside className={clsx(
        'hidden md:flex flex-col h-screen bg-white border-r border-gray-200',
        'relative transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-56'
      )}>
        <NavContent onNavClick={undefined} />

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-[4.5rem] w-6 h-6 bg-white
                     border border-gray-300 rounded-full flex items-center
                     justify-center hover:bg-gray-50 transition-colors z-10 shadow-sm"
        >
          {collapsed
            ? <ChevronRight size={11} className="text-gray-500" />
            : <ChevronLeft  size={11} className="text-gray-500" />
          }
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
