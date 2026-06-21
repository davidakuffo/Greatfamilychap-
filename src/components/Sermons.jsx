import React from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const sermons = [
  {
    title: 'The Power of Faith',
    speaker: 'Pastor David Mensah',
    date: 'Sunday, May 12',
    excerpt: 'Discover how faith fuels purpose, healing, and breakthrough in every season of life.',
  },
  {
    title: 'Living a Spirit-Led Life',
    speaker: 'Prophetess Naomi',
    date: 'Sunday, May 19',
    excerpt: 'Learn to hear God clearly and walk in the confidence of His timing and direction.',
  },
  {
    title: 'Walking in Promise',
    speaker: 'Evangelist Mary Ann',
    date: 'Sunday, May 26',
    excerpt: 'Join us as we unpack God’s promises and step into His destiny for our families.',
  },
]

const Sermons = () => {
  return (
    <section id='sermons' className='py-20 px-4 sm:px-12 lg:px-24 xl:px-40 bg-white dark:bg-gray-900 transition-colors duration-300'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          className='text-center mb-12'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            variants={fadeUp}
            className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4'
          >
            Recent Sermons
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
          >
            Tune in to powerful messages that inspire faith, hope, and practical steps for daily living.
          </motion.p>
        </motion.div>

        <div className='grid gap-6 md:grid-cols-3'>
          {sermons.map((sermon, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300'
            >
              <p className='text-sm uppercase tracking-[0.35em] text-secondary mb-4'>Sermon</p>
              <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>{sermon.title}</h3>
              <p className='text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>{sermon.excerpt}</p>
              <div className='text-sm text-gray-500 dark:text-gray-400 space-y-1'>
                <p><span className='font-semibold text-gray-900 dark:text-white'>Speaker:</span> {sermon.speaker}</p>
                <p><span className='font-semibold text-gray-900 dark:text-white'>Date:</span> {sermon.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sermons
