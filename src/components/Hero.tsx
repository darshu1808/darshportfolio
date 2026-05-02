'use client'
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Magnetic from './Magnetic'
import ScrambleText from './ScrambleText'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative w-full h-screen flex flex-col items-center justify-center z-10 px-6">
      
      <div className="text-center max-w-4xl mx-auto mt-20">
        <h2 className="hero-text text-accent-silver tracking-[0.2em] uppercase text-xs sm:text-sm font-semibold mb-4">
          Digital Marketer • Social Media Strategist • Creative Growth Specialist
        </h2>
        
        <h1 className="hero-text text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none mb-6">
          <span className="text-white"><ScrambleText text="DARSH" delay={2000} /></span><br/>
          <span className="neon-text"><ScrambleText text="PANDAV" delay={2500} /></span>
        </h1>
        
        <p className="hero-text text-xl md:text-2xl text-white/60 font-light mb-12 max-w-2xl mx-auto">
          Building brands through strategy, content & AI-powered marketing.
        </p>

        <div className="hero-text flex flex-col sm:flex-row items-center justify-center gap-6">
          <Magnetic>
            <button className="px-8 py-4 bg-white text-dark rounded-full font-semibold hover:scale-105 transition-transform pointer-events-auto">
              View Projects
            </button>
          </Magnetic>
          <Magnetic>
            <button className="px-8 py-4 glass-panel text-white rounded-full font-semibold hover:border-accent-blue transition-all pointer-events-auto">
              Let's Work Together
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Floating metrics */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="glass-card p-6 pointer-events-auto"
        >
          <p className="text-4xl font-display font-bold text-accent-blue">2+</p>
          <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Years Experience</p>
        </motion.div>
      </div>

      <div className="absolute top-32 right-10 hidden md:block">
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="glass-card p-6 border-accent-purple/30 pointer-events-auto"
        >
          <p className="text-4xl font-display font-bold text-accent-purple">50+</p>
          <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Campaigns Managed</p>
        </motion.div>
      </div>
    </section>
  )
}
