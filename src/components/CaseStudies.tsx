'use client'
import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { name: 'TechNova Launch', challenge: '0 to 1M reach in 30 days', strategy: 'Viral Reels + UGC Ads', results: '+1.2M Reach, 30k followers' },
  { name: 'Aura Lifestyle', challenge: 'Low conversion rate', strategy: 'Retargeting + Premium Aesthetics', results: '3x ROAS, +40% Sales' },
  { name: 'Nexus AI', challenge: 'Complex product education', strategy: 'Explainer Series + LinkedIn Growth', results: '5k B2B Leads' },
]

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.case-panel')
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-dark z-10">
      <div className="sticky top-0 h-screen overflow-hidden pt-20 md:pt-32 flex flex-col">
        {/* Responsive Heading */}
        <div className="absolute top-30 md:top-28 left-4 md:left-10 z-20 w-full">
          <h2 className="text-3xl md:text-6xl font-display font-bold">Case <span className="neon-text">Studies</span></h2>
        </div>

        <div ref={scrollRef} className="flex h-full w-[300vw] mt-24 md:mt-0">
        {projects.map((project, i) => (
          <div key={i} className="case-panel w-screen h-full flex items-center justify-center p-3 md:p-6">
            <div className="w-full max-w-5xl glass-panel p-4 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10">

              <div className="w-full md:w-1/2">
                <h3 className="text-2xl md:text-4xl font-display font-bold text-accent-silver mb-4 md:mb-6">{project.name}</h3>
                
                <div className="space-y-3 md:space-y-6">
                  <div>
                    <p className="text-accent-purple text-xs tracking-widest uppercase font-semibold mb-1">Challenge</p>
                    <p className="text-white/80 text-sm md:text-base">{project.challenge}</p>
                  </div>
                  <div>
                    <p className="text-accent-blue text-xs tracking-widest uppercase font-semibold mb-1">Strategy</p>
                    <p className="text-white/80 text-sm md:text-base">{project.strategy}</p>
                  </div>
                  <div>
                    <p className="text-accent-silver text-xs tracking-widest uppercase font-semibold mb-1">Results</p>
                    <p className="text-xl md:text-3xl font-bold neon-text">{project.results}</p>
                  </div>
                </div>

                <button className="mt-4 md:mt-10 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm md:text-base">
                  Read Full Study <ExternalLink size={16} />
                </button>
              </div>

              <div className="w-full md:w-1/2 bg-black/50 rounded-2xl border border-white/5 overflow-hidden relative min-h-[200px] md:min-h-[300px]">
                {/* Visual placeholder for analytics dashboard */}
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs md:text-base">
                  Analytics Dashboard Visual
                </div>
              </div>
              
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}
