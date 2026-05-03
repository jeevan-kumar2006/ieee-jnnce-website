import axios from 'axios';
import { Event } from '../types';

const API_BASE = 'http://127.0.0.1:5000';

export const fetchEvents = async () => {
  const { data } = await axios.get<Event[]>(`${API_BASE}/events`);
  return data;
};

export const submitApplication = async (payload: any) => {
  const { data } = await axios.post(`${API_BASE}/apply`, payload);
  return data;
};

export const adminLogin = async (password: string) => {
  const { data } = await axios.post(`${API_BASE}/admin/login`, { password });
  return data;
};

export const fetchApplications = async () => {
  const { data } = await axios.get(`${API_BASE}/admin/applications`);
  return data;
};

export const addEvent = async (formData: FormData) => {
  const { data } = await axios.post(`${API_BASE}/admin/events`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};
