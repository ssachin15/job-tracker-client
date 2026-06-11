import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
  User, Mail, Lock, Shield,
  CheckCircle, Eye, EyeOff,
} from 'lucide-react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { userAPI } from '../../api/user';
import useAuthStore from '../../store/authStore';
import Input  from '../../components/ui/Input';
import Button from '../../components/ui/Button';

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ icon: Icon, title, description, children }) {
  return (
    <div className="card space-y-5">
      <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
        <div className="w-9 h-9 bg-brand-50 border border-brand-200
                        rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon size={17} className="text-brand-600" />
        </div>
        <div>
          <h3>{title}</h3>
          <p className="text-gray-400 text-xs mt-0.5">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── Profile form ─────────────────────────────────────────────────────────────
function ProfileForm() {
  const { user, updateUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name:  user?.name  || '',
      email: user?.email || '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => userAPI.updateProfile(data),
    onSuccess: (res) => {
      updateUser(res.data.user);
      toast.success('Profile updated successfully');
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || 'Failed to update profile'),
  });

  return (
    <Section
      icon={User}
      title="Profile"
      description="Update your name and email address"
    >
      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className="space-y-4"
      >
        <Input
          label="Full name"
          icon={User}
          placeholder="Your full name"
          error={errors.name?.message}
          {...register('name', {
            required:  'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
        />

        <Input
          label="Email address"
          type="email"
          icon={Mail}
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value:   /^\S+@\S+\.\S+$/,
              message: 'Enter a valid email',
            },
          })}
        />

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            loading={mutation.isPending}
            disabled={!isDirty}
          >
            Save changes
          </Button>
        </div>
      </form>
    </Section>
  );
}

// ─── Password form ────────────────────────────────────────────────────────────
function PasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch('newPassword');

  const mutation = useMutation({
    mutationFn: (data) => userAPI.changePassword(data),
    onSuccess: () => {
      toast.success('Password changed successfully');
      reset();
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || 'Failed to change password'),
  });

  return (
    <Section
      icon={Lock}
      title="Password"
      description="Change your account password"
    >
      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className="space-y-4"
      >
        {/* Current password */}
        <div>
          <label className="label">Current password</label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showCurrent ? 'text' : 'password'}
              placeholder="••••••••"
              className={clsx('input pl-10 pr-10', errors.currentPassword && 'input-error')}
              {...register('currentPassword', {
                required: 'Current password is required',
              })}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New password */}
        <div>
          <label className="label">New password</label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showNew ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              className={clsx('input pl-10 pr-10', errors.newPassword && 'input-error')}
              {...register('newPassword', {
                required:  'New password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
              })}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm new password */}
        <Input
          label="Confirm new password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your new password',
            validate: (v) => v === newPassword || 'Passwords do not match',
          })}
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" loading={mutation.isPending}>
            Change password
          </Button>
        </div>
      </form>
    </Section>
  );
}

// ─── Account info ─────────────────────────────────────────────────────────────
function AccountInfo() {
  const { user } = useAuthStore();

  const stats = [
    { label: 'Account type', value: user?.role || 'user' },
    { label: 'Member since', value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', {
            month: 'long', year: 'numeric',
          })
        : '—'
    },
    { label: 'User ID', value: user?.id
        ? `${user.id.slice(0, 8)}...`
        : '—'
    },
  ];

  return (
    <Section
      icon={Shield}
      title="Account info"
      description="Your account details and status"
    >
      <div className="space-y-3">
        {/* Avatar row */}
        <div className="flex items-center gap-4 p-4 bg-gray-50
                        rounded-xl border border-gray-200">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center
                          justify-center flex-shrink-0">
            <span className="text-white text-xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <p className="text-gray-900 font-semibold">{user?.name}</p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <CheckCircle size={12} className="text-green-600" />
              <span className="text-green-600 text-xs">Active account</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center"
            >
              <p className="text-gray-900 text-sm font-medium capitalize">
                {value}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Main settings page ───────────────────────────────────────────────────────
function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1>Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account preferences
        </p>
      </div>

      <AccountInfo />
      <ProfileForm />
      <PasswordForm />
    </div>
  );
}

export default SettingsPage;