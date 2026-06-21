import React from 'react'
import assets from '../assets/assets'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const galleryImages = [
  assets.Papa,
  assets.img_8868,
  assets.img_8872,
  assets.commanding_morning,
  assets.prophetic_service,
  assets.destiny_encounter,
]

const Gallery = () => {
  return (
    <section id='gallery' className='py-20 px-4 sm:px-12 lg:px-24 xl:px-40 bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
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
            Gallery
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
          >
            See moments from worship, fellowship, and ministry life at Great Family Chapel.
          </motion.p>
        </motion.div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className='overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className='w-full h-72 object-cover transition-transform duration-500 hover:scale-105'
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
