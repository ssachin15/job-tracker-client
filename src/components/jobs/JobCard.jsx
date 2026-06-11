import {
  MapPin, DollarSign, Clock,
  Edit2, Trash2, ExternalLink, ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { jobsAPI } from '../../api/jobs';
import {
  JOB_STATUSES, STATUS_COLORS,
  formatSalary, timeAgo,
} from '../../utils/jobUtils';
import { getCompanyColor } from '../../utils/colorUtils';

const STATUS_DOT = {
  saved:     'bg-gray-400',
  applied:   'bg-blue-500',
  interview: 'bg-yellow-500',
  offer:     'bg-green-500',
  rejected:  'bg-red-500',
  withdrawn: 'bg-gray-400',
};

function JobCard({ job, onEdit }) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const queryClient  = useQueryClient();
  const companyColor = getCompanyColor(job.company);

  const deleteMutation = useMutation({
    mutationFn: () => jobsAPI.delete(job._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobStats'] });
      queryClient.invalidateQueries({ queryKey: ['recentJobs'] });
      toast.success('Job removed');
    },
    onError: () => toast.error('Failed to delete'),
  });

  const statusMutation = useMutation({
    mutationFn: (status) => jobsAPI.updateStatus(job._id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobStats'] });
      queryClient.invalidateQueries({ queryKey: ['recentJobs'] });
      setShowStatusMenu(false);
    },
    onError: () => toast.error('Failed to update status'),
  });

  const handleDelete = () => {
    if (window.confirm(`Remove "${job.title}" at ${job.company}?`)) {
      deleteMutation.mutate();
    }
  };

  const salary = formatSalary(job.salary);

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-4
                    hover:border-gray-300 hover:-translate-y-0.5
                    transition-all duration-200 cursor-default">

      {/* Top: company avatar + title + actions */}
      <div className="flex items-start gap-3 mb-3">
        <div className={clsx(
          'w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0',
          'text-sm font-bold transition-transform duration-200 group-hover:scale-105',
          companyColor.bg, companyColor.text, companyColor.border
        )}>
          {job.company.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-gray-900 font-semibold text-sm leading-tight truncate">
            {job.title}
          </h4>
          <p className="text-gray-500 text-xs mt-0.5 truncate">
            {job.company}
          </p>
        </div>

        {/* Action buttons — visible on hover */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100
                        transition-opacity duration-150">
         {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
className="w-7 h-7 flex items-center justify-center rounded-lg
                        text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={13} />
            </a>
          )} 
          <button
            onClick={() => onEdit(job)}
            className="w-7 h-7 flex items-center justify-center rounded-lg
                       text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
          >
            <Edit2 size={13} />
          </button>
          <button
            onClick={handleDelete}
            className="w-7 h-7 flex items-center justify-center rounded-lg
                       text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Meta chips */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.location && (
          <span className="flex items-center gap-1 text-xs text-gray-500
                           bg-gray-100 px-2 py-0.5 rounded-full">
            <MapPin size={10} />{job.location}
          </span>
        )}
        {salary && (
          <span className="flex items-center gap-1 text-xs text-green-600
                           bg-green-50 px-2 py-0.5 rounded-full">
            <DollarSign size={10} />{salary}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-gray-400
                         bg-gray-50 px-2 py-0.5 rounded-full ml-auto">
          <Clock size={10} />{timeAgo(job.createdAt)}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-3" />

      {/* Status selector */}
      <div className="relative flex items-center justify-between">
        <button
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          className={clsx(
            'flex items-center gap-2 text-xs font-medium',
            'px-2.5 py-1 rounded-full border transition-all duration-150',
            'hover:bg-gray-50',
            STATUS_COLORS[job.status],
            'border-current/20'
          )}
        >
          <span className={clsx(
            'w-1.5 h-1.5 rounded-full flex-shrink-0',
            STATUS_DOT[job.status]
          )} />
          <span className="capitalize">{job.status}</span>
          <ChevronDown
            size={11}
            className={clsx(
              'transition-transform duration-150',
              showStatusMenu && 'rotate-180'
            )}
          />
        </button>

        {/* Notes preview */}
        {job.notes && !showStatusMenu && (
          <p className="text-gray-400 text-xs truncate max-w-28 italic">
            {job.notes}
          </p>
        )}

        {/* Status dropdown */}
        {showStatusMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowStatusMenu(false)}
            />
            <div className="absolute bottom-8 left-0 z-20 bg-white
                            border border-gray-200 rounded-xl shadow-lg
                            overflow-hidden min-w-36 animate-pop-in">
              {JOB_STATUSES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => statusMutation.mutate(s.value)}
                  className={clsx(
                    'w-full flex items-center gap-2.5 px-3 py-2 text-xs',
                    'hover:bg-gray-100 transition-colors',
                    job.status === s.value
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-500'
                  )}
                >
                  <span className={clsx(
                    'w-1.5 h-1.5 rounded-full flex-shrink-0',
                    STATUS_DOT[s.value]
                  )} />
                  {s.label}
                  {job.status === s.value && (
                    <span className="ml-auto text-brand-600 text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default JobCard;