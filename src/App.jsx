import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About_Us from './components/About_Us'
import Services from './components/Services'
import Contact_Us from './components/contact_Us'
import Footer from './components/Footer'
import Events from './components/Events'
import Donate from './Donate'

const App = () => {

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.documentElement.classList.add('dark')
  }, [])

  const path = typeof window !== 'undefined' ? window.location.pathname : '/'

  if (path === '/donate') {
    return (
      <div className='dark:bg-black relative'>
        <Donate />
      </div>
    )
  }

  return (
    <div className='dark:bg-black relative'>
      <Navbar />
      <Hero />
      <About_Us />
      <Services />
      <Events />
      <Contact_Us />
      <Footer />
    </div>
  )
}

export default App