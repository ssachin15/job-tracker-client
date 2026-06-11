import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Bell, BellOff, Calendar, Building2,
  Clock, CheckCircle, AlertCircle, X, Plus,
} from 'lucide-react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { jobsAPI } from '../../api/jobs';
import { STATUS_COLORS, timeAgo } from '../../utils/jobUtils';
import Button from '../../components/ui/Button';

// ─── Reminder date picker modal ───────────────────────────────────────────────
function ReminderModal({ job, onClose }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const queryClient     = useQueryClient();

  const setMutation = useMutation({
    mutationFn: () => {
      const combined = new Date(`${date}T${time}:00`);
      return jobsAPI.setReminder(job._id, combined.toISOString());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success(`Reminder set for "${job.title}"`);
      onClose();
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || 'Failed to set reminder'),
  });

  // Min date = today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.7)' }}>
      <div className="bg-white border border-gray-200 rounded-2xl
                      w-full max-w-sm animate-slide-up">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-50 border border-brand-200
                            rounded-xl flex items-center justify-center">
              <Bell size={16} className="text-brand-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-900">Set reminder</h3>
              <p className="text-gray-400 text-xs mt-0.5 truncate max-w-40">
                {job.title} at {job.company}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost p-1.5">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div>
            <label className="label">Date</label>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label className="label">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input"
            />
          </div>

          {date && (
            <div className="flex items-center gap-2 p-3 bg-brand-50
                            border border-brand-200 rounded-lg">
              <Calendar size={14} className="text-brand-600" />
              <p className="text-brand-500 text-xs">
                Reminder on {new Date(`${date}T${time}`).toLocaleString('en-US', {
                  weekday: 'short',
                  month:   'short',
                  day:     'numeric',
                  hour:    '2-digit',
                  minute:  '2-digit',
                })}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <Button variant="secondary" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button
              fullWidth
              disabled={!date}
              loading={setMutation.isPending}
              onClick={() => setMutation.mutate()}
            >
              Set reminder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Reminder card ────────────────────────────────────────────────────────────
function ReminderCard({ job, onSetReminder }) {
  const queryClient = useQueryClient();

  const clearMutation = useMutation({
    mutationFn: () => jobsAPI.clearReminder(job._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Reminder cleared');
    },
    onError: () => toast.error('Failed to clear reminder'),
  });

  const hasReminder = !!job.reminderDate;
  const isPast      = hasReminder && new Date(job.reminderDate) < new Date();
  const isSent      = job.reminderSent;

  return (
    <div className={clsx(
      'card-sm transition-all duration-200 hover:border-gray-300',
      isSent     && 'opacity-60',
      isPast && !isSent && 'border-yellow-200'
    )}>
      <div className="flex items-start justify-between gap-3">
        {/* Left */}
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-brand-50 border border-brand-200
                          flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-brand-600 text-sm font-semibold">
              {job.company.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-gray-900 text-sm font-medium truncate">
              {job.title}
            </p>
            <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
              <Building2 size={11} />{job.company}
            </p>

            {/* Status */}
            <span className={clsx(
              'text-xs capitalize mt-1 inline-block',
              STATUS_COLORS[job.status]
            )}>
              {job.status}
            </span>

            {/* Reminder info */}
            {hasReminder && (
              <div className={clsx(
                'flex items-center gap-1.5 mt-2 text-xs',
                isSent
                  ? 'text-gray-400'
                  : isPast
                  ? 'text-yellow-600'
                  : 'text-brand-600'
              )}>
                {isSent ? (
                  <><CheckCircle size={12} /> Reminder sent</>
                ) : isPast ? (
                  <><AlertCircle size={12} /> Overdue</>
                ) : (
                  <><Clock size={12} /></>
                )}
                {!isSent && (
                  <span>
                    {new Date(job.reminderDate).toLocaleString('en-US', {
                      month:  'short',
                      day:    'numeric',
                      hour:   '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
              </div>
            )}

            {!hasReminder && (
              <p className="text-gray-400 text-xs mt-2 flex items-center gap-1">
                <BellOff size={11} /> No reminder set
              </p>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={() => onSetReminder(job)}
            className="btn-ghost p-1.5 text-brand-600 hover:text-brand-500
                       hover:bg-brand-50"
            title="Set reminder"
          >
            <Bell size={15} />
          </button>
          {hasReminder && (
            <button
              onClick={() => clearMutation.mutate()}
              className="btn-ghost p-1.5 text-gray-400 hover:text-red-600
                         hover:bg-red-50"
              title="Clear reminder"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
function RemindersPage() {
  const [modalJob,  setModalJob]  = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const { data, isLoading } = useQuery({
    queryKey: ['reminders'],
    queryFn:  () =>
      jobsAPI.getAll({ limit: 100, sort: '-createdAt' }).then((r) => r.data),
  });

  const allJobs = data?.jobs || [];

  const tabs = [
    {
      key:   'all',
      label: 'All jobs',
      jobs:  allJobs,
    },
    {
      key:   'upcoming',
      label: 'Upcoming',
      jobs:  allJobs.filter(
        (j) =>
          j.reminderDate &&
          !j.reminderSent &&
          new Date(j.reminderDate) >= new Date()
      ),
    },
    {
      key:   'overdue',
      label: 'Overdue',
      jobs:  allJobs.filter(
        (j) =>
          j.reminderDate &&
          !j.reminderSent &&
          new Date(j.reminderDate) < new Date()
      ),
    },
    {
      key:   'sent',
      label: 'Sent',
      jobs:  allJobs.filter((j) => j.reminderSent),
    },
    {
      key:   'none',
      label: 'No reminder',
      jobs:  allJobs.filter((j) => !j.reminderDate),
    },
  ];

  const activeJobs = tabs.find((t) => t.key === activeTab)?.jobs || [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Reminders</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage follow-up reminders for your applications
          </p>
        </div>

        {/* Stats pills */}
        <div className="hidden md:flex items-center gap-2">
          {tabs.slice(1, 4).map((tab) => (
            tab.jobs.length > 0 && (
              <div
                key={tab.key}
                className={clsx(
                  'px-3 py-1 rounded-full text-xs font-medium border',
                  tab.key === 'overdue'
                    ? 'bg-yellow-50 text-yellow-600 border-yellow-200'
                    : tab.key === 'upcoming'
                    ? 'bg-brand-50 text-brand-600 border-brand-200'
                    : 'bg-gray-100 text-gray-500 border-gray-200'
                )}
              >
                {tab.jobs.length} {tab.label.toLowerCase()}
              </div>
            )
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 border border-gray-200
                      rounded-xl p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              activeTab === tab.key
                ? 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            )}
          >
            {tab.label}
            {tab.jobs.length > 0 && (
              <span className={clsx(
                'ml-1.5 px-1.5 py-0.5 rounded-full text-xs',
                activeTab === tab.key
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              )}>
                {tab.jobs.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i}
              className="card-sm h-32 animate-pulse bg-gray-100 border-gray-200" />
          ))}
        </div>
      ) : activeJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center
                          justify-center mb-4">
            <Bell size={24} className="text-gray-400" />
          </div>
          <h3 className="text-gray-600 mb-2">
            {activeTab === 'all'
              ? 'No jobs yet'
              : `No ${tabs.find(t => t.key === activeTab)?.label.toLowerCase()} reminders`}
          </h3>
          <p className="text-gray-400 text-sm">
            {activeTab === 'all'
              ? 'Add jobs first, then set reminders to follow up'
              : 'Switch to "All jobs" to set reminders'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeJobs.map((job) => (
            <ReminderCard
              key={job._id}
              job={job}
              onSetReminder={setModalJob}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalJob && (
        <ReminderModal
          job={modalJob}
          onClose={() => setModalJob(null)}
        />
      )}
    </div>
  );
}

export default RemindersPage;