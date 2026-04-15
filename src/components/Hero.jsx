import React from 'react'
import { motion } from 'framer-motion'
import assets from '../assets/assets'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const Hero = () => {
  return (
    <div
      id='hero'
      className='relative flex flex-col items-center justify-center gap-6 py-32 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'
    >
      {/* Background Image - Light Mode */}
      <motion.div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 dark:opacity-0 transition-opacity duration-300'
        style={{ backgroundImage: `url(${assets.img_8872})` }}
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      >
        <div className='absolute inset-0 bg-white/40' />
      </motion.div>

      {/* Background Image - Dark Mode */}
      <motion.div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 dark:opacity-100 transition-opacity duration-300'
        style={{ backgroundImage: `url(${assets.img_8868})` }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      >
        <div className='absolute inset-0 bg-gray-900/70' />
      </motion.div>

      {/* Subtle animated shimmer line across the top */}
      <motion.div
        className='absolute top-0 left-0 h-1 bg-secondary'
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.4, delay: 0.5, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className='relative z-10 flex flex-col items-center gap-8'
        variants={staggerContainer}
        initial='hidden'
        animate='visible'
      >
        {/* Small label above heading */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className='text-sm font-semibold uppercase tracking-[0.35em] text-secondary'
        >
          Welcome To
        </motion.p>

        {/* Main Heading — each word animates in */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white leading-tight max-w-5xl transition-colors duration-300'
        >
          Great Family Chapel
        </motion.h1>

        {/* Animated underline */}
        <motion.div
          className='h-1 w-24 bg-secondary'
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
          style={{ originX: 0.5 }}
        />

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className='text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-2xl transition-colors duration-300'
        >
          Join us in worship and fellowship as we grow together in faith and love
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className='flex flex-col sm:flex-row gap-4 mt-4'
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <motion.a
            href='#about'
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className='px-8 py-4 bg-primary text-accent font-semibold rounded-lg shadow-lg hover:shadow-xl text-center'
          >
            Explore
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className='text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400'>
          Scroll
        </span>
        <motion.div
          className='w-px h-10 bg-secondary origin-top'
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}

export default Hero