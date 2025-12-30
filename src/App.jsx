import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About_Us from './components/About_Us'
import Services from './components/Services'
import Contact_Us from './components/contact_Us'
import Footer from './components/Footer'
import Events from './components/Events'
import Donate from './Donate'
const App = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light ')
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