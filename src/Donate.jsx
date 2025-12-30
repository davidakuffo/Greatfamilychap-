import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Donate = ({ theme, setTheme }) => {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800'>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className='flex-grow'>
        <div className='max-w-4xl mx-auto py-24 px-6 text-center'>
        <h1 className='text-4xl font-bold text-primary mb-6'>Support Great Family Chapel</h1>
        <p className='text-gray-700 dark:text-gray-300 mb-8'>Your generosity helps us run services, outreach, and ministry programs. Thank you for partnering with us.</p>

        <div className='space-y-6'>
          <a href='https://example.com/donate' target='_blank' rel='noreferrer' className='inline-block px-8 py-4 bg-primary text-accent rounded-2xl text-lg font-semibold hover:opacity-95'>Give Online</a>

          <div className='text-sm text-gray-600 dark:text-gray-400'>
            <p>Prefer offline giving? Mail checks to:</p>
            <p className='mt-2 font-medium'>Great Family Chapel, 123 Church Street, City, Country</p>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Donate
