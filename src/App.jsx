import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About_Us from './components/About_Us'
import Services from './components/Services'
import Contact_Us from './components/contact_Us'
import Footer from './components/Footer'
import Events from './components/Events'
import Sermons from './components/Sermons'
import Donate from './Donate'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/Terms_Of_Service'

const App = () => {

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.documentElement.classList.add('dark')
  }, [])

  const path = typeof window !== 'undefined'
    ? decodeURIComponent(window.location.pathname)
    : '/'

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sectionMap = {
      '/Home': 'hero',
      '/about-us': 'about',
      '/Services': 'services',
      '/Sermons': 'sermons',
      '/Events': 'events',
      '/contact-us': 'contact',
    }

    const targetSection = sectionMap[path]
    if (!targetSection) return

    const sectionEl = document.getElementById(targetSection)
    if (sectionEl) {
      requestAnimationFrame(() => {
        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [path])

  if (path === '/donate') {
    return (
      <div className='dark:bg-black relative'>
        <Donate />
      </div>
    )
  }

  if (path === '/privacy-policy') {
    return (
      <div className='dark:bg-black relative'>
        <Navbar />
        <PrivacyPolicy />
        <Footer />
      </div>
    )
  }

  if (path === '/terms-of-service') {
    return (
      <div className='dark:bg-black relative'>
        <Navbar />
        <TermsOfService />
        <Footer />
      </div>
    )
  }

  return (
    <div className='dark:bg-black relative'>
      <Navbar />
      <Hero />
      <About_Us />
      <Services />
      <Sermons />
      <Events />
      <Contact_Us />
      <Footer />
    </div>
  )
}

export default App
