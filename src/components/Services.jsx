import React, { useEffect, useState } from 'react'
import prophetic_service from '../assets/prophetic_service.jpeg'
import commanding_morning from '../assets/commanding_morning.jpeg'
import destiny_encounter from '../assets/destiny_encounter.jpeg'

const Services = () => {
  const [previewSrc, setPreviewSrc] = useState(null)
  const [previewAlt, setPreviewAlt] = useState('')

  const openPreview = (src, alt) => {
    setPreviewSrc(src)
    setPreviewAlt(alt)
  }

  const closePreview = () => {
    setPreviewSrc(null)
    setPreviewAlt('')
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closePreview()
    }

    if (previewSrc) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [previewSrc])

  const services = [
    {
      day: 'Tuesday',
      title: 'Commanding The Morning',
      time: '6:30 AM - 8:30 AM',
      description: 'Join us for an evening of powerful prayer, in-depth Bible study, and spiritual growth. A time to deepen your understanding of God\'s Word.',
      image: commanding_morning,
      color: 'blue'
    },
    {
      day: 'Friday',
      title: 'Prophetic Service',
      time: '7:30 AM - 11:00 AM',
      description: 'Experience the presence of God in our Friday revival service. Come for worship, testimonies, and powerful ministration that will renew your spirit.',
      image: prophetic_service,
      color: 'orange'
    },
    {
      day: 'Sunday',
      title: 'Destiny Encounter Service',
      time: '6:30 AM - 10:30 AM',
      description: 'Our main Sunday service featuring vibrant worship, inspiring preaching, and fellowship. Bring the whole family for a powerful time in God\'s presence.',
      image: destiny_encounter,
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
        <div className='grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
          {services.map((service, index) => {
            const colors = getColorClasses(service.color)
            return (
              <div 
                key={index}
                className='bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2'
              >
                {/* Color Accent Bar */}
                <div className={`h-2 ${colors.accent}`}></div>

                {/* Image (optional) */}
                {service.image && (
                  <div className='w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900'>
                    <img
                      src={service.image}
                      alt={service.title}
                      className='w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>
                )}

                {/* Card Content */}
                <div className='p-8'>

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
            <a href='https://m.facebook.com/story.php?story_fbid=1250850876925521&id=100064841258423&mibextid=ZbWKwL' target='_blank' rel='noopener noreferrer' className='flex items-center gap-3 px-8 py-4 bg-primary text-accent font-semibold rounded-lg hover:opacity-95 transition-all duration-300 shadow-lg'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'></path>
              </svg>
              Facebook
            </a>
            <a href='https://www.youtube.com/live/jTZcbZJTQcQ' target='_blank' rel='noopener noreferrer' className='flex items-center gap-3 px-8 py-4 bg-primary text-accent font-semibold rounded-lg hover:opacity-95 transition-all duration-300 shadow-lg'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'></path>
              </svg>
              YouTube
            </a>
            <a href='https://www.tiktok.com/@greatfamilychapel/live?_r=1&_svg=1&checksum=a54e9a83c10c9089a56f8484472d03cfd06e907c7df0cb1dfff8d0a775611af3&enter_from_merge=share&enter_method=share&sec_user_id=MS4wLjABAAAAPH7OiyMqj23xroTmG6wUlm-MX0zjtm2mD46iH_rEvqFW6LwbLtf3BU8RAp8V0Usa&share_app_id=1233&share_from_user_id=7530313698004943879&share_link_id=a9c9c2fe-2ea5-4cac-8a68-c773fe3640b8&share_region=GH&social_share_type=10&source=h5_m&timestamp=1771139854&ug_btm=b6880%2Cb4180&ugbiz_name=LIVE&user_id=7530313698004943879&utm_campaign=client_share&utm_medium=android&utm_source=whatsapp' target='_blank' rel='noopener noreferrer' className='flex items-center gap-3 px-8 py-4 bg-primary text-accent font-semibold rounded-lg hover:opacity-95 transition-all duration-300 shadow-lg'>
  <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
    <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z'/>
  </svg>
  TikTok
</a>
<a 
          href='https://zeno.fm/radio/greatness-radio/' 
          target='_blank' 
          rel='noopener noreferrer' 
          className='flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg'
        >
          <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M20 6h-8l8-6v6zm0 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'/>
          </svg>
          Radio
        </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services