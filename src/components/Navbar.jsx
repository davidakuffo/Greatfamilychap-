import React, { useState } from 'react'
import assets from '../assets/assets'
import ThemeToggleBtn from './ThemeToggleBtn'

const Navbar = ({theme, setTheme}) => {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isDonatePage = typeof window !== 'undefined' && window.location.pathname === '/donate'

  const handleNavClick = (anchor) => {
    setSidebarOpen(false)
    if (isDonatePage) {
      // Navigate to home page with anchor
      window.location.href = `/${anchor}`
    }
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-12 lg:px-40 py-2 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70'>

    <img src={assets.logo} className='w-32 sm:w-40' alt='' />

    <div className={`text-gray-700 dark:text-white sm:text-sm ${!sidebarOpen ? 'max-sm:w-0 overflow-hidden': 'max-sm:w-60 max-sm:pl-10'} max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-white max-sm:dark:bg-gray-800 max-sm:text-gray-700 max-sm:dark:text-white max-sm:pt-20 max-sm:shadow-2xl flex sm:items-center gap-5 transition-all`}>

      <button 
        onClick={() => setSidebarOpen(false)}
        className='absolute right-4 top-4 sm:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
        aria-label='Close menu'
      >
        <svg className='w-6 h-6 text-gray-700 dark:text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
        </svg>
      </button>

      <a onClick={() => handleNavClick('#hero')} href={isDonatePage ? '/#hero' : '#hero'} className='sm:hover:border-b'>Home</a>
      <a onClick={() => handleNavClick('#about')} href={isDonatePage ? '/#about' : '#about'} className='sm:hover:border-b'>About Us</a>
      <a onClick={() => handleNavClick('#events')} href={isDonatePage ? '/#events' : '#events'} className='sm:hover:border-b'>Events</a>
      <a onClick={() => handleNavClick('#services')} href={isDonatePage ? '/#services' : '#services'} className='sm:hover:border-b'>Services</a>
      <a onClick={() => handleNavClick('#contact')} href={isDonatePage ? '/#contact' : '#contact'} className='sm:hover:border-b'>Contact Us</a>
    </div>

    <div className='flex items-center gap-2 sm:gap-4'>

      <ThemeToggleBtn theme={theme} setTheme={setTheme} />
    <img src={theme === 'dark' ? assets.menu_icon_dark: assets.menu_icon} alt='' onClick={()=> setSidebarOpen(true)} className='w-8 sm:hidden' />


      <a href='/donate' onClick={()=> setSidebarOpen(false)} className='text-sm max-sm:hidden flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full cursor-pointer hover:scale-103 transition-all'>
        Donate <img src={assets.arrow_icon} width={14} alt=''/>
      </a>
    </div>

    </div>
  )
}

export default Navbar