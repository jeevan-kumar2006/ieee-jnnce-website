import axios from 'axios';
import { Event, ContactData } from '../types';

const API_BASE = 'http://127.0.0.1:5000';

export const fetchEvents = async () => {
  const { data } = await axios.get<Event[]>(`${API_BASE}/events`);
  return data;
};

export const submitContact = async (payload: ContactData) => {
  const { data } = await axios.post(`${API_BASE}/contact`, payload);
  return data;
};
