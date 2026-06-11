import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Briefcase } from 'lucide-react';
import { jobsAPI } from '../../api/jobs';
import JobCard      from '../../components/jobs/JobCard';
import JobFormModal from '../../components/jobs/JobFormModal';
import JobFilters   from '../../components/jobs/JobFilters';
import Button       from '../../components/ui/Button';

function JobsPage() {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    page:   1,
    limit:  12,
    sort:   '-createdAt',
  });
  const [showModal, setShowModal] = useState(false);
  const [editJob,   setEditJob]   = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', filters],
    queryFn:  () => jobsAPI.getAll(filters).then((r) => r.data),
    keepPreviousData: true,
  });

  const jobs       = data?.jobs       || [];
  const pagination = data?.pagination || {};

  const handleEdit = (job) => {
    setEditJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditJob(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>My Jobs</h1>
          <p className="text-gray-500 text-sm mt-1">
            {pagination.total || 0} applications tracked
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Add job
        </Button>
      </div>

      {/* Filters */}
      <JobFilters filters={filters} onChange={setFilters} />

      {/* Jobs grid */}
      {isLoading ? (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
  {jobs.map((job) => (
    <JobCard
      key={job._id}
      job={job}
      onEdit={handleEdit}
    />
  ))}
</div>
     ) : jobs.length === 0 ? (
  <div
    className="flex flex-col items-center justify-center py-24 text-center
               animate-fade-in"
  >
    {/* Illustrated empty state */}
    <div className="relative mb-6">
      <div
        className="w-20 h-20 bg-white border border-gray-200 rounded-2xl
                   flex items-center justify-center"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect
            x="6"
            y="10"
            width="28"
            height="22"
            rx="3"
            stroke="#d1d5db"
            strokeWidth="1.5"
            fill="none"
          />
          <rect
            x="6"
            y="10"
            width="28"
            height="6"
            rx="3"
            fill="#e5e7eb"
            stroke="#d1d5db"
            strokeWidth="1.5"
          />
          <circle cx="10" cy="13" r="1.5" fill="#6366f1" />
          <circle cx="14" cy="13" r="1.5" fill="#d1d5db" />
          <circle cx="18" cy="13" r="1.5" fill="#d1d5db" />
          <path
            d="M12 22h16M12 26h10"
            stroke="#d1d5db"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Floating decoration */}
      <div
        className="absolute -top-2 -right-2 w-6 h-6 bg-brand-50
                   border border-brand-200 rounded-lg flex items-center
                   justify-center animate-pulse-slow"
      >
        <span className="text-brand-600 text-xs">+</span>
      </div>
    </div>

    <h3 className="text-gray-900 font-semibold mb-1">
      {filters.search || filters.status
        ? 'No results found'
        : 'Your job board is empty'}
    </h3>

    <p className="text-gray-400 text-sm max-w-xs mb-6">
      {filters.search || filters.status
        ? `No jobs match "${filters.search || filters.status}". Try different filters.`
        : 'Start tracking your applications. Add your first job and stay on top of your search.'}
    </p>

    {!filters.search && !filters.status && (
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-5 py-2.5 bg-brand-600
                   hover:bg-brand-500 text-white text-sm font-medium
                   rounded-xl transition-all duration-200 hover:-translate-y-0.5"
      >
        <Plus size={16} />
        Add your first job
      </button>
    )}
  </div>
) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="secondary"
            disabled={!pagination.hasPrev}
            onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
          >
            Previous
          </Button>
          <span className="text-gray-500 text-sm px-4">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={!pagination.hasNext}
            onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
          >
            Next
          </Button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <JobFormModal
          job={editJob}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default JobsPage;