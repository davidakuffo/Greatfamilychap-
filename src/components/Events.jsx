import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Trash2, Plus, LogOut } from 'lucide-react';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [events, setEvents] = useState([]);
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: 'worship',
    description: '',
    attendees: '',
    image: null
  });

  const ADMIN_PASSWORD = 'admin123'; // Change this to your desired admin password

  const defaultEvents = [
    {
      id: 1,
      title: 'Sunday Worship Service',
      date: '2025-01-05',
      time: '9:00 AM & 11:00 AM',
      location: 'Main Sanctuary',
      category: 'worship',
      description: 'Join us for inspiring worship, powerful teaching, and community fellowship.',
      attendees: '200+',
      image: null
    },
    {
      id: 2,
      title: 'Youth Night',
      date: '2025-01-10',
      time: '6:00 PM',
      location: 'Youth Center',
      category: 'youth',
      description: 'An evening of worship, games, and Bible study for ages 13-18.',
      attendees: '50+',
      image: null
    },
    {
      id: 3,
      title: 'Prayer Meeting',
      date: '2025-01-12',
      time: '7:00 PM',
      location: 'Prayer Room',
      category: 'prayer',
      description: 'Come together as we lift our prayers and seek God\'s presence.',
      attendees: '30+',
      image: null
    },
    {
      id: 4,
      title: 'Community Outreach',
      date: '2025-01-15',
      time: '10:00 AM',
      location: 'City Center',
      category: 'outreach',
      description: 'Serving our community with love through food distribution and care.',
      attendees: '40+',
      image: null
    },
    {
      id: 5,
      title: 'Bible Study',
      date: '2025-01-17',
      time: '7:30 PM',
      location: 'Fellowship Hall',
      category: 'study',
      description: 'Deep dive into God\'s Word with teaching and group discussion.',
      attendees: '35+',
      image: null
    },
    {
      id: 6,
      title: 'Women\'s Conference',
      date: '2025-01-20',
      time: '9:00 AM',
      location: 'Main Sanctuary',
      category: 'special',
      description: 'A day of empowerment, worship, and sisterhood in Christ.',
      attendees: '100+',
      image: null
    }
  ];

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'worship', label: 'Worship' },
    { id: 'youth', label: 'Youth' },
    { id: 'prayer', label: 'Prayer' },
    { id: 'outreach', label: 'Outreach' },
    { id: 'study', label: 'Study' },
    { id: 'special', label: 'Special Events' }
  ];

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('gfc_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      setEvents(defaultEvents);
      localStorage.setItem('gfc_events', JSON.stringify(defaultEvents));
    }
  }, []);

  // Hidden keyboard shortcut for admin login (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        const pwd = prompt('Enter admin password:');
        if (pwd) {
          if (pwd === ADMIN_PASSWORD) {
            setIsAdmin(true);
          } else {
            alert('Incorrect password');
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('gfc_events', JSON.stringify(events));
    }
  }, [events]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
      setAdminPassword('');
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) {
      alert('Please fill in all required fields');
      return;
    }
    const eventToAdd = {
      ...newEvent,
      id: Math.max(...events.map(e => e.id), 0) + 1
    };
    setEvents([...events, eventToAdd]);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      category: 'worship',
      description: '',
      attendees: '',
      image: null
    });
    setShowNewEventForm(false);
    alert('Event added successfully!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent({...newEvent, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
      alert('Event deleted successfully!');
    }
  };

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.category === activeFilter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString().split('T')[0];
  };

  const getDateRangeDisplay = () => {
    const min = new Date(getMinDate());
    const max = new Date(getMaxDate());
    return `${min.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${max.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  // Admin Login UI
  if (!isAdmin) {
    return (
      <div id='events' className='py-20 px-4 sm:px-12 lg:px-24 xl:px-40 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
              Upcoming Events
            </h2>
            <p className='text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg'>
              Join us for worship, fellowship, and community. Everyone is welcome!
            </p>
          </div>

          {/* Filter Buttons */}
          <div className='flex flex-wrap justify-center gap-3 mb-12'>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2'
              >
                {/* Event Image */}
                {event.image && (
                  <div className='relative w-full h-48 overflow-hidden bg-gray-200 dark:bg-gray-700'>
                    <img src={event.image} alt={event.title} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300' />
                  </div>
                )}
                
                <div className={`${event.image ? 'bg-gradient-to-r from-blue-500 to-purple-600 p-6' : 'bg-gradient-to-r from-blue-500 to-purple-600 p-6'} text-white`}>
                  <h3 className='text-2xl font-bold mb-2'>{event.title}</h3>
                  <div className='flex items-center gap-2 text-blue-50'>
                    <Users size={16} />
                    <span className='text-sm'>{event.attendees} expected</span>
                  </div>
                </div>
                
                <div className='p-6'>
                  <p className='text-gray-600 dark:text-gray-300 mb-4 leading-relaxed'>
                    {event.description}
                  </p>
                  
                  <div className='space-y-3'>
                    <div className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                      <Calendar className='flex-shrink-0 mt-1 text-blue-600 dark:text-blue-400' size={18} />
                      <span className='text-sm'>{formatDate(event.date)}</span>
                    </div>
                    
                    <div className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                      <Clock className='flex-shrink-0 mt-1 text-blue-600 dark:text-blue-400' size={18} />
                      <span className='text-sm'>{event.time}</span>
                    </div>
                    
                    <div className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                      <MapPin className='flex-shrink-0 mt-1 text-blue-600 dark:text-blue-400' size={18} />
                      <span className='text-sm'>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-500 dark:text-gray-400 text-lg'>
                No events found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div id='events' className='py-20 px-4 sm:px-12 lg:px-24 xl:px-40 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        {/* Admin Header */}
        <div className='flex justify-between items-center mb-12'>
          <h2 className='text-4xl font-bold text-primary'>Event Management Dashboard</h2>
          <button
            onClick={() => setIsAdmin(false)}
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
                <div>
                  <input
                    type='date'
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    min={getMinDate()}
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                    required
                  />
                  <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>Event dates must be from today onwards</p>
                </div>
                <input
                  type='text'
                  placeholder='Time (e.g., 9:00 AM) *'
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className='px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  required
                />
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
                  {categories.filter(c => c.id !== 'all').map(cat => (
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
              
              {/* Image Upload */}
              <div>
                <label className='block text-gray-700 dark:text-gray-300 font-semibold mb-2'>Event Image</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                />
                {newEvent.image && (
                  <div className='mt-4 relative'>
                    <img src={newEvent.image} alt='Preview' className='w-full h-48 object-cover rounded-lg' />
                    <button
                      type='button'
                      onClick={() => setNewEvent({...newEvent, image: null})}
                      className='absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700'
                    >
                      ✕
                    </button>
                  </div>
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
                <th className='px-6 py-4 text-center'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
              {events.map(event => (
                <tr key={event.id} className='hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
                  <td className='px-6 py-4 text-gray-900 dark:text-white font-semibold'>{event.title}</td>
                  <td className='px-6 py-4 text-gray-700 dark:text-gray-300'>{formatDate(event.date)}</td>
                  <td className='px-6 py-4 text-gray-700 dark:text-gray-300'>{event.time}</td>
                  <td className='px-6 py-4 text-gray-700 dark:text-gray-300'>{event.location}</td>
                  <td className='px-6 py-4'>
                    <span className='px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium'>
                      {categories.find(c => c.id === event.category)?.label}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className='inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all'
                    >
                      <Trash2 size={18} />
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

export default Events;