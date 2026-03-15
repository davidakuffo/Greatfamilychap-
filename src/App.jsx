import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About_Us from './components/About_Us'
import Services from './components/Services'
import Contact_Us from './components/contact_Us'
import Footer from './components/Footer'
import Events from './components/Events'
import Donate from './Donate'
const App = () => {

  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  const path = typeof window !== 'undefined' ? window.location.pathname : '/'

  if (path === '/donate') {
    return (
      <div className='dark:bg-black relative'>
        <Donate theme={theme} setTheme={setTheme} />
      </div>
    )
  }

  return (
    <div className='dark:bg-black relative'>
      <Navbar theme={theme} setTheme={setTheme} />
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