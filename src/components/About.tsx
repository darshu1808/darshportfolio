'use client'
import React from 'react'
import { useContent } from '@/context/ContentContext'

export default function About() {
  const { content } = useContent()

  return (
    <section className="relative w-full py-16 md:py-32 lg:py-40 px-4 md:px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Profile */}
          <div className="relative aspect-[4/5] max-w-[280px] sm:max-w-[340px] md:max-w-md mx-auto lg:mx-0 w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-dark to-blue-500/20 rounded-3xl" />
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
              {content.about.profileImage ? (
                <img
                  src={content.about.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8">
                  <span className="text-3xl md:text-4xl font-bold text-white">DP</span>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-1 mt-4 md:mt-6">{content.settings?.siteName || 'Darsh Pandav'}</h4>
                  <p className="text-white/50 text-sm">{content.settings?.siteTitle || 'Digital Growth Strategist'}</p>
                </div>
              )}
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 pb-6 md:pb-8 px-6 md:px-8 flex flex-col items-center pointer-events-none">
              <h4 className="text-xl md:text-2xl font-bold text-white mb-1">{content.settings?.siteName || 'Darsh Pandav'}</h4>
              <p className="text-white/80 text-sm font-medium">{content.settings?.siteTitle || 'Digital Growth Strategist'}</p>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 mb-4">
              {content.about.tagline}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 leading-tight">
              {content.about.title}
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              {content.about.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-10">
              {content.about.stats.map((stat: any, i: number) => (
                <div key={i} className="text-center p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {content.about.skills.map((skill: string, i: number) => (
                <span key={i} className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-white/70">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}