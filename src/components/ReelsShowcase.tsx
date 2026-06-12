'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useContent } from '@/context/ContentContext'
import { Play, Eye } from 'lucide-react'

// Extract Instagram Reel ID from URL
function getReelId(url: string): string | null {
  if (!url) return null

  // Handle different Instagram URL formats
  // instagram.com/reel/XXXXX/
  const reelMatch = url.match(/instagram\.com\/reel\/([A-Za-z0-9_-]+)/)
  if (reelMatch) return reelMatch[1]

  // instagram.com/p/XXXXX/
  const postMatch = url.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/)
  if (postMatch) return postMatch[1]

  return null
}

export default function ReelsShowcase() {
  const { content } = useContent()
  const reels = content.reels?.items || []

  // Filter out empty reels
  const validReels = reels.filter((reel: any) => reel.url)

  if (validReels.length === 0) {
    return null
  }

  return (
    <section className="relative w-full py-40 px-6 z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 mb-4">
            {content.reels?.tagline || 'Reels'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {content.reels?.title || 'Watch My Work'}
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {content.reels?.description || 'Latest content and campaigns'}
          </p>
        </motion.div>

        {/* Reels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {validReels.map((reel: any, i: number) => {
            const reelId = getReelId(reel.url)

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Reel Card */}
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 border border-white/10 group-hover:border-white/20 transition-colors">
                  {reelId ? (
                    // Embedded Instagram Reel iframe
                    <iframe
                      src={`https://www.instagram.com/reel/${reelId}/embed`}
                      className="absolute inset-0 w-full h-full border-0"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    // Placeholder when no valid URL
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800">
                      <Play className="w-12 h-12 text-gray-600 mb-4" />
                      <p className="text-gray-500 text-sm">Invalid URL</p>
                    </div>
                  )}

                  {/* Overlay with info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    {reel.caption && (
                      <p className="text-white text-sm line-clamp-2 mb-2">{reel.caption}</p>
                    )}
                    {reel.views && (
                      <div className="flex items-center gap-1 text-white/70 text-xs">
                        <Eye className="w-3 h-3" />
                        <span>{reel.views}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Click to open in Instagram */}
                {reel.url && (
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}