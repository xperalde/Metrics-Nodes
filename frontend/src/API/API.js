import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:23456/api',
});

export const fetchGroups = () => api.get('/groups');
export const fetchMetrics = () => api.get('/metrics');

export default api;
