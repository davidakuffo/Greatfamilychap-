import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import assets from './assets/assets'

const Donate = ({ theme, setTheme }) => {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800'>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className='flex-grow flex items-center justify-center py-12 px-4'>
        <div className='max-w-5xl w-full'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-primary mb-4'>Support Great Family Chapel</h1>
            <p className='text-gray-700 dark:text-gray-300 text-lg'>Your generosity helps us run services, outreach, and ministry programs.</p>
          </div>
          
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden'>
            <img 
              src={assets.ONLINE_PLATFORM} 
              alt='Online Donation Platform' 
              className='w-full h-auto object-cover'
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Donate