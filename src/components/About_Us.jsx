import React from 'react'
import assets from '../assets/assets'

const About_Us = () => {
  return (
    <div id='about' className='bg-white dark:bg-gray-800 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 transition-colors duration-300'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
            About Us
          </h2>
          <div className='w-24 h-1 bg-secondary mx-auto mb-6'></div>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            A community built on faith, love, and fellowship
          </p>
        </div>

        {/* Main Content Grid */}
        <div className='grid md:grid-cols-2 gap-12 items-center mb-16'>
          {/* Image */}
          <div className='order-2 md:order-1'>
            <img 
              src={assets.img_3I5A9345}
              alt='Church Community'
              className='rounded-lg shadow-xl w-full h-auto object-cover'
            />
          </div>

          {/* Text Content */}
          <div className='order-1 md:order-2 space-y-6'>
            <h3 className='text-3xl font-bold text-gray-900 dark:text-white'>
              Welcome to Great Family Chapel
            </h3>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              For over two decades, Great Family Chapel has been a beacon of hope and faith in our community. We are a diverse family of believers united by our love for God and commitment to serving others.
            </p>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              Our mission is to spread the Gospel, nurture spiritual growth, and create a welcoming environment where everyone can experience God's transformative love.
            </p>
          </div>
        </div>

        {/* Values/Features Grid */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
          {/* Value 1 */}
          <div className='bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center hover:shadow-xl transition-all duration-300'>
            <div className='w-16 h-16 bg-primary text-accent rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-accent' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'></path>
              </svg>
            </div>
            <h4 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
              Bible-Centered Teaching
            </h4>
            <p className='text-gray-600 dark:text-gray-300'>
              We believe in the power of God's Word to transform lives and guide our daily walk with Christ.
            </p>
          </div>

          {/* Value 2 */}
          <div className='bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center hover:shadow-xl transition-all duration-300'>
            <div className='w-16 h-16 bg-primary text-accent rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-accent' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'></path>
              </svg>
            </div>
            <h4 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
              Strong Community
            </h4>
            <p className='text-gray-600 dark:text-gray-300'>
              Building meaningful relationships through fellowship, support groups, and community outreach programs.
            </p>
          </div>

          {/* Value 3 */}
          <div className='bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center hover:shadow-xl transition-all duration-300'>
            <div className='w-16 h-16 bg-primary text-accent rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-accent' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'></path>
              </svg>
            </div>
            <h4 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
              Servant Hearts
            </h4>
            <p className='text-gray-600 dark:text-gray-300'>
              Serving our community with love through missions, charity work, and compassionate care for those in need.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About_Us