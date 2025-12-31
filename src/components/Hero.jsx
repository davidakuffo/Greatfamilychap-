import React from 'react'
import assets from '../assets/assets'

const Hero = () => {
  return (
    <div 
      id='hero' 
      className='relative flex flex-col items-center justify-center gap-6 py-32 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'
    >
      {/* Background Image with Overlay - Light Mode */}
      <div 
        className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 dark:opacity-0 transition-opacity duration-300'
        style={{
          backgroundImage: `url(${assets.img_8872})`,
        }}
      >
        <div className='absolute inset-0 bg-white/40'></div>
      </div>

      {/* Background Image with Overlay - Dark Mode */}
      <div 
        className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 dark:opacity-100 transition-opacity duration-300'
        style={{
          backgroundImage: `url(${assets.img_8868})`,
        }}
      >
        <div className='absolute inset-0 bg-gray-900/70'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center gap-8'>
        <h1 className='text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white leading-tight max-w-5xl transition-colors duration-300'>
          Welcome To Great Family Chapel
        </h1>
        
        <p className='text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-2xl transition-colors duration-300'>
          Join us in worship and fellowship as we grow together in faith and love
        </p>

        {/* Buttons */}
      <div className='flex flex-col sm:flex-row gap-4 mt-4'>
  <a 
    href='#about' 
    className='px-8 py-4 bg-primary text-accent font-semibold rounded-lg hover:opacity-95 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center'
  >
    Explore
  </a>
          
        </div>
      </div>
    </div>
  )
}

export default Hero