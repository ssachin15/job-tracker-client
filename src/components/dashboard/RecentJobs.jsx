import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const STATUS_BADGE = {
  saved:     'badge-saved',
  applied:   'badge-applied',
  interview: 'badge-interview',
  offer:     'badge-offer',
  rejected:  'badge-rejected',
  withdrawn: 'badge-withdrawn',
};

function RecentJobs({ jobs = [] }) {
  const navigate = useNavigate();

  if (jobs.length === 0) {
    return (
      <div className="card">
        <h3 className="mb-4">Recent applications</h3>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center
                          justify-center mb-3">
            <Building2 size={20} className="text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">No applications yet</p>
          <p className="text-gray-400 text-xs mt-1">
            Add your first job to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3>Recent applications</h3>
        <button
          onClick={() => navigate('/jobs')}
          className="text-brand-600 hover:text-brand-500 text-sm
                     flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job._id}
            onClick={() => navigate('/jobs')}
            className="flex items-center justify-between p-3 rounded-lg
                       bg-gray-50 hover:bg-white border border-gray-200
                       hover:border-gray-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Company initial */}
              <div className="w-9 h-9 rounded-lg bg-brand-50 border border-brand-200
                              flex items-center justify-center flex-shrink-0">
                <span className="text-brand-600 text-sm font-semibold">
                  {job.company.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Job info */}
              <div className="min-w-0">
                <p className="text-gray-900 text-sm font-medium truncate">
                  {job.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-gray-500 text-xs flex items-center gap-1">
                    <Building2 size={11} />
                    {job.company}
                  </span>
                  {job.location && (
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <MapPin size={11} />
                      {job.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 flex-shrink-0 ml-2">
              <span className={clsx('badge capitalize', STATUS_BADGE[job.status])}>
                {job.status}
              </span>
              <ExternalLink
                size={14}
                className="text-gray-400 group-hover:text-gray-600 transition-colors"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentJobs;