'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useContent } from '@/context/ContentContext'

export default function Hero() {
  const { content } = useContent()
  const heroRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const { scrollY } = useScroll()

  useEffect(() => {
    setDimensions({
      width: window.innerWidth || 1200,
      height: window.innerHeight || 800
    })
  }, [])

  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, -80])
  const y3 = useTransform(scrollY, [0, 500], [0, 50])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.floating-card')
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        const depth = card.getAttribute('data-depth') || '0.5'
        const moveX = x * parseFloat(depth) * 0.05
        const moveY = y * parseFloat(depth) * 0.05
        ;(card as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-dark">

      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dark-alt" />
        <div className="absolute top-0 left-0 w-full h-full opacity-60">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-blue/15 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[150px]" />
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
      </div>

      {/* Floating Light Streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent animate-light-streak" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent animate-light-streak delay-700" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">

        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
            <span className="w-2 h-2 bg-accent-blue rounded-full animate-pulse" />
            <span className="text-sm text-white/70 tracking-wide">{content.hero.tagline}</span>
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-center mb-6 tracking-tight"
        >
          <span className="text-white">{content.hero.title.line1}</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-white">{content.hero.title.line2}</span>{' '}
          <span className="text-white">{content.hero.title.line3}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/50 text-center max-w-2xl mb-12 font-light"
        >
          {content.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="/projects"
            className="px-8 py-4 bg-white text-dark rounded-full font-semibold hover:scale-105 transition-transform text-center"
          >
            {content.hero.cta.primary}
          </a>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-semibold hover:bg-white/10 transition-all"
          >
            {content.hero.cta.secondary}
          </button>
        </motion.div>
      </div>

      {/* Floating Analytics Cards - Left */}
      <motion.div
        style={{ y: y1 }}
        className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 hidden lg:block floating-card"
        data-depth="0.3"
      >
        <div className="glass-card p-5 w-56">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-white/50 uppercase tracking-wider">Reach</span>
            <span className="text-xs text-accent-blue">+127%</span>
          </div>
          <div className="h-16 flex items-end gap-1">
            {[40, 65, 45, 80, 60, 90, 75, 55, 70, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-accent-blue/30 to-accent-blue rounded-t-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-3 text-2xl font-bold text-white">2.4M</div>
        </div>
      </motion.div>

      {/* Floating Analytics Card - Right */}
      <motion.div
        style={{ y: y2 }}
        className="absolute right-8 md:right-16 top-1/3 hidden lg:block floating-card"
        data-depth="0.4"
      >
        <div className="glass-card p-5 w-52">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-white/50 uppercase tracking-wider">Engagement</span>
            <span className="text-xs text-accent-purple">+89%</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="url(#gradient)" strokeWidth="3" strokeDasharray="75 100" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6D5EF3" />
                    <stop offset="100%" stopColor="#00C2FF" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">75%</span>
            </div>
            <div>
              <div className="text-xl font-bold text-white">Active</div>
              <div className="text-xs text-white/50">Community</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating AI Card - Bottom Right */}
      <motion.div
        style={{ y: y3 }}
        className="absolute right-16 bottom-32 hidden lg:block floating-card"
        data-depth="0.25"
      >
        <div className="glass-card p-4 w-48">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.433 10.07C11.387 10.585 10 11.12 10 12c0 .88.387 1.415 1.433 1.93a3.343 3.343 0 013.134 3.134c.515.515.929 1.175.929 1.933v.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-.5c0-1.108.806-2.057 1.907-2.622a6.513 6.513 0 01-1.497-.417zM16.5 10c0-.88-.387-1.415-1.433-1.93a3.343 3.343 0 00-3.134-3.134C11.387 4.415 10 3.88 10 3c0-.88.387-1.415 1.433-1.93a6.513 6.513 0 011.497.417A3.343 3.343 0 0114.5 2c.88 0 1.415.387 1.933 1.433a3.343 3.343 0 013.134 3.134c.515.515.929 1.175.929 1.933v.5a.75.75 0 01-.75.75h-1.5a.75.75 0 00-.75.75v.5c0 1.108-.806 2.057-1.907 2.622a6.513 6.513 0 01-1.497-.417z" />
              </svg>
            </div>
            <span className="text-xs text-white/70">AI Analytics</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/50">Best Time</span>
              <span className="text-white">9:00 PM</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/50">Top Format</span>
              <span className="text-white">Reels</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/50">Audience</span>
              <span className="text-accent-blue">18-34</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Bar - Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 md:gap-16"
      >
        {content.hero.stats.map((stat: any, i: number) => (
          <div key={i} className="text-center hidden md:block">
            <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:hidden"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>

    </section>
  )
}