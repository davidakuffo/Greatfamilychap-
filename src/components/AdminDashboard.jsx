import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import {
  Plus, Pencil, Trash2, LogOut, Upload, X,
  Calendar, Clock, MapPin, Users, ImageIcon, CheckCircle, Mic, Music, FileAudio
} from 'lucide-react';

const CATEGORIES = ['worship','youth','prayer','outreach','study','special'];

const EMPTY_EVENT_FORM = {
  title: '', description: '', start_date: '', end_date: '',
  start_time: '', end_time: '', location: '', category: 'worship',
  attendees: '', image_url: ''
};

const EMPTY_SERMON_FORM = {
  title: '', speaker: '', sermon_date: '', excerpt: '', description: '',
  audio_url: '', video_url: '', image_url: ''
};

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'sermons'
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ===================== EVENTS STATE =====================
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState(EMPTY_EVENT_FORM);
  const [savingEvent, setSavingEvent] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [eventImageFile, setEventImageFile] = useState(null);
  const [eventImagePreview, setEventImagePreview] = useState('');
  const [uploadingEventImage, setUploadingEventImage] = useState(false);
  const eventFileInputRef = useRef();

  // ===================== SERMONS STATE =====================
  const [sermons, setSermons] = useState([]);
  const [sermonsLoading, setSermonsLoading] = useState(true);
  const [showSermonForm, setShowSermonForm] = useState(false);
  const [editingSermon, setEditingSermon] = useState(null);
  const [sermonForm, setSermonForm] = useState(EMPTY_SERMON_FORM);
  const [savingSermon, setSavingSermon] = useState(false);
  const [deletingSermon, setDeletingSermon] = useState(null);
  const [sermonImageFile, setSermonImageFile] = useState(null);
  const [sermonImagePreview, setSermonImagePreview] = useState('');
  const [uploadingSermonImage, setUploadingSermonImage] = useState(false);
  const [sermonAudioFile, setSermonAudioFile] = useState(null);
  const [sermonAudioName, setSermonAudioName] = useState('');
  const [uploadingSermonAudio, setUploadingSermonAudio] = useState(false);
  const sermonFileInputRef = useRef();
  const sermonAudioInputRef = useRef();

  useEffect(() => {
    fetchEvents();
    fetchSermons();
  }, []);

  // ===================== EVENTS LOGIC =====================
  const fetchEvents = async () => {
    setEventsLoading(true);
    const { data, error } = await supabase
      .from('events').select('*').order('start_date', { ascending: true });
    if (!error) setEvents(data || []);
    setEventsLoading(false);
  };

  const handleEventImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast('Image must be under 5MB', 'error'); return; }
    setEventImageFile(file);
    setEventImagePreview(URL.createObjectURL(file));
  };

  const uploadEventImage = async () => {
    if (!eventImageFile) return eventForm.image_url;
    setUploadingEventImage(true);
    const ext = eventImageFile.name.split('.').pop();
    const fileName = `event-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from('event-images').upload(fileName, eventImageFile, { upsert: true });
    setUploadingEventImage(false);
    if (error) { showToast('Image upload failed', 'error'); return eventForm.image_url; }
    const { data } = supabase.storage.from('event-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const openCreateEvent = () => {
    setEditingEvent(null);
    setEventForm(EMPTY_EVENT_FORM);
    setEventImageFile(null);
    setEventImagePreview('');
    setShowEventForm(true);
  };

  const openEditEvent = (event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title || '', description: event.description || '',
      start_date: event.start_date || '', end_date: event.end_date || '',
      start_time: event.start_time || '', end_time: event.end_time || '',
      location: event.location || '', category: event.category || 'worship',
      attendees: event.attendees || '', image_url: event.image_url || ''
    });
    setEventImageFile(null);
    setEventImagePreview(event.image_url || '');
    setShowEventForm(true);
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    setSavingEvent(true);
    const image_url = await uploadEventImage();
    const payload = { ...eventForm, image_url, updated_at: new Date().toISOString() };

    let error;
    if (editingEvent) {
      ({ error } = await supabase.from('events').update(payload).eq('id', editingEvent.id));
    } else {
      ({ error } = await supabase.from('events').insert([payload]));
    }

    setSavingEvent(false);
    if (error) { showToast('Failed to save event', 'error'); return; }
    showToast(editingEvent ? 'Event updated!' : 'Event created!');
    setShowEventForm(false);
    fetchEvents();
  };

  const handleDeleteEvent = async (event) => {
    if (!window.confirm(`Delete "${event.title}"? This cannot be undone.`)) return;
    setDeletingEvent(event.id);
    const { error } = await supabase.from('events').delete().eq('id', event.id);
    setDeletingEvent(null);
    if (error) { showToast('Failed to delete event', 'error'); return; }
    if (event.image_url) {
      const fileName = event.image_url.split('/').pop();
      await supabase.storage.from('event-images').remove([fileName]);
    }
    showToast('Event deleted');
    fetchEvents();
  };

  const categoryColor = (cat) => ({
    worship: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    youth: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    prayer: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
    outreach: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    study: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    special: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  }[cat] || 'bg-gray-100 text-gray-700');

  // ===================== SERMONS LOGIC =====================
  const fetchSermons = async () => {
    setSermonsLoading(true);
    const { data, error } = await supabase
      .from('sermons').select('*').order('sermon_date', { ascending: false });
    if (!error) setSermons(data || []);
    setSermonsLoading(false);
  };

  const handleSermonImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast('Image must be under 5MB', 'error'); return; }
    setSermonImageFile(file);
    setSermonImagePreview(URL.createObjectURL(file));
  };

  const uploadSermonImage = async () => {
    if (!sermonImageFile) return sermonForm.image_url;
    setUploadingSermonImage(true);
    const ext = sermonImageFile.name.split('.').pop();
    const fileName = `sermon-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from('sermon-images').upload(fileName, sermonImageFile, { upsert: true });
    setUploadingSermonImage(false);
    if (error) { showToast('Image upload failed', 'error'); return sermonForm.image_url; }
    const { data } = supabase.storage.from('sermon-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSermonAudioChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) { showToast('Audio must be under 50MB', 'error'); return; }
    const allowed = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/mp4', 'audio/x-m4a', 'audio/aac'];
    if (!allowed.includes(file.type)) { showToast('Please upload an MP3, WAV, M4A, or AAC file', 'error'); return; }
    setSermonAudioFile(file);
    setSermonAudioName(file.name);
  };

  const uploadSermonAudio = async () => {
    if (!sermonAudioFile) return sermonForm.audio_url;
    setUploadingSermonAudio(true);
    const ext = sermonAudioFile.name.split('.').pop();
    const fileName = `sermon-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from('sermon-audio').upload(fileName, sermonAudioFile, { upsert: true });
    setUploadingSermonAudio(false);
    if (error) { showToast('Audio upload failed', 'error'); return sermonForm.audio_url; }
    const { data } = supabase.storage.from('sermon-audio').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const openCreateSermon = () => {
    setEditingSermon(null);
    setSermonForm(EMPTY_SERMON_FORM);
    setSermonImageFile(null);
    setSermonImagePreview('');
    setSermonAudioFile(null);
    setSermonAudioName('');
    setShowSermonForm(true);
  };

  const openEditSermon = (sermon) => {
    setEditingSermon(sermon);
    setSermonForm({
      title: sermon.title || '', speaker: sermon.speaker || '',
      sermon_date: sermon.sermon_date || '', excerpt: sermon.excerpt || '',
      description: sermon.description || '', audio_url: sermon.audio_url || '',
      video_url: sermon.video_url || '', image_url: sermon.image_url || ''
    });
    setSermonImageFile(null);
    setSermonImagePreview(sermon.image_url || '');
    setSermonAudioFile(null);
    setSermonAudioName(sermon.audio_url ? sermon.audio_url.split('/').pop() : '');
    setShowSermonForm(true);
  };

  const handleSaveSermon = async (e) => {
    e.preventDefault();
    setSavingSermon(true);
    const image_url = await uploadSermonImage();
    const audio_url = await uploadSermonAudio();
    const payload = { ...sermonForm, image_url, audio_url, updated_at: new Date().toISOString() };

    let error;
    if (editingSermon) {
      ({ error } = await supabase.from('sermons').update(payload).eq('id', editingSermon.id));
    } else {
      ({ error } = await supabase.from('sermons').insert([payload]));
    }

    setSavingSermon(false);
    if (error) { showToast('Failed to save sermon', 'error'); return; }
    showToast(editingSermon ? 'Sermon updated!' : 'Sermon created!');
    setShowSermonForm(false);
    fetchSermons();
  };

  const handleDeleteSermon = async (sermon) => {
    if (!window.confirm(`Delete "${sermon.title}"? This cannot be undone.`)) return;
    setDeletingSermon(sermon.id);
    const { error } = await supabase.from('sermons').delete().eq('id', sermon.id);
    setDeletingSermon(null);
    if (error) { showToast('Failed to delete sermon', 'error'); return; }
    if (sermon.image_url) {
      const fileName = sermon.image_url.split('/').pop();
      await supabase.storage.from('sermon-images').remove([fileName]);
    }
    if (sermon.audio_url) {
      const fileName = sermon.audio_url.split('/').pop();
      await supabase.storage.from('sermon-audio').remove([fileName]);
    }
    showToast('Sermon deleted');
    fetchSermons();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${
          toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          <CheckCircle size={16} />
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {activeTab === 'events' ? 'Events Dashboard' : 'Sermons Dashboard'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {activeTab === 'events'
              ? `${events.length} event${events.length !== 1 ? 's' : ''} total`
              : `${sermons.length} sermon${sermons.length !== 1 ? 's' : ''} total`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={activeTab === 'events' ? openCreateEvent : openCreateSermon}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
          >
            <Plus size={18} /> {activeTab === 'events' ? 'New Event' : 'New Sermon'}
          </button>
          <button onClick={onLogout}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 px-3 py-2 rounded-xl transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="px-6 pt-4">
        <div className="inline-flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'events'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Calendar size={16} /> Events
          </button>
          <button
            onClick={() => setActiveTab('sermons')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'sermons'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Mic size={16} /> Sermons
          </button>
        </div>
      </div>

      {/* ===================== EVENTS TAB ===================== */}
      {activeTab === 'events' && (
        <div className="p-6">
          {eventsLoading ? (
            <div className="text-center py-20 text-gray-500">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No events yet</p>
              <button onClick={openCreateEvent} className="mt-4 text-blue-600 hover:underline text-sm">Create your first event</button>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {events.map(event => (
                    <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900 dark:text-white">{event.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{event.description}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1.5 mb-1"><Calendar size={13} />{event.start_date}</div>
                        {event.start_time && <div className="flex items-center gap-1.5"><Clock size={13} />{event.start_time}{event.end_time ? ` - ${event.end_time}` : ''}</div>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1.5"><MapPin size={13} />{event.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${categoryColor(event.category)}`}>
                          {event.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {event.image_url
                          ? <img src={event.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          : <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center"><ImageIcon size={16} className="text-gray-400" /></div>
                        }
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditEvent(event)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => handleDeleteEvent(event)} disabled={deletingEvent === event.id}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ===================== SERMONS TAB ===================== */}
      {activeTab === 'sermons' && (
        <div className="p-6">
          {sermonsLoading ? (
            <div className="text-center py-20 text-gray-500">Loading sermons...</div>
          ) : sermons.length === 0 ? (
            <div className="text-center py-20">
              <Mic size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No sermons yet</p>
              <button onClick={openCreateSermon} className="mt-4 text-blue-600 hover:underline text-sm">Create your first sermon</button>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Sermon</th>
                    <th className="px-6 py-4">Speaker</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Audio</th>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {sermons.map(sermon => (
                    <tr key={sermon.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900 dark:text-white">{sermon.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{sermon.excerpt}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1.5"><Users size={13} />{sermon.speaker}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1.5"><Calendar size={13} />{sermon.sermon_date}</div>
                      </td>
                      <td className="px-6 py-4">
                        {sermon.audio_url ? (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-100 dark:bg-green-900/40 dark:text-green-300 px-2.5 py-1 rounded-full w-fit">
                            <Music size={12} /> Uploaded
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {sermon.image_url
                          ? <img src={sermon.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          : <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center"><ImageIcon size={16} className="text-gray-400" /></div>
                        }
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditSermon(sermon)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => handleDeleteSermon(sermon)} disabled={deletingSermon === sermon.id}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ===================== EVENT CREATE / EDIT MODAL ===================== */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button onClick={() => setShowEventForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="px-8 py-6 space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Image</label>
                <div
                  onClick={() => eventFileInputRef.current.click()}
                  className="cursor-pointer border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-blue-400 transition-colors"
                >
                  {eventImagePreview ? (
                    <div className="relative">
                      <img src={eventImagePreview} alt="Preview" className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium">Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-36 flex flex-col items-center justify-center text-gray-400">
                      <Upload size={28} className="mb-2" />
                      <p className="text-sm">Click to upload image</p>
                      <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </div>
                <input ref={eventFileInputRef} type="file" accept="image/*" onChange={handleEventImageChange} className="hidden" />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                <input type="text" required value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Event title" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea rows={3} value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Event description" />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date *</label>
                  <input type="date" required value={eventForm.start_date} onChange={e => setEventForm({...eventForm, start_date: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date *</label>
                  <input type="date" required value={eventForm.end_date} onChange={e => setEventForm({...eventForm, end_date: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Times */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
                  <input type="time" value={eventForm.start_time} onChange={e => setEventForm({...eventForm, start_time: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
                  <input type="time" value={eventForm.end_time} onChange={e => setEventForm({...eventForm, end_time: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Location & Attendees */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  <input type="text" value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Main Sanctuary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expected Attendees</label>
                  <input type="text" value={eventForm.attendees} onChange={e => setEventForm({...eventForm, attendees: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 100+" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
                <select value={eventForm.category} onChange={e => setEventForm({...eventForm, category: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize">
                  {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowEventForm(false)}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={savingEvent || uploadingEventImage}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium transition-colors">
                  {savingEvent || uploadingEventImage ? 'Saving...' : editingEvent ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== SERMON CREATE / EDIT MODAL ===================== */}
      {showSermonForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingSermon ? 'Edit Sermon' : 'Create New Sermon'}
              </h2>
              <button onClick={() => setShowSermonForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSaveSermon} className="px-8 py-6 space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sermon Image</label>
                <div
                  onClick={() => sermonFileInputRef.current.click()}
                  className="cursor-pointer border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-blue-400 transition-colors"
                >
                  {sermonImagePreview ? (
                    <div className="relative">
                      <img src={sermonImagePreview} alt="Preview" className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium">Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-36 flex flex-col items-center justify-center text-gray-400">
                      <Upload size={28} className="mb-2" />
                      <p className="text-sm">Click to upload image</p>
                      <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </div>
                <input ref={sermonFileInputRef} type="file" accept="image/*" onChange={handleSermonImageChange} className="hidden" />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                <input type="text" required value={sermonForm.title} onChange={e => setSermonForm({...sermonForm, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sermon title" />
              </div>

              {/* Speaker & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Speaker</label>
                  <input type="text" value={sermonForm.speaker} onChange={e => setSermonForm({...sermonForm, speaker: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Pastor David Mensah" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date *</label>
                  <input type="date" required value={sermonForm.sermon_date} onChange={e => setSermonForm({...sermonForm, sermon_date: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Excerpt (shown on homepage card)</label>
                <textarea rows={2} value={sermonForm.excerpt} onChange={e => setSermonForm({...sermonForm, excerpt: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Short summary shown on the sermon card" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Description (optional)</label>
                <textarea rows={3} value={sermonForm.description} onChange={e => setSermonForm({...sermonForm, description: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Longer description, e.g. for a dedicated sermon page" />
              </div>

              {/* Audio Upload & Video URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sermon Audio</label>
                <div
                  onClick={() => sermonAudioInputRef.current.click()}
                  className="cursor-pointer border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-blue-400 transition-colors p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <FileAudio size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    {sermonAudioName ? (
                      <>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{sermonAudioName}</p>
                        <p className="text-xs text-gray-400">Click to replace</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to upload audio</p>
                        <p className="text-xs text-gray-400">MP3, WAV, M4A up to 50MB</p>
                      </>
                    )}
                  </div>
                </div>
                <input ref={sermonAudioInputRef} type="file" accept="audio/*" onChange={handleSermonAudioChange} className="hidden" />
                {sermonForm.audio_url && !sermonAudioFile && (
                  <audio controls src={sermonForm.audio_url} className="w-full mt-3 h-10">
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Video URL (optional)</label>
                <input type="url" value={sermonForm.video_url} onChange={e => setSermonForm({...sermonForm, video_url: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="YouTube / Facebook link (if also recorded on video)" />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowSermonForm(false)}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={savingSermon || uploadingSermonImage || uploadingSermonAudio}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium transition-colors">
                  {savingSermon || uploadingSermonImage || uploadingSermonAudio ? 'Saving...' : editingSermon ? 'Save Changes' : 'Create Sermon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;