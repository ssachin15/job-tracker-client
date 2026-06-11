export const JOB_STATUSES = [
  { value: 'saved',     label: 'Saved',     color: 'badge-saved'     },
  { value: 'applied',   label: 'Applied',   color: 'badge-applied'   },
  { value: 'interview', label: 'Interview', color: 'badge-interview' },
  { value: 'offer',     label: 'Offer',     color: 'badge-offer'     },
  { value: 'rejected',  label: 'Rejected',  color: 'badge-rejected'  },
  { value: 'withdrawn', label: 'Withdrawn', color: 'badge-withdrawn' },
];

export const STATUS_COLORS = {
  saved:     'text-gray-500',
  applied:   'text-blue-600',
  interview: 'text-yellow-600',
  offer:     'text-green-600',
  rejected:  'text-red-600',
  withdrawn: 'text-gray-400',
};

export const STATUS_BG = {
  saved:     'bg-gray-100',
  applied:   'bg-blue-50',
  interview: 'bg-yellow-50',
  offer:     'bg-green-50',
  rejected:  'bg-red-50',
  withdrawn: 'bg-gray-100',
};

export const formatSalary = (salary) => {
  if (!salary?.min && !salary?.max) return null;
  const fmt = (n) =>
    n >= 1000 ? `${(n / 1000).toFixed(0)}k` : `${n}`;
  const currency = salary.currency || 'USD';
  if (salary.min && salary.max)
    return `${currency} ${fmt(salary.min)} – ${fmt(salary.max)}`;
  if (salary.min) return `${currency} ${fmt(salary.min)}+`;
  return `Up to ${currency} ${fmt(salary.max)}`;
};

export const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7)  return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
};