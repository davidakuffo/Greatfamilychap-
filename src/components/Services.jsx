import React from 'react'

const Services = () => {
  const services = [
    {
      day: 'Tuesday',
      title: 'Prayer & Bible Study',
      time: '7:00 PM - 9:00 PM',
      description: 'Join us for an evening of powerful prayer, in-depth Bible study, and spiritual growth. A time to deepen your understanding of God\'s Word.',
      icon: (
        <svg className='w-12 h-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'></path>
        </svg>
      ),
      color: 'blue'
    },
    {
      day: 'Friday',
      title: 'Revival Service',
      time: '6:00 PM - 8:30 PM',
      description: 'Experience the presence of God in our Friday revival service. Come for worship, testimonies, and powerful ministration that will renew your spirit.',
      icon: (
        <svg className='w-12 h-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'></path>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z'></path>
        </svg>
      ),
      color: 'orange'
    },
    {
      day: 'Sunday',
      title: 'Main Worship Service',
      time: '9:00 AM - 12:00 PM',
      description: 'Our main Sunday service featuring vibrant worship, inspiring preaching, and fellowship. Bring the whole family for a powerful time in God\'s presence.',
      icon: (
        <svg className='w-12 h-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'></path>
        </svg>
      ),
      color: 'purple'
    }
  ]

  // Use brand colors: primary for icons/buttons, secondary for small accents
  const getColorClasses = (color) => ({
    bg: 'bg-primary text-accent',
    icon: 'text-accent',
    accent: 'bg-secondary'
  })

  return (
    <div id='services' className='bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 transition-colors duration-300'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
            Our Services
          </h2>
          <div className='w-24 h-1 bg-secondary mx-auto mb-6'></div>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Join us throughout the week for worship, prayer, and fellowship
          </p>
        </div>

        {/* Services Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => {
            const colors = getColorClasses(service.color)
            return (
              <div 
                key={index}
                className='bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2'
              >
                {/* Color Accent Bar */}
                <div className={`h-2 ${colors.accent}`}></div>
                
                {/* Card Content */}
                <div className='p-8'>
                  {/* Icon */}
                  <div className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center mb-6 ${colors.icon} group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>

                  {/* Day Badge */}
                  <div className='mb-4'>
                    <span className={`inline-block px-4 py-1 ${colors.accent} text-detail text-sm font-semibold rounded-full`}>
                      {service.day}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
                    {service.title}
                  </h3>

                  {/* Time */}
                  <p className='text-gray-600 dark:text-gray-400 font-semibold mb-4 flex items-center gap-2'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                    </svg>
                    {service.time}
                  </p>

                  {/* Description */}
                  <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-6'>
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className='mt-16 text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg'>
          <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            Can't Make It In Person?
          </h3>
          <p className='text-gray-600 dark:text-gray-300 mb-8'>
            Join us online via our live stream for all services
          </p>
          <div className='flex flex-col sm:flex-row justify-center items-center gap-6'>
            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' className='flex items-center gap-3 px-8 py-4 bg-primary text-accent font-semibold rounded-lg hover:opacity-95 transition-all duration-300 shadow-lg'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'></path>
              </svg>
              Facebook
            </a>
            <a href='https://www.youtube.com' target='_blank' rel='noopener noreferrer' className='flex items-center gap-3 px-8 py-4 bg-primary text-accent font-semibold rounded-lg hover:opacity-95 transition-all duration-300 shadow-lg'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'></path>
              </svg>
              YouTube
            </a>
            <a href='https://www.tiktok.com' target='_blank' rel='noopener noreferrer' className='flex items-center gap-3 px-8 py-4 bg-primary text-accent font-semibold rounded-lg hover:opacity-95 transition-all duration-300 shadow-lg'>
  <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
    <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z'/>
  </svg>
  TikTok
</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services