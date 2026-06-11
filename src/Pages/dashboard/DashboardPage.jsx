import { useQuery } from '@tanstack/react-query';
import {
  Briefcase, Send, Users, Trophy,
} from 'lucide-react';
import { jobsAPI } from '../../api/jobs';
import useAuthStore from '../../store/authStore';
import StatsCard    from '../../components/ui/StatsCard';
import PipelineChart  from '../../components/dashboard/PipelineChart';
import RecentJobs     from '../../components/dashboard/RecentJobs';
import QuickActions   from '../../components/dashboard/QuickActions';

const DEFAULT_BREAKDOWN = {
  saved: 0, applied: 0, interview: 0,
  offer: 0, rejected: 0, withdrawn: 0,
};

function DashboardPage() {
  const { user } = useAuthStore();

  // Fetch stats
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['jobStats'],
    queryFn:  () => jobsAPI.getStats().then((r) => r.data.stats),
  });

  // Fetch recent jobs
  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ['recentJobs'],
    queryFn:  () =>
      jobsAPI.getAll({ limit: 5, sort: '-createdAt' }).then((r) => r.data),
  });

  const stats     = statsData     || { total: 0, breakdown: DEFAULT_BREAKDOWN };
  const recentJobs = jobsData?.jobs || [];

  const statCards = [
    {
      label: 'Total applications',
      value: statsLoading ? '...' : stats.total,
      icon:  Briefcase,
      color: 'brand',
    },
    {
      label: 'Applied',
      value: statsLoading ? '...' : stats.breakdown.applied,
      icon:  Send,
      color: 'blue',
    },
    {
      label: 'Interviews',
      value: statsLoading ? '...' : stats.breakdown.interview,
      icon:  Users,
      color: 'yellow',
    },
    {
      label: 'Offers',
      value: statsLoading ? '...' : stats.breakdown.offer,
      icon:  Trophy,
      color: 'green',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
    {/* Greeting */}
{(() => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' :
    hour < 17 ? 'Good afternoon' : 'Good evening';

  const dueReminders = (jobsData?.jobs || []).filter(
    (j) => j.reminderDate && !j.reminderSent &&
           new Date(j.reminderDate) < new Date()
  ).length;

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-gray-900">
          {greeting}, {user?.name?.split(' ')[0]} 
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {dueReminders > 0
            ? `You have ${dueReminders} overdue follow-up${dueReminders > 1 ? 's' : ''} — don't let them slip.`
            : stats.total === 0
            ? 'Start tracking your first application today.'
            : `Tracking ${stats.total} application${stats.total > 1 ? 's' : ''}. Keep going.`
          }
        </p>
      </div>
      {/* Today's date */}
      <div className="hidden md:block text-right">
        <p className="text-gray-900 text-sm font-medium">
          {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
        </p>
        <p className="text-gray-400 text-xs">
          {new Date().toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric'
          })}
        </p>
      </div>
    </div>
  );
})()}

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {statCards.map((card) => (
          <StatsCard key={card.label} {...card} />
        ))}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pipeline chart — takes 2 cols */}
        <div className="lg:col-span-2">
          {statsLoading ? (
            <div className="card flex items-center justify-center h-64">
              <div className="spinner w-8 h-8" />
            </div>
          ) : (
            <PipelineChart breakdown={stats.breakdown} />
          )}
        </div>

        {/* Quick actions */}
        <QuickActions />
      </div>

      {/* Recent jobs */}
      {jobsLoading ? (
        <div className="card flex items-center justify-center h-32">
          <div className="spinner w-8 h-8" />
        </div>
      ) : (
        <RecentJobs jobs={recentJobs} />
      )}
    </div>
  );
}

export default DashboardPage;