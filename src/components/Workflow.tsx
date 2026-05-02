'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Edit3, Paintbrush, Video, UploadCloud, BarChart2 } from 'lucide-react'

const steps = [
  { icon: Lightbulb, label: 'Idea' },
  { icon: Edit3, label: 'Script' },
  { icon: Paintbrush, label: 'Design' },
  { icon: Video, label: 'Edit' },
  { icon: UploadCloud, label: 'Publish' },
  { icon: BarChart2, label: 'Analytics' }
]

export default function Workflow() {
  return (
    <section className="relative w-full py-32 px-6 z-10 bg-black/50 backdrop-blur-md border-y border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          AI-Powered <span className="neon-text">Workflow</span>
        </h2>
        <p className="text-white/50 mb-20 max-w-2xl mx-auto">Automating the mundane, maximizing the creative. A seamless pipeline from concept to conversion.</p>
        
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 relative">
          {/* Connection line background */}
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-white/10 -z-10"></div>
          
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center border-accent-blue/30 text-accent-silver hover:bg-accent-blue/10 hover:scale-110 transition-all cursor-default group">
                  <step.icon className="w-6 h-6 group-hover:text-accent-blue transition-colors" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">{step.label}</p>
              </motion.div>
              
              {i < steps.length - 1 && (
                <div className="hidden md:block w-8">
                  {/* Animated connection particle could go here */}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
