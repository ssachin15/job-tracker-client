import client from './client';

export const resumeAPI = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return client.post('/resumes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getAll: () =>
    client.get('/resumes'),

  getById: (id) =>
    client.get(`/resumes/${id}`),

  analyze: (id) =>
    client.post(`/resumes/${id}/analyze`),

  getAnalysis: (id) =>
    client.get(`/resumes/${id}/analysis`),

  reanalyze: (id) =>
    client.post(`/resumes/${id}/reanalyze`),

  delete: (id) =>
    client.delete(`/resumes/${id}`),
};