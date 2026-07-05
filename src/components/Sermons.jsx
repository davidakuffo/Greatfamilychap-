import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { supabase } from '../lib/supabase'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const formatSermonDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

const Sermons = () => {
  const [sermons, setSermons] = useState([])
  const [loading, setLoading] = useState(true)
  const [playingId, setPlayingId] = useState(null)
  const audioRefs = React.useRef({})

  useEffect(() => {
    fetchSermons()
  }, [])

  const fetchSermons = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('sermons')
        .select('*')
        .order('sermon_date', { ascending: false })
        .limit(3)

      if (error) throw error
      setSermons(data || [])
    } catch (error) {
      console.error('Error fetching sermons:', error)
      setSermons([])
    } finally {
      setLoading(false)
    }
  }

  const togglePlay = (sermonId) => {
    const audioEl = audioRefs.current[sermonId]
    if (!audioEl) return

    // Pause any other sermon currently playing
    if (playingId && playingId !== sermonId) {
      const prev = audioRefs.current[playingId]
      if (prev) prev.pause()
    }

    if (playingId === sermonId) {
      audioEl.pause()
      setPlayingId(null)
    } else {
      audioEl.play()
      setPlayingId(sermonId)
    }
  }

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

        {loading ? (
          <p className='text-center text-gray-500 dark:text-gray-400'>Loading sermons...</p>
        ) : (
          <div className='grid gap-6 md:grid-cols-3'>
            {sermons.map((sermon, index) => (
              <motion.div
                key={sermon.id ?? index}
                variants={fadeUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300'
              >
                {sermon.image_url && (
                  <div className='w-full h-64 rounded-2xl overflow-hidden mb-6 flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
                    <img src={sermon.image_url} alt={sermon.title} className='max-w-full max-h-full object-contain' />
                  </div>
                )}
                <p className='text-sm uppercase tracking-[0.35em] text-secondary mb-4'>Sermon</p>
                <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>{sermon.title}</h3>
                <p className='text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>{sermon.excerpt}</p>
                <div className='text-sm text-gray-500 dark:text-gray-400 space-y-1 mb-6'>
                  <p><span className='font-semibold text-gray-900 dark:text-white'>Speaker:</span> {sermon.speaker}</p>
                  <p><span className='font-semibold text-gray-900 dark:text-white'>Date:</span> {formatSermonDate(sermon.sermon_date)}</p>
                </div>

                {/* Audio Player */}
                {sermon.audio_url && (
                  <div className='flex items-center gap-3 bg-white dark:bg-gray-900 rounded-2xl p-3 border border-gray-200 dark:border-gray-700'>
                    <button
                      onClick={() => togglePlay(sermon.id)}
                      className='shrink-0 w-11 h-11 rounded-full bg-secondary text-white flex items-center justify-center hover:opacity-90 transition-opacity'
                      aria-label={playingId === sermon.id ? 'Pause sermon' : 'Play sermon'}
                    >
                      {playingId === sermon.id ? <Pause size={18} /> : <Play size={18} className='ml-0.5' />}
                    </button>
                    <div className='flex-1 min-w-0'>
                      <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>
                        {playingId === sermon.id ? 'Now playing...' : 'Listen to this sermon'}
                      </p>
                      <audio
                        ref={(el) => { audioRefs.current[sermon.id] = el }}
                        src={sermon.audio_url}
                        onEnded={() => setPlayingId(null)}
                        controls
                        className='w-full h-8 mt-1'
                      />
                    </div>
                  </div>
                )}

                {/* Optional video link if no audio, or in addition */}
                {sermon.video_url && (
                  <a
                    href={sermon.video_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-block mt-4 text-secondary font-semibold hover:underline'
                  >
                    Watch on video →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {!loading && sermons.length === 0 && (
          <p className='text-center text-gray-500 dark:text-gray-400'>No sermons posted yet.</p>
        )}
      </div>
    </section>
  )
}

export default Sermons