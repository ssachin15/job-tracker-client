import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { authAPI } from '../../api/auth';
import useAuthStore from '../../store/authStore';

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);
  const { setAuth }  = useAuthStore();
  const navigate     = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await authAPI.register({
        name:     data.name,
        email:    data.email,
        password: data.password,
      });
      setAuth({
        user:         res.data.user,
        accessToken:  res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      toast.success(`Welcome, ${res.data.user.name.split(' ')[0]}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) => clsx(
    'input pl-9',
    hasError
      ? 'border-red-500/50 focus:ring-red-500/30'
      : 'border-gray-200 focus:border-brand-600/50 focus:ring-brand-600/20'
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm animate-slide-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center
                          justify-center mb-4 shadow-lg shadow-brand-600/20">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 11L9 16L18 6" stroke="white"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Create account
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Start tracking in under a minute
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6
                        shadow-lg shadow-gray-200/60">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5
                                 uppercase tracking-wider">Full name</label>
              <div className="relative">
                <User size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  type="text"
                  placeholder="Sachin Singh"
                  autoComplete="name"
                  className={inputClass(!!errors.name)}
                  {...register('name', {
                    required:  'Name is required',
                    minLength: { value: 2, message: 'Min 2 characters' },
                  })}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5
                                 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputClass(!!errors.email)}
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
                                 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  className={clsx(inputClass(!!errors.password), 'pr-10')}
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

            {/* Confirm password */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5
                                 uppercase tracking-wider">Confirm password</label>
              <div className="relative">
                <Lock size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={inputClass(!!errors.confirmPassword)}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (v) => v === password || 'Passwords do not match',
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
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
                  Create account
                  <ArrowRight size={15}
                    className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login"
              className="text-brand-600 hover:text-brand-500
                         font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          AI-powered job tracking · Built for developers
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
