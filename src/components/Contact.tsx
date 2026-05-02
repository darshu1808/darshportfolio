'use client'
import React from 'react'

export default function Contact() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center z-10 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto z-10">
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
          Let’s build something <br/>
          <span className="neon-text">unforgettable.</span>
        </h2>
        <p className="text-white/60 text-lg mb-12">Ready to elevate your brand's digital presence to the next level?</p>
        
        <form className="max-w-md mx-auto space-y-4 mb-16">
          <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent-blue transition-colors" />
          <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent-blue transition-colors" />
          <textarea placeholder="Tell me about your project..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent-blue transition-colors resize-none"></textarea>
          
          <button type="button" className="w-full relative group overflow-hidden rounded-xl p-[1px]">
            <span className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-silver opacity-70 group-hover:opacity-100 transition-opacity"></span>
            <div className="relative bg-dark px-8 py-4 rounded-xl transition-all group-hover:bg-opacity-0">
              <span className="font-semibold tracking-widest uppercase text-white group-hover:text-black transition-colors">Launch Project</span>
            </div>
          </button>
        </form>

        <div className="flex justify-center gap-8 text-white/50 text-sm tracking-widest uppercase font-semibold">
          <a href="#" className="hover:text-accent-blue transition-colors">Instagram</a>
          <a href="#" className="hover:text-accent-purple transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-accent-silver transition-colors">WhatsApp</a>
          <a href="#" className="hover:text-white transition-colors">Email</a>
        </div>
      </div>
    </section>
  )
}
