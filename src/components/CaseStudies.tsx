'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, TrendingUp, Target, Users } from 'lucide-react'

const projects = [
  {
    name: 'TechNova Launch',
    category: 'Tech Startup',
    challenge: '0 to 1M reach in 30 days',
    strategy: 'Viral Reels + UGC Ads',
    results: '+1.2M Reach, 30k followers',
    metric: '1M+',
    metricLabel: 'Impressions'
  },
  {
    name: 'Aura Lifestyle',
    category: 'E-Commerce',
    challenge: 'Low conversion rate',
    strategy: 'Retargeting + Premium Aesthetics',
    results: '3x ROAS, +40% Sales',
    metric: '3x',
    metricLabel: 'ROAS'
  },
  {
    name: 'Nexus AI',
    category: 'SaaS',
    challenge: 'Complex product education',
    strategy: 'Explainer Series + LinkedIn Growth',
    results: '5k B2B Leads',
    metric: '5K+',
    metricLabel: 'Leads'
  }
]

export default function CaseStudies() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 px-4 md:px-6 z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue mb-3 md:mb-4">
            Case Studies
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-3 md:mb-4">
            Proven{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-white">
              Results
            </span>
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
            Real projects, real growth. Here's how I helped brands achieve their goals.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-purple/5 to-accent-blue/5" />

              {/* Content */}
              <div className="relative p-5 md:p-6 lg:p-7">
                {/* Category Tag */}
                <span className="inline-block text-[10px] md:text-xs font-medium uppercase tracking-wider text-accent-blue mb-2 md:mb-3">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-display font-bold text-white mb-3 md:mb-4 group-hover:text-white/90 transition-colors">
                  {project.name}
                </h3>

                {/* Details */}
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-5">
                  <div className="flex items-start gap-2">
                    <Target className="w-3 h-3 md:w-4 md:h-4 text-accent-purple mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider mb-0.5">Challenge</p>
                      <p className="text-xs md:text-sm text-white/70">{project.challenge}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-3 h-3 md:w-4 md:h-4 text-accent-blue mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider mb-0.5">Strategy</p>
                      <p className="text-xs md:text-sm text-white/70">{project.strategy}</p>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="pt-4 md:pt-5 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider mb-1">Results</p>
                      <p className="text-sm md:text-base font-semibold text-white">{project.results}</p>
                    </div>
                    {/* Metric Circle */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
                      <span className="text-xs md:text-sm font-bold text-white">{project.metric}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow Button */}
                <button className="absolute bottom-5 md:bottom-6 right-5 md:right-6 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 -translate-x-1">
                  <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 md:mt-14 text-center"
        >
          <p className="text-white/40 text-sm">
            Want similar results?{' '}
            <a href="#contact" className="text-accent-blue hover:underline">Let's discuss your project</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}