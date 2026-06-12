'use client'
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useContent } from '@/context/ContentContext'
import { Volume2, VolumeX, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react'

// Single Row with 3-item carousel
function ContentRow({
  items,
  label,
  accentColor,
  aspectRatio
}: {
  items: any[],
  label: string,
  accentColor: string,
  aspectRatio: 'vertical' | 'verticalVideo' | 'horizontal'
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(rowRef, { amount: 0.3, once: false })
  const [centerIndex, setCenterIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [key, setKey] = useState(0)

  if (items.length === 0) return null

  const nextSlide = useCallback(() => {
    setCenterIndex(prev => (prev + 1) % items.length)
    setKey(prev => prev + 1)
  }, [items.length])

  const prevSlide = useCallback(() => {
    setCenterIndex(prev => (prev - 1 + items.length) % items.length)
    setKey(prev => prev + 1)
  }, [items.length])

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  // Control video play/pause and mute
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying && isInView) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
      videoRef.current.muted = isMuted
    }
  }, [isPlaying, isMuted, isInView])

  // Get 3 items: left (-1), center (0), right (+1)
  const getVisibleItems = () => {
    const result = []
    for (let offset = -1; offset <= 1; offset++) {
      let idx = centerIndex + offset
      // Wrap around
      if (idx < 0) idx = items.length + idx
      if (idx >= items.length) idx = idx - items.length
      result.push({ ...items[idx], position: offset, originalIndex: idx })
    }
    return result
  }

  const visibleItems = getVisibleItems()

  // Dimensions - Full screen big boxes (smaller on mobile for horizontal)
  const dims = aspectRatio === 'vertical'
    ? { containerClass: 'w-[240px] h-[300px]', centerClass: 'w-[300px] h-[375px]', width: 650 }
    : aspectRatio === 'verticalVideo'
    ? { containerClass: 'w-[240px] h-[427px]', centerClass: 'w-[300px] h-[533px]', width: 650 }
    : { containerClass: 'w-[240px] h-[135px] md:w-[380px] md:h-[213px]', centerClass: 'w-[300px] h-[169px] md:w-[480px] md:h-[270px]', width: 550 }

  return (
    <div
      ref={rowRef}
      className="py-12"
      style={{ opacity: isInView ? 1 : 0.4, transition: 'opacity 0.5s ease' }}
    >
      <div className={`relative flex items-center justify-center ${aspectRatio?.includes('vertical') ? 'h-[700px] md:h-[700px]' : 'h-[400px] md:h-[600px]'}`}>
        {/* Heading above center box */}
        <div className="absolute left-1/2 -translate-x-1/2 z-40 text-center" style={{ top: aspectRatio === 'verticalVideo' ? '18px' : (aspectRatio === 'vertical' ? '15px' : '25px') }}>
          <h3 className={`text-2xl md:text-3xl font-medium ${accentColor}`}>{label}</h3>
        </div>
        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 md:left-4 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white/70" />
        </button>

        {/* 3 Cards Container */}
        <div className="relative flex items-center justify-center gap-4" style={{ width: dims.width }}>
          {visibleItems.map((item: any) => {
            const isCenter = item.position === 0
            const isLeft = item.position === -1

            return (
              <motion.div
                key={`${item.id}-${key}`}
                className={`absolute transition-all duration-500 ease-out ${
                  isCenter ? dims.centerClass : dims.containerClass
                } ${isCenter ? 'z-30 scale-100' : 'z-10 scale-75 opacity-40 blur-[1px]'}`}
                animate={{
                  left: isCenter ? '50%' : isLeft ? '15%' : '85%',
                  x: isCenter ? '-50%' : '-50%',
                  scale: isCenter ? 1 : 0.75,
                  opacity: isCenter ? 1 : 0.4,
                  zIndex: isCenter ? 30 : 10
                }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 bg-black shadow-2xl">
                  {item.type === 'video' ? (
                    <video
                      ref={isCenter ? videoRef : null}
                      src={item.url}
                      loop
                      playsInline
                      muted={isMuted}
                      autoPlay={isCenter && isPlaying && isInView}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img src={item.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                  )}

                  {/* Mute Button - Center Only */}
                  {item.type === 'video' && isCenter && (
                    <button
                      onClick={toggleMute}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 hover:bg-black/80 transition-all"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                    </button>
                  )}

                  {/* Play/Pause Button - Center Only */}
                  {item.type === 'video' && isCenter && (
                    <button
                      onClick={togglePlayPause}
                      className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 hover:bg-black/80 transition-all"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                    </button>
                  )}

                  {/* Caption */}
                  {item.caption && isCenter && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white text-xs line-clamp-2">{item.caption}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 md:right-4 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white/70" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {items.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => { setCenterIndex(i); setIsPlaying(true); setKey(prev => prev + 1) }}
            className={`transition-all duration-300 ${
              centerIndex === i ? 'w-5 h-1.5 bg-white rounded-full' : 'w-1.5 h-1.5 bg-white/30 rounded-full hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ContentShowcase() {
  const { content } = useContent()
  const showcase = content.contentShowcase || {}

  const verticalReels = showcase.verticalReels || []
  const horizontalReels = showcase.horizontalReels || []
  const verticalPosts = showcase.verticalPosts || []
  const horizontalPosts = showcase.horizontalPosts || []
  const labels = showcase.labels || {}

  const hasContent = verticalReels.length > 0 || horizontalReels.length > 0 || verticalPosts.length > 0 || horizontalPosts.length > 0

  if (!hasContent) return null

  return (
    <section className="relative w-full py-16 px-3 md:px-4 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3">
            Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white">Showcase</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base">High-converting creatives designed for maximum retention.</p>
        </motion.div>

        <ContentRow items={verticalReels} label={labels.verticalReels || "Vertical Videos"} accentColor="text-purple-400" aspectRatio="verticalVideo" />
        <ContentRow items={horizontalReels} label={labels.horizontalReels || "Horizontal Videos"} accentColor="text-blue-400" aspectRatio="horizontal" />
        <ContentRow items={verticalPosts} label={labels.verticalPosts || "Vertical Posts"} accentColor="text-pink-400" aspectRatio="vertical" />
        <ContentRow items={horizontalPosts} label={labels.horizontalPosts || "Horizontal Posts"} accentColor="text-emerald-400" aspectRatio="horizontal" />
      </div>
    </section>
  )
}