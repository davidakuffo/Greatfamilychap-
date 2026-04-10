import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Events' },
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
    checkAuthStatus();

    const handleHashChange = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || window.location.hash === '#admin') {
        setShowLogin(true);
      } else {
        setShowLogin(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
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
      // Fallback to default events if Supabase fails
      setEvents([
        {
          id: 1,
          title: 'Sunday Worship Service',
          start_date: '2025-01-05',
          end_date: '2025-01-05',
          start_time: '09:00',
          end_time: '11:00',
          location: 'Main Sanctuary',
          category: 'worship',
          description: 'Join us for inspiring worship, powerful teaching, and community fellowship.',
          attendees: '200+',
          image_url: null
        },
        {
          id: 2,
          title: 'Youth Night',
          start_date: '2025-01-10',
          end_date: '2025-01-10',
          start_time: '18:00',
          end_time: '',
          location: 'Youth Center',
          category: 'youth',
          description: 'An evening of worship, games, and Bible study for ages 13-18.',
          attendees: '50+',
          image_url: null
        },
        {
          id: 3,
          title: 'Prayer Meeting',
          start_date: '2025-01-12',
          end_date: '2025-01-12',
          start_time: '19:00',
          end_time: '',
          location: 'Prayer Room',
          category: 'prayer',
          description: 'Come together as we lift our prayers and seek God\'s presence.',
          attendees: '30+',
          image_url: null
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(!!session);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAdmin(false);
    }
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowLogin(false);
  };

  const handleAdminLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAdmin(false);
      fetchEvents(); // Refresh events after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(event => event.category === activeFilter);

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

  // Show admin dashboard if authenticated
  if (isAdmin) {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  // Show loading state
  if (loading) {
    return (
      <div className='py-20 px-4 sm:px-12 lg:px-24 xl:px-40 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen'>
        <div className='max-w-7xl mx-auto text-center'>
          <p className='text-lg'>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div id='events' className='py-20 px-4 sm:px-12 lg:px-24 xl:px-40 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-primary mb-4'>
            Upcoming Events
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Join us for worship services, community events, and special gatherings that bring our church family together.
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
                {event.image_url && (
                  <div className='relative w-full h-48 overflow-hidden bg-gray-200 dark:bg-gray-700'>
                    <img src={event.image_url} alt={event.title} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300' />
                  </div>
                )}
                
                <div className={`${event.image_url ? 'bg-linear-to-r from-blue-500 to-purple-600 p-6' : 'bg-linear-to-r from-blue-500 to-purple-600 p-6'} text-white`}>
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
                      <Calendar className='shrink-0 mt-1 text-blue-600 dark:text-blue-400' size={18} />
                      <span className='text-sm'>{formatDateRange(event)}</span>
                    </div>
                    
                    <div className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                      <Clock className='shrink-0 mt-1 text-blue-600 dark:text-blue-400' size={18} />
                      <span className='text-sm'>{formatTimeRange(event)}</span>
                    </div>
                    
                    <div className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                      <MapPin className='shrink-0 mt-1 text-blue-600 dark:text-blue-400' size={18} />
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

        {/* Admin Login Modal */}
        {showLogin && (
          <AdminLogin
            onLogin={handleAdminLogin}
            onCancel={() => {
              setShowLogin(false);
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Events;