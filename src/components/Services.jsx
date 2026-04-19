import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import prophetic_service from '../assets/prophetic_service.jpeg'
import commanding_morning from '../assets/commanding_morning.jpeg'
import destiny_encounter from '../assets/destiny_encounter.jpeg'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

const Services = () => {
  const [previewSrc, setPreviewSrc] = useState(null)
  const [previewAlt, setPreviewAlt] = useState('')

  const openPreview = (src, alt) => {
    setPreviewSrc(src)
    setPreviewAlt(alt)
  }

  const closePreview = () => {
    setPreviewSrc(null)
    setPreviewAlt('')
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closePreview()
    }
    if (previewSrc) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [previewSrc])

  const services = [
    {
      day: 'Tuesday',
      title: 'Commanding The Morning',
      time: '6:30 AM - 8:30 AM',
      description: "Join us for an evening of powerful prayer, in-depth Bible study, and spiritual growth. A time to deepen your understanding of God's Word.",
      image: commanding_morning,
      color: 'blue',
    },
    {
      day: 'Friday',
      title: 'Prophetic Service',
      time: '7:30 AM - 11:00 AM',
      description: 'Experience the presence of God in our Friday revival service. Come for worship, testimonies, and powerful ministration that will renew your spirit.',
      image: prophetic_service,
      color: 'orange',
    },
    {
      day: 'Sunday',
      title: 'Destiny Encounter Service',
      time: '6:30 AM - 10:30 AM',
      description: "Our main Sunday service featuring vibrant worship, inspiring preaching, and fellowship. Bring the whole family for a powerful time in God's presence.",
      image: destiny_encounter,
      color: 'purple',
    },
  ]

  const getColorClasses = (color) => {
    switch (color) {
      case 'orange':
        return { bg: 'bg-amber-500 text-accent', icon: 'text-amber-500', accent: 'bg-secondary' }
      case 'purple':
        return { bg: 'bg-violet-500 text-accent', icon: 'text-violet-500', accent: 'bg-secondary' }
      default:
        return { bg: 'bg-primary text-accent', icon: 'text-accent', accent: 'bg-secondary' }
    }
  }

  const socialLinks = [
    {
      href: 'https://www.facebook.com/greatfamilychapel/',
      label: 'Facebook',
      icon: <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />,
    },
    {
      href: 'https://www.youtube.com/@greatfamilychapel91',
      label: 'YouTube',
      icon: <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />,
    },
    {
      href: 'https://www.tiktok.com/@greatfamilychapel',
      label: 'TikTok',
      icon: <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z' />,
    },
    {
      href: 'https://zeno.fm/radio/greatness-radio/',
      label: 'Radio',
      icon: <path d='M20 6h-8l8-6v6zm0 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />,
    },
  ]

  return (
    <div
      id='services'
      className='bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 transition-colors duration-300'
    >
      <div className='max-w-7xl mx-auto'>

        {/* ── Section Header ── */}
        <motion.div
          className='text-center mb-16'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4'
          >
            Our Services
          </motion.h2>

          <motion.div
            className='w-24 h-1 bg-secondary mx-auto mb-6'
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ originX: 0.5 }}
          />

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
          >
            Join us throughout the week for worship, prayer, and fellowship
          </motion.p>
        </motion.div>

        {/* ── Services Grid ── */}
        <motion.div
          className='grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => {
            const colors = getColorClasses(service.color)
            return (
              <motion.div
                key={index}
                variants={cardVariant}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
                className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group cursor-default'
              >
                {/* Animated accent bar */}
                <motion.div
                  className={`h-2 ${colors.accent}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ originX: 0 }}
                />

                {/* Image with zoom on hover */}
                {service.image && (
                  <div
                    className='w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer'
                    onClick={() => openPreview(service.image, service.title)}
                  >
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className='w-full h-full object-cover object-center'
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                )}

                {/* Card Content */}
                <div className='p-8'>

                  {/* Day Badge */}
                  <motion.div
                    className='mb-4'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  >
                    <span className={`inline-block px-4 py-1 ${colors.bg} text-detail text-sm font-semibold rounded-full`}>
                      {service.day}
                    </span>
                  </motion.div>

                  <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
                    {service.title}
                  </h3>

                  {/* Clock icon + time */}
                  <p className='text-gray-600 dark:text-gray-400 font-semibold mb-4 flex items-center gap-2'>
                    <motion.svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </motion.svg>
                    {service.time}
                  </p>

                  <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-6'>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── Call to Action ── */}
        <motion.div
          className='mt-16 text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg'
          variants={scaleIn}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.h3
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='text-2xl font-bold text-gray-900 dark:text-white mb-4'
          >
            Can't Make It In Person?
          </motion.h3>

          <motion.p
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='text-gray-600 dark:text-gray-300 mb-8'
          >
            Join us online via our live stream for all services
          </motion.p>

          {/* Social buttons with stagger */}
          <motion.div
            className='flex flex-col sm:flex-row justify-center items-center gap-6'
            variants={staggerContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                variants={fadeUp}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className='flex items-center gap-3 px-8 py-4 bg-primary text-accent font-semibold rounded-lg shadow-lg transition-colors duration-300'
              >
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                  {link.icon}
                </svg>
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Image Preview Modal ── */}
      <AnimatePresence>
        {previewSrc && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closePreview}
          >
            <motion.div
              className='relative w-full max-w-4xl rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-2xl'
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={closePreview}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className='absolute top-4 right-4 z-10 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-gray-900 dark:bg-gray-950 dark:text-white'
              >
                ×
              </motion.button>
              <img
                src={previewSrc}
                alt={previewAlt}
                className='w-full max-h-[80vh] object-contain bg-black'
              />
              <motion.div
                className='p-6 text-center bg-gray-50 dark:bg-gray-950'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {previewAlt}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Services