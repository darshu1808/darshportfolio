'use client'
import React from 'react'

const testimonials = [
  { name: 'Sarah J.', role: 'Founder, Aura', text: '"Darsh completely transformed our social presence. We saw a 3x ROI in month one."' },
  { name: 'Michael T.', role: 'CMO, Nexus', text: '"The AI workflow integration saved our team 20 hours a week. Brilliant strategist."' },
  { name: 'Elena R.', role: 'Director, TechNova', text: '"Our launch reached over a million people organically thanks to his content strategy."' },
  { name: 'David L.', role: 'CEO, Elevate', text: '"Best creative direction we’ve ever had. Truly premium execution."' },
]

export default function Testimonials() {
  return (
    <section className="relative w-full py-32 z-10 overflow-hidden bg-black/80">
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          Client <span className="neon-text">Voices</span>
        </h2>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        <div className="animate-[marquee_25s_linear_infinite] flex gap-8 px-4 w-max">
          {testimonials.concat(testimonials).map((t, i) => (
            <div key={i} className="w-[400px] glass-panel p-8 shrink-0 border-white/5 hover:border-accent-purple/30 transition-colors cursor-default">
              <p className="text-white/80 text-lg italic mb-6 break-words whitespace-normal leading-relaxed">{t.text}</p>
              <div>
                <p className="font-display font-bold text-accent-silver">{t.name}</p>
                <p className="text-xs text-white/40 tracking-widest uppercase">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
