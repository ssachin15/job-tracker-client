import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { authAPI } from '../../api/auth';
import useAuthStore from '../../store/authStore';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);
  const { setAuth }  = useAuthStore();
  const navigate     = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await authAPI.login(data);
      setAuth({
        user:         res.data.user,
        accessToken:  res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      toast.success(`Welcome back, ${res.data.user.name.split(' ')[0]}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm animate-slide-up">
        {/* Logo mark */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center
                          justify-center mb-4 shadow-lg shadow-brand-600/20">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 11L9 16L18 6" stroke="white"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-brand-600 tracking-tight">
            Job Tracker
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Sign in to your workspace
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6
                        shadow-lg shadow-gray-200/60">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5
                                 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={clsx(
                    'input pl-9',
                    errors.email
                      ? 'border-red-500/50 focus:ring-red-500/30'
                      : 'border-gray-200 focus:border-brand-600/50 focus:ring-brand-600/20'
                  )}
                  {...register('email', {
                    required: 'Email is required',
                    pattern:  { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5
                                 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={clsx(
                    'input pl-9 pr-10',
                    errors.password
                      ? 'border-red-500/50 focus:ring-red-500/30'
                      : 'border-gray-200 focus:border-brand-600/50 focus:ring-brand-600/20'
                  )}
                  {...register('password', {
                    required:  'Password is required',
                    minLength: { value: 8, message: 'Min 8 characters' },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                             text-gray-400 hover:text-gray-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 mt-2
                         bg-brand-600 hover:bg-brand-500 disabled:opacity-50
                         text-white text-sm font-semibold py-2.5 rounded-xl
                         transition-all duration-200 hover:-translate-y-0.5
                         disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30
                                border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight size={15}
                    className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-gray-400">
            No account?{' '}
            <Link to="/register"
              className="text-brand-600 hover:text-brand-500
                         font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-6">
          AI-powered job tracking · Built for developers
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
