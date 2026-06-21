import React from 'react'
import { motion } from 'framer-motion'
import assets from '../assets/assets'

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const About_Us = () => {
  const historyIntro = [
    'Great Family Chapel began in 2005 in Ashalley Botwe Old Town, a suburb of Accra, as a small fellowship that steadily grew into the church family it is today.',
    'Founded through the mandate given to Apostle Emmanuel Yaw Asare, the ministry was established to win souls, bring revival, and help people discover and fulfill their God-given destiny.',
  ]

  const historyDetails = [
    'The church first started with four people: the Man of God, his wife, and two other family members. As God confirmed His word through signs, wonders, and transformed lives, the fellowship continued to grow in strength and impact.',
    'Over the years, the fellowship moved through different locations around Madina and Ashalley Botwe before becoming a complete church. Since 2015, Great Family Chapel has met in Zion Temple near Melcom Nana Junction, Ashalley Botwe, Accra.',
    'Today, by the grace of God, the ministry has grown into a thriving church with branches in Oyibi, with more branches expected to emerge. The church is known for the depth of the Word, the move of the Spirit, and the love shown to every person who walks through its doors.',
  ]

  const cards = [
    {
      title: 'Bible-Centered Teaching',
      description: "We believe in the power of God's Word to transform lives and guide our daily walk with Christ.",
      icon: (
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
      ),
    },
    {
      title: 'Strong Community',
      description: 'Building meaningful relationships through fellowship, support groups, and community outreach programs.',
      icon: (
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
      ),
    },
    {
      title: 'Servant Hearts',
      description: 'Serving our community with love through missions, charity work, and compassionate care for those in need.',
      icon: (
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
      ),
    },
  ]

  return (
    <section id='about' className='bg-white dark:bg-gray-900 transition-colors duration-300'>

      {/* ── Hero Intro Block ── */}
      <div className='px-4 py-20 sm:px-10 lg:px-20 xl:px-28'>
        <motion.div
          className='mx-auto max-w-6xl text-center text-gray-900 dark:text-white'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className='mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-secondary'
          >
            About Us
          </motion.p>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className='mb-8 text-4xl font-extrabold tracking-wide sm:text-5xl'
          >
            Great Family Chapel History
          </motion.h2>

          {/* Animated underline bar */}
          <motion.div
            className='mx-auto mb-10 h-1 w-24 bg-secondary'
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ originX: 0.5 }}
          />

          <div className='space-y-6 text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg sm:leading-9'>
            {historyIntro.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className='mx-auto max-w-5xl'
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Journey of Faith ── */}
      <div className='px-4 py-16 sm:px-10 lg:px-20 xl:px-28'>
        <div className='mx-auto max-w-6xl'>

          <motion.div
            className='mb-14 text-center'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.4 }}
            variants={staggerContainer}
          >
            <motion.h3
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className='text-3xl font-bold uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl'
            >
              Our Journey of Faith
            </motion.h3>
            <motion.div
              className='mx-auto mt-5 h-px w-32 bg-secondary dark:bg-gray-700'
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ originX: 0.5 }}
            />
          </motion.div>

          <div className='grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]'>

            {/* Text side — slides in from left */}
            <motion.div
              className='space-y-6 text-lg leading-9 text-gray-600 dark:text-gray-300'
              variants={staggerContainer}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
            >
              {historyDetails.map((paragraph, i) => (
                <motion.p
                  key={i}
                  variants={fadeLeft}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Image side — slides in from right */}
            <motion.div
              className='lg:pl-6'
              variants={fadeRight}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <motion.div
                className='overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-800'
                whileHover={{ scale: 1.02, boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={assets.img_3I5A9345}
                  alt='Great Family Chapel congregation'
                  className='h-full w-full object-cover'
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Feature Cards ── */}
      <div className='px-4 pb-20 sm:px-10 lg:px-20 xl:px-28'>
        <motion.div
          className='mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              className='bg-gray-50 p-8 text-center transition-colors duration-300 dark:bg-gray-800 cursor-default'
            >
              {/* Icon bounce on hover */}
              <motion.div
                className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-accent'
                whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <svg className='h-8 w-8 text-accent' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  {card.icon}
                </svg>
              </motion.div>

              <h4 className='mb-3 text-xl font-bold text-gray-900 dark:text-white'>
                {card.title}
              </h4>
              <p className='text-gray-600 dark:text-gray-300'>
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}

export default About_Us
