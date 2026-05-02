'use client'
import React from 'react'
import { motion } from 'framer-motion'

const skills = [
  { name: 'Meta Ads', value: 95 },
  { name: 'Content Strategy', value: 90 },
  { name: 'Creative Direction', value: 85 },
  { name: 'AI Workflows', value: 92 },
  { name: 'Data Analytics', value: 88 },
  { name: 'Copywriting', value: 85 },
]

export default function Skills() {
  return (
    <section className="relative w-full py-32 px-6 z-10 bg-dark">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">
          The <span className="neon-text">Arsenal</span>
        </h2>
        
        <div className="space-y-8">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="font-display font-semibold tracking-widest uppercase text-sm text-accent-silver">{skill.name}</span>
                <span className="text-accent-blue font-bold">{skill.value}%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-silver"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
