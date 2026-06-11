import { Search, X } from 'lucide-react';
import clsx from 'clsx';
import { JOB_STATUSES } from '../../utils/jobUtils';

function JobFilters({ filters, onChange }) {
  const handleSearch = (e) => {
    onChange({ ...filters, search: e.target.value, page: 1 });
  };

  const handleStatus = (value) => {
    onChange({
      ...filters,
      status: filters.status === value ? '' : value,
      page: 1,
    });
  };

  const clearFilters = () => {
    onChange({ search: '', status: '', page: 1 });
  };

  const hasFilters = filters.search || filters.status;

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
        <input
          type="text"
          value={filters.search}
          onChange={handleSearch}
          placeholder="Search by title or company..."
          className="input pl-10 w-full"
        />
        {filters.search && (
          <button
            onClick={() => onChange({ ...filters, search: '', page: 1 })}
            className="absolute right-3 top-1/2 -translate-y-1/2
                       text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-gray-400 text-xs">Filter:</span>
        {JOB_STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => handleStatus(s.value)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-medium transition-all',
              filters.status === s.value
                ? 'bg-brand-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900'
            )}
          >
            {s.label}
          </button>
        ))}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1 rounded-full text-xs text-gray-400
                       hover:text-gray-600 flex items-center gap-1 transition-colors"
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default JobFilters;