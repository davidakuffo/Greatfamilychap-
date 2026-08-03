import React, { useState } from 'react'
import assets from '../assets/assets'

const Navbar = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const currentPath =
    typeof window !== 'undefined'
      ? decodeURIComponent(window.location.pathname)
      : '/'

  const isSubPage =
    currentPath !== '/' &&
    !['/Home', '/about-us', '/Services', '/Sermons', '/Events', '/contact-us'].includes(currentPath)

  const navLinks = [
    { label: 'Home', path: '/Home', section: 'hero' },
    { label: 'About Us', path: '/about-us', section: 'about' },
    { label: 'Services', path: '/Services', section: 'services' },
    { label: 'Sermons', path: '/Sermons', section: 'sermons' },
    { label: 'Events', path: '/Events', section: 'events' },
    { label: 'Contact Us', path: '/contact-us', section: 'contact' },
  ]

  const handleNavClick = (path, section) => {
    setSidebarOpen(false)

    if (isSubPage) {
      window.location.href = path
      return
    }

    window.history.pushState({}, '', path)

    const sectionEl = document.getElementById(section)
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

      {navLinks.map((link) => (
        <a
          key={link.label}
          onClick={(e) => {
            e.preventDefault()
            handleNavClick(link.path, link.section)
          }}
          href={link.path}
          className='sm:hover:border-b'
        >
          {link.label}
        </a>
      ))}

      {/* Mobile Donate button inside sidebar */}
      <a href='/donate' onClick={()=> setSidebarOpen(false)} className='sm:hidden mt-6 w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full cursor-pointer hover:scale-103 transition-all'>
        Donate <img src={assets.arrow_icon} width={14} alt=""/>
      </a>
    </div>

    <div className='flex items-center gap-2 sm:gap-4'>

      <button
        type='button'
        onClick={() => setSidebarOpen(true)}
        className='flex h-10 w-10 items-center justify-center rounded-full text-gray-800 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 sm:hidden'
        aria-label='Open menu'
      >
        <svg className='h-7 w-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
        </svg>
      </button>


      <a href='/donate' onClick={()=> setSidebarOpen(false)} className='text-sm max-sm:hidden flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full cursor-pointer hover:scale-103 transition-all'>
        Donate <img src={assets.arrow_icon} width={14} alt=''/>
      </a>
    </div>

    </div>
  )
}

export default Navbar
