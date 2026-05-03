import axios from 'axios';
import { Event } from '../types';

// Uses Vite proxy. No need to worry about localhost URLs or CORS anymore.
const API_BASE = '/api';

export const fetchEvents = async () => {
  try {
    const { data } = await axios.get<Event[]>(`${API_BASE}/events`);
    return data;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
};

export const submitApplication = async (payload: any) => {
  try {
    const { data } = await axios.post(`${API_BASE}/apply`, payload);
    return data;
  } catch (error) {
    console.error("Failed to submit application:", error);
    throw error;
  }
};

export const adminLogin = async (password: string) => {
  try {
    const { data } = await axios.post(`${API_BASE}/admin/login`, { password });
    return data;
  } catch (error: any) {
    // If backend returns 401, handle it gracefully
    if (error.response && error.response.status === 401) {
      return { success: false, error: "Unauthorized" };
    }
    // If backend is totally unreachable
    console.error("Login network error:", error);
    return { success: false, error: "Network Error" };
  }
};

export const fetchApplications = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/admin/applications`);
    return data;
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return [];
  }
};

export const addEvent = async (formData: FormData) => {
  try {
    const { data } = await axios.post(`${API_BASE}/admin/events`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  } catch (error) {
    console.error("Failed to add event:", error);
    throw error;
  }
};
