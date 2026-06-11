import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Briefcase, Building2, MapPin, Link, DollarSign } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { jobsAPI } from '../../api/jobs';
import { JOB_STATUSES } from '../../utils/jobUtils';
import Input from '../ui/Input';
import Button from '../ui/Button';
import clsx from 'clsx';

function JobFormModal({ job = null, onClose }) {
  const queryClient = useQueryClient();
  const isEditing   = !!job;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title:    job?.title    || '',
      company:  job?.company  || '',
      location: job?.location || '',
      url:      job?.url      || '',
      status:   job?.status   || 'saved',
      notes:    job?.notes    || '',
      salaryMin: job?.salary?.min || '',
      salaryMax: job?.salary?.max || '',
    },
  });

  useEffect(() => {
    if (job) {
      reset({
        title:    job.title    || '',
        company:  job.company  || '',
        location: job.location || '',
        url:      job.url      || '',
        status:   job.status   || 'saved',
        notes:    job.notes    || '',
        salaryMin: job.salary?.min || '',
        salaryMax: job.salary?.max || '',
      });
    }
  }, [job, reset]);

  const createMutation = useMutation({
    mutationFn: (data) => jobsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobStats'] });
      queryClient.invalidateQueries({ queryKey: ['recentJobs'] });
      toast.success('Job added successfully');
      onClose();
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to add job'),
  });

  const updateMutation = useMutation({
    mutationFn: (data) => jobsAPI.update(job._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobStats'] });
      queryClient.invalidateQueries({ queryKey: ['recentJobs'] });
      toast.success('Job updated successfully');
      onClose();
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update job'),
  });

  const onSubmit = (data) => {
    const payload = {
      title:    data.title.trim(),
      company:  data.company.trim(),
      location: data.location?.trim() || undefined,
      url:      data.url?.trim()      || undefined,
      status:   data.status,
      notes:    data.notes?.trim()    || undefined,
      salary:
        data.salaryMin || data.salaryMax
          ? {
              min:      data.salaryMin ? Number(data.salaryMin) : undefined,
              max:      data.salaryMax ? Number(data.salaryMax) : undefined,
              currency: 'USD',
            }
          : undefined,
    };
    isEditing ? updateMutation.mutate(payload) : createMutation.mutate(payload);
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.7)' }}>
<div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg
                       max-h-[90vh] overflow-y-auto animate-slide-up">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-50 border border-brand-200
                            rounded-xl flex items-center justify-center">
              <Briefcase size={17} className="text-brand-600" />
            </div>
            <h3>{isEditing ? 'Edit job' : 'Add new job'}</h3>
          </div>
          <button onClick={onClose} className="btn-ghost p-1.5">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label="Job title *"
                icon={Briefcase}
                placeholder="Backend Engineer"
                error={errors.title?.message}
                {...register('title', { required: 'Job title is required' })}
              />
            </div>

            <div className="col-span-2">
              <Input
                label="Company *"
                icon={Building2}
                placeholder="Google"
                error={errors.company?.message}
                {...register('company', { required: 'Company is required' })}
              />
            </div>

            <Input
              label="Location"
              icon={MapPin}
              placeholder="Remote"
              {...register('location')}
            />

            {/* Status */}
            <div>
              <label className="label">Status</label>
              <select
                className="input"
                {...register('status')}
              >
                {JOB_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <Input
                label="Job URL"
                icon={Link}
                placeholder="https://careers.company.com/..."
                {...register('url')}
              />
            </div>

            {/* Salary */}
            <div>
              <label className="label">Min salary</label>
              <div className="relative">
                <DollarSign size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  type="number"
                  placeholder="80000"
                  className="input pl-10"
                  {...register('salaryMin')}
                />
              </div>
            </div>

            <div>
              <label className="label">Max salary</label>
              <div className="relative">
                <DollarSign size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  type="number"
                  placeholder="120000"
                  className="input pl-10"
                  {...register('salaryMax')}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="col-span-2">
              <label className="label">Notes</label>
              <textarea
                rows={3}
                placeholder="Add any notes about this application..."
                className="input resize-none"
                {...register('notes')}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              type="button"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              fullWidth
              loading={isLoading}
            >
              {isEditing ? 'Save changes' : 'Add job'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobFormModal;