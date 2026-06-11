import client from './client';

export const authAPI = {
  register: (data) =>
    client.post('/auth/register', data),

  login: (data) =>
    client.post('/auth/login', data),

  logout: () =>
    client.post('/auth/logout'),

  getMe: () =>
    client.get('/auth/me'),

  refresh: (refreshToken) =>
    client.post('/auth/refresh', { refreshToken }),
};