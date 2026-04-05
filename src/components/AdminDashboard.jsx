import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Calendar, Clock, MapPin, Users, Trash2, Plus, LogOut, Edit, Save, X } from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const [events, setEvents] = useState([]);
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    category: 'worship',
    description: '',
    attendees: '',
    image_url: ''
  });

  const categories = [
    { id: 'worship', label: 'Worship' },
    { id: 'youth', label: 'Youth' },
    { id: 'prayer', label: 'Prayer' },
    { id: 'outreach', label: 'Outreach' },
    { id: 'study', label: 'Study' },
    { id: 'special', label: 'Special Events' }
  ];

  // Fetch events from Supabase
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Error loading events');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.startDate || !newEvent.endDate || !newEvent.startTime || !newEvent.location) {
      alert('Please fill in all required fields');
      return;
    }
    if (newEvent.endDate < newEvent.startDate) {
      alert('End date must be the same as or after the start date');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{
          title: newEvent.title,
          start_date: newEvent.startDate,
          end_date: newEvent.endDate,
          start_time: newEvent.startTime,
          end_time: newEvent.endTime || null,
          location: newEvent.location,
          category: newEvent.category,
          description: newEvent.description,
          attendees: newEvent.attendees,
          image_url: newEvent.image_url || null
        }])
        .select();

      if (error) throw error;

      setEvents([...events, ...data]);
      setNewEvent({
        title: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        location: '',
        category: 'worship',
        description: '',
        attendees: '',
        image_url: ''
      });
      setShowNewEventForm(false);
      alert('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event');
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    if (!editingEvent.title || !editingEvent.start_date || !editingEvent.end_date || !editingEvent.start_time || !editingEvent.location) {
      alert('Please fill in all required fields');
      return;
    }
    if (editingEvent.end_date < editingEvent.start_date) {
      alert('End date must be the same as or after the start date');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .update({
          title: editingEvent.title,
          start_date: editingEvent.start_date,
          end_date: editingEvent.end_date,
          start_time: editingEvent.start_time,
          end_time: editingEvent.end_time || null,
          location: editingEvent.location,
          category: editingEvent.category,
          description: editingEvent.description,
          attendees: editingEvent.attendees,
          image_url: editingEvent.image_url || null
        })
        .eq('id', editingEvent.id)
        .select();

      if (error) throw error;

      setEvents(events.map(event => event.id === editingEvent.id ? data[0] : event));
      setEditingEvent(null);
      alert('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error updating event');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const { error } = await supabase
          .from('events')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setEvents(events.filter(event => event.id !== id));
        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event');
      }
    }
  };

  const handleImageUpload = async (file, isEditForm = false) => {
    if (!file) return;

    try {
      setUploading(true);

      // Create unique filename
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `event-images/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('event-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('event-images')
        .getPublicUrl(filePath);

      const imageUrl = urlData?.publicUrl;

      // Update form state
      if (isEditForm) {
        setEditingEvent({ ...editingEvent, image_url: imageUrl });
      } else {
        setNewEvent({ ...newEvent, image_url: imageUrl });
      }

      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const formatDateRange = (event) => {
    const start = new Date(event.start_date);
    const end = new Date(event.end_date);

    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const formatTimeRange = (event) => {
    if (!event.start_time) return '';
    if (!event.end_time) return event.start_time;

    const formatTime = (timeString) => {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    return `${formatTime(event.start_time)} - ${formatTime(event.end_time)}`;
  };

  if (loading) {
    return (
      <div className="py-20 px-4 sm:px-12 lg:px-24 xl:px-40 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div id='events' className='py-20 px-4 sm:px-12 lg:px-24 xl:px-40 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        {/* Admin Header */}
        <div className='flex justify-between items-center mb-12'>
          <h2 className='text-4xl font-bold text-primary'>Event Management Dashboard</h2>
          <button
            onClick={onLogout}
            className='flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all'
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Add Event Button */}
        <div className='mb-8'>
          <button
            onClick={() => setShowNewEventForm(!showNewEventForm)}
            className='flex items-center gap-2 px-6 py-3 bg-primary text-accent rounded-lg hover:opacity-95 transition-all font-semibold'
          >
            <Plus size={20} />
            Add New Event
          </button>
        </div>

        {/* New Event Form */}
        {showNewEventForm && (
          <div className='bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-12'>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>Create New Event</h3>
            <form onSubmit={handleAddEvent} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <input
                  type='text'
                  placeholder='Event Title *'
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className='px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  required
                />
                <div className='space-y-2'>
                  <div className='flex gap-3'>
                    <div className='w-1/2'>
                      <label className='block text-sm font-medium mb-1'>Start Date *</label>
                      <input
                        type='date'
                        value={newEvent.startDate}
                        onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                        required
                      />
                    </div>
                    <div className='w-1/2'>
                      <label className='block text-sm font-medium mb-1'>End Date *</label>
                      <input
                        type='date'
                        value={newEvent.endDate}
                        onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                        min={newEvent.startDate || new Date().toISOString().split('T')[0]}
                        className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <div className='w-1/2'>
                    <label className='block text-sm font-medium mb-1'>Start Time *</label>
                    <input
                      type='time'
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                      required
                    />
                  </div>
                  <div className='w-1/2'>
                    <label className='block text-sm font-medium mb-1'>End Time</label>
                    <input
                      type='time'
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                </div>
                <input
                  type='text'
                  placeholder='Location *'
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className='px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  required
                />
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                  className='px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <input
                  type='text'
                  placeholder='Expected Attendees (e.g., 50+)'
                  value={newEvent.attendees}
                  onChange={(e) => setNewEvent({...newEvent, attendees: e.target.value})}
                  className='px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>
              <textarea
                placeholder='Event Description'
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                rows='4'
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none'
              />
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Event Image</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleImageUpload(e.target.files[0], false);
                    }
                  }}
                  disabled={uploading}
                  className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                />
                {newEvent.image_url && (
                  <img src={newEvent.image_url} alt='Preview' className='w-full h-48 object-cover rounded-lg' />
                )}
              </div>
              <div className='flex gap-4'>
                <button
                  type='submit'
                  className='px-6 py-3 bg-primary text-accent font-semibold rounded-lg hover:opacity-95 transition-all'
                >
                  Add Event
                </button>
                <button
                  type='button'
                  onClick={() => setShowNewEventForm(false)}
                  className='px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Event Form */}
        {editingEvent && (
          <div className='bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-12'>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>Edit Event</h3>
            <form onSubmit={handleUpdateEvent} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <input
                  type='text'
                  placeholder='Event Title *'
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                  className='px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  required
                />
                <div className='space-y-2'>
                  <div className='flex gap-3'>
                    <div className='w-1/2'>
                      <label className='block text-sm font-medium mb-1'>Start Date *</label>
                      <input
                        type='date'
                        value={editingEvent.start_date}
                        onChange={(e) => setEditingEvent({...editingEvent, start_date: e.target.value})}
                        className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                        required
                      />
                    </div>
                    <div className='w-1/2'>
                      <label className='block text-sm font-medium mb-1'>End Date *</label>
                      <input
                        type='date'
                        value={editingEvent.end_date}
                        onChange={(e) => setEditingEvent({...editingEvent, end_date: e.target.value})}
                        className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <div className='w-1/2'>
                    <label className='block text-sm font-medium mb-1'>Start Time *</label>
                    <input
                      type='time'
                      value={editingEvent.start_time}
                      onChange={(e) => setEditingEvent({...editingEvent, start_time: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                      required
                    />
                  </div>
                  <div className='w-1/2'>
                    <label className='block text-sm font-medium mb-1'>End Time</label>
                    <input
                      type='time'
                      value={editingEvent.end_time || ''}
                      onChange={(e) => setEditingEvent({...editingEvent, end_time: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                </div>
                <input
                  type='text'
                  placeholder='Location *'
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                  className='px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  required
                />
                <select
                  value={editingEvent.category}
                  onChange={(e) => setEditingEvent({...editingEvent, category: e.target.value})}
                  className='px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <input
                  type='text'
                  placeholder='Expected Attendees (e.g., 50+)'
                  value={editingEvent.attendees}
                  onChange={(e) => setEditingEvent({...editingEvent, attendees: e.target.value})}
                  className='px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>
              <textarea
                placeholder='Event Description'
                value={editingEvent.description}
                onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                rows='4'
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none'
              />
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Event Image</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleImageUpload(e.target.files[0], true);
                    }
                  }}
                  disabled={uploading}
                  className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                />
                {editingEvent.image_url && (
                  <img src={editingEvent.image_url} alt='Preview' className='w-full h-48 object-cover rounded-lg' />
                )}
              </div>
              <div className='flex gap-4'>
                <button
                  type='submit'
                  className='px-6 py-3 bg-primary text-accent font-semibold rounded-lg hover:opacity-95 transition-all'
                >
                  Update Event
                </button>
                <button
                  type='button'
                  onClick={() => setEditingEvent(null)}
                  className='px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events Management Table */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-primary text-accent'>
              <tr>
                <th className='px-6 py-4 text-left'>Title</th>
                <th className='px-6 py-4 text-left'>Date</th>
                <th className='px-6 py-4 text-left'>Time</th>
                <th className='px-6 py-4 text-left'>Location</th>
                <th className='px-6 py-4 text-left'>Category</th>
                <th className='px-6 py-4 text-left'>Image</th>
                <th className='px-6 py-4 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
              {events.map(event => (
                <tr key={event.id} className='hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
                  <td className='px-6 py-4 text-gray-900 dark:text-white font-semibold'>{event.title}</td>
                  <td className='px-6 py-4 text-gray-700 dark:text-gray-300'>{formatDateRange(event)}</td>
                  <td className='px-6 py-4 text-gray-700 dark:text-gray-300'>{formatTimeRange(event)}</td>
                  <td className='px-6 py-4 text-gray-700 dark:text-gray-300'>{event.location}</td>
                  <td className='px-6 py-4'>
                    <span className='px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium'>
                      {categories.find(c => c.id === event.category)?.label}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    {event.image_url ? (
                      <img src={event.image_url} alt={event.title} className='w-16 h-16 object-cover rounded' />
                    ) : (
                      <span className='text-gray-500 dark:text-gray-400 text-sm'>No image</span>
                    )}
                  </td>
                  <td className='px-6 py-4 text-center space-x-2'>
                    <button
                      onClick={() => setEditingEvent(event)}
                      className='inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all text-sm'
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className='inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-all text-sm'
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {events.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-500 dark:text-gray-400 text-lg'>
              No events yet. Create one to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;