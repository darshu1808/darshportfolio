'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Share2, PenTool, Target, Wand2, Bot, TrendingUp, ArrowUpRight } from 'lucide-react'

const services = [
  {
    icon: Share2,
    title: 'Social Media Management',
    desc: 'End-to-end community building and brand presence that converts followers into loyal customers.',
    color: '#00C2FF'
  },
  {
    icon: PenTool,
    title: 'Content Strategy',
    desc: 'Data-driven content pillars and editorial calendars that maximize engagement and reach.',
    color: '#6D5EF3'
  },
  {
    icon: Target,
    title: 'Meta Ads',
    desc: 'Precision-targeted Facebook & Instagram campaigns designed for maximum ROAS.',
    color: '#00C2FF'
  },
  {
    icon: Wand2,
    title: 'Creative Direction',
    desc: 'Visual storytelling and brand aesthetics that align with premium market standards.',
    color: '#6D5EF3'
  },
  {
    icon: Bot,
    title: 'AI Automation',
    desc: 'Cutting-edge AI workflows that scale your marketing output 10x faster.',
    color: '#00C2FF'
  },
  {
    icon: TrendingUp,
    title: 'Growth Strategy',
    desc: 'Comprehensive roadmaps for sustainable market dominance and brand scaling.',
    color: '#6D5EF3'
  }
]

export default function Services() {
  return (
    <section className="relative w-full py-40 px-6 z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue mb-4">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What I{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-white">
              Do
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Comprehensive digital solutions designed to elevate your brand and drive measurable growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500"
            >
              {/* Hover gradient effect */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${service.color}10 0%, transparent 50%)`
                }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}10 100%)`,
                  border: `1px solid ${service.color}30`
                }}
              >
                <service.icon className="w-7 h-7" style={{ color: service.color }} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                {service.title}
              </h3>
              <p className="text-white/50 leading-relaxed mb-4">
                {service.desc}
              </p>

              {/* Arrow */}
              <div className="flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span style={{ color: service.color }}>Learn more</span>
                <ArrowUpRight className="w-4 h-4 ml-1" style={{ color: service.color }} />
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, transparent 50%, ${service.color}10 50%)`
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}