'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function ContentShowcase() {
  return (
    <section className="relative w-full py-32 px-6 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Content <span className="neon-text">Showcase</span>
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto">High-converting creatives designed for maximum retention.</p>
      </div>

      <div className="flex justify-center gap-8 flex-wrap">
        {[1, 2, 3].map((item, index) => (
          <motion.div 
            key={index}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, type: 'spring', stiffness: 50 }}
            className={`relative w-[280px] h-[560px] rounded-[40px] border-[8px] border-white/10 bg-black overflow-hidden shadow-2xl ${index === 1 ? 'md:-translate-y-10' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-dark to-black flex items-center justify-center">
              <span className="text-white/20 font-display">Reel {item}</span>
            </div>
            
            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm cursor-pointer">
              <span className="px-6 py-3 border border-white/20 rounded-full bg-white/10 text-sm font-semibold tracking-widest uppercase">Play</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
