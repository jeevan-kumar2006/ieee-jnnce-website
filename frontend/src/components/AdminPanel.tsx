import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminLogin, fetchApplications, addEvent } from '../api';

export default function AdminPanel({ onBack }: { onBack: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'apps' | 'events'>('apps');
  
  const [applications, setApplications] = useState<any[]>([]);
  
  const [eventForm, setEventForm] = useState({ title: '', date: '', desc: '', tag: '' });
  const [file, setFile] = useState<File | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    const res = await adminLogin(password);
    
    if (res.success) {
      setIsLoggedIn(true);
      loadApplications();
    } else {
      // Shows "Incorrect password" OR "Network Error" depending on what api/index.ts returned
      setError(res.error === "Network Error" ? "Cannot connect to server." : "Incorrect password.");
    }
  };

  const loadApplications = async () => {
    const data = await fetchApplications();
    setApplications(data);
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', eventForm.title);
    formData.append('date', eventForm.date);
    formData.append('desc', eventForm.desc);
    formData.append('tag', eventForm.tag);
    if (file) formData.append('brochure', file);

    await addEvent(formData);
    setSuccessMsg('Event added successfully!');
    setEventForm({ title: '', date: '', desc: '', tag: '' });
    setFile(null);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin} className="p-8 bg-gray-50 rounded-2xl border border-gray-200 w-96">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h2>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          
          <div className="relative mb-4">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter Admin Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600">Unlock Dashboard</button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button onClick={onBack} className="text-gray-500 hover:text-gray-900 border border-gray-300 px-4 py-2 rounded-lg hover:bg-white transition-colors">Back to Site</button>
        </div>

        <div className="flex gap-4 mb-8">
          <button onClick={() => setTab('apps')} className={`px-6 py-2 rounded-lg font-medium transition-colors ${tab === 'apps' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Applications</button>
          <button onClick={() => setTab('events')} className={`px-6 py-2 rounded-lg font-medium transition-colors ${tab === 'events' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Add Event</button>
        </div>

        {successMsg && <motion.div initial={{opacity:0}} animate={{opacity:1}} className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-xl mb-6">{successMsg}</motion.div>}

        {tab === 'apps' && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="p-4 text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="p-4 text-xs font-medium text-gray-500 uppercase">Dept / Year</th>
                  <th className="p-4 text-xs font-medium text-gray-500 uppercase">Message</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 ? <tr><td colSpan={4} className="p-8 text-center text-gray-400">No applications yet</td></tr> : 
                applications.map((app, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    <td className="p-4 text-gray-900 font-medium">{app.name}</td>
                    <td className="p-4 text-gray-500">{app.email}</td>
                    <td className="p-4 text-gray-500">{app.dept} / {app.year}</td>
                    <td className="p-4 text-gray-500 text-sm max-w-xs truncate">{app.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'events' && (
          <form onSubmit={handleAddEvent} className="bg-white p-8 rounded-2xl border border-gray-200 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Event Title" required value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Date (e.g., Oct 15, 2024)" required value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <input type="text" placeholder="Tag (e.g., Workshop, Hackathon)" required value={eventForm.tag} onChange={e => setEventForm({...eventForm, tag: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea placeholder="Description" required rows={3} value={eventForm.desc} onChange={e => setEventForm({...eventForm, desc: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brochure / Rulebook (Optional)</label>
              <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors">Add Event</button>
          </form>
        )}
      </div>
    </div>
  );
}
