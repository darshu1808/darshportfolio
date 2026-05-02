'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Share2, PenTool, Target, Wand2, Bot, TrendingUp } from 'lucide-react'

const services = [
  { icon: Share2, title: 'Social Media Management', desc: 'End-to-end community building and brand presence.' },
  { icon: PenTool, title: 'Content Strategy', desc: 'Data-driven content pillars that guarantee engagement.' },
  { icon: Target, title: 'Meta Ads Specialist', desc: 'Precision-targeted acquisition campaigns with high ROI.' },
  { icon: Wand2, title: 'Creative Direction', desc: 'Visual storytelling that aligns with premium aesthetics.' },
  { icon: Bot, title: 'AI Marketing Automation', desc: 'Scaling output using cutting-edge AI workflows.' },
  { icon: TrendingUp, title: 'Brand Growth Strategy', desc: 'Comprehensive roadmaps for long-term market dominance.' },
]

export default function Services() {
  return (
    <section className="relative w-full py-32 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Agency-Level <span className="neon-text">Execution</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">Comprehensive digital solutions designed for modern brands.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-blue/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:from-accent-blue/30 transition-colors duration-500"></div>
              <service.icon className="w-12 h-12 text-accent-silver group-hover:text-accent-blue transition-colors mb-6" />
              <h3 className="text-2xl font-display font-semibold mb-3">{service.title}</h3>
              <p className="text-white/60 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
