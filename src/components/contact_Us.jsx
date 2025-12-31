import React, { useState } from 'react'

const Contact_Us = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData)
    alert('Thank you for reaching out! We will get back to you soon.')
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'></path>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'></path>
        </svg>
      ),
      title: 'Address',
      info: '123 Faith Street, Accra',
      subInfo: 'Greater Accra, Ghana'
    },
    {
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'></path>
        </svg>
      ),
      title: 'Phone',
      info: '+233 24 123 4567',
      subInfo: '+233 20 987 6543'
    },
    {
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
        </svg>
      ),
      title: 'Email',
      info: 'info@greatfamilychapel.org',
      subInfo: 'prayer@greatfamilychapel.org'
    },
    {
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'></path>
        </svg>
      ),
      title: 'Office Hours',
      info: 'Mon - Fri: 9:00 AM - 5:00 PM',
      subInfo: 'Sat: 10:00 AM - 2:00 PM'
    }
  ]

  return (
    <div id='contact' className='bg-white dark:bg-gray-800 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 transition-colors duration-300'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
            Contact Us
          </h2>
          <div className='w-24 h-1 bg-secondary mx-auto mb-6'></div>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            We'd love to hear from you. Reach out to us with any questions or prayer requests
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          {contactInfo.map((item, index) => (
            <div 
              key={index}
              className='bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
            >
              <div className='w-16 h-16 bg-primary text-accent rounded-full flex items-center justify-center mx-auto mb-4'>
                {item.icon}
              </div>
              <h4 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
                {item.title}
              </h4>
              <p className='text-gray-700 dark:text-gray-300 text-sm mb-1'>
                {item.info}
              </p>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                {item.subInfo}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Form and Map */}
        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div className='bg-gray-50 dark:bg-gray-700 p-8 rounded-xl'>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
              Send Us a Message
            </h3>
            <div className='space-y-6'>
              <div>
                <label className='block text-gray-700 dark:text-gray-300 font-semibold mb-2'>
                  Full Name *
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all'
                  placeholder='John Doe'
                />
              </div>

              <div>
                <label className='block text-gray-700 dark:text-gray-300 font-semibold mb-2'>
                  Email Address *
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all'
                  placeholder='john@example.com'
                />
              </div>

              <div>
                <label className='block text-gray-700 dark:text-gray-300 font-semibold mb-2'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all'
                  placeholder='+233 24 123 4567'
                />
              </div>

              <div>
                <label className='block text-gray-700 dark:text-gray-300 font-semibold mb-2'>
                  Subject *
                </label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all'
                  placeholder='Prayer Request / General Inquiry'
                />
              </div>

              <div>
                <label className='block text-gray-700 dark:text-gray-300 font-semibold mb-2'>
                  Message *
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows='5'
                  className='w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all resize-none'
                  placeholder='Your message here...'
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className='w-full px-6 py-4 bg-primary text-accent font-semibold rounded-lg hover:opacity-95 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Map and Additional Info */}
          <div className='space-y-6'>
            {/* Map */}
            <div className='bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden h-96'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3267.1271964008183!2d-0.12078292601520796!3d5.687125594294535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf83026e0aa0b3%3A0x5ea2f3423a267ea7!2sGreat%20Family%20Church%20Nanakrom!5e1!3m2!1sen!2sgh!4v1767171463808!5m2!1sen!2sgh" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                title='Church Location'
              ></iframe>
            </div>

            {/* Social Media */}
            <div className='bg-gray-50 dark:bg-gray-700 p-8 rounded-xl'>
  <h4 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
    Connect With Us
  </h4>
  <p className='text-gray-700 dark:text-gray-300 mb-6'>
    Follow us on social media for updates, events, and inspirational content
  </p>
  <div className='flex gap-4'>
    <a href='#' className='w-12 h-12 bg-primary text-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300'>
      <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'></path>
      </svg>
    </a>
    <a href='#' className='w-12 h-12 bg-primary text-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300'>
      <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'></path>
      </svg>
    </a>
    <a href='#' className='w-12 h-12 bg-primary text-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300'>
      <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'></path>
      </svg>
    </a>
    <a href='#' className='w-12 h-12 bg-primary text-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300'>
      <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'></path>
      </svg>
    </a>
    <a href='#' className='w-12 h-12 bg-primary text-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300'>
      <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z'/>
      </svg>
    </a>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact_Us