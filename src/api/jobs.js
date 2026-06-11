import client from './client';

export const jobsAPI = {
  getAll: (params) =>
    client.get('/jobs', { params }),

  getStats: () =>
    client.get('/jobs/stats'),

  getById: (id) =>
    client.get(`/jobs/${id}`),

  create: (data) =>
    client.post('/jobs', data),

  update: (id, data) =>
    client.put(`/jobs/${id}`, data),

  updateStatus: (id, status) =>
    client.patch(`/jobs/${id}/status`, { status }),

  setReminder: (id, reminderDate) =>
    client.patch(`/jobs/${id}/reminder`, { reminderDate }),

  clearReminder: (id) =>
    client.delete(`/jobs/${id}/reminder`),

  delete: (id) =>
    client.delete(`/jobs/${id}`),
};