import client from './client';

export const userAPI = {
  getMe: () =>
    client.get('/auth/me'),

  updateProfile: (data) =>
    client.put('/auth/profile', data),

  changePassword: (data) =>
    client.put('/auth/password', data),
};