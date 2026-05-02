'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-purple/20 blur-3xl rounded-full"></div>
            
            <h3 className="about-text text-accent-blue tracking-widest uppercase text-sm font-semibold mb-4">The Journey</h3>
            <h2 className="about-text text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              From Content Handler to <br/>
              <span className="neon-text">Digital Architect</span>
            </h2>
            <p className="about-text text-white/70 text-lg leading-relaxed mb-6">
              With 2 years of intense industry experience, I've transitioned from executing basic content plans to architecting comprehensive digital ecosystems. I don't just manage social media; I engineer brand growth.
            </p>
            <ul className="about-text grid grid-cols-2 gap-4 text-white/80 font-medium">
              <li className="flex items-center gap-2">✓ Meta Ads</li>
              <li className="flex items-center gap-2">✓ Creative Direction</li>
              <li className="flex items-center gap-2">✓ AI Automation</li>
              <li className="flex items-center gap-2">✓ Content Strategy</li>
            </ul>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-64 h-96 glass-card border-accent-silver/20 rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 to-accent-purple/10 group-hover:from-accent-blue/30 group-hover:to-accent-purple/30 transition-colors"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h4 className="text-2xl font-display font-bold">Darsh Pandav</h4>
              <p className="text-white/50 text-sm">Creative Coordinator</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
