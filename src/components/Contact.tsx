'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Mail, MessageCircle, Send } from 'lucide-react'
import { useContent } from '@/context/ContentContext'

interface ContactProps {
  id?: string
}

export default function Contact({ id }: ContactProps) {
  const { content } = useContent()

  const socialIcons: Record<string, any> = {
    Instagram,
    Linkedin,
    Mail,
    MessageCircle
  }

  return (
    <section id={id} className="relative w-full min-h-screen flex flex-col items-center justify-center z-10 px-4 md:px-6 py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue mb-4">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            Let's build something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-white">
              extraordinary
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
            Have a project in mind? Let's discuss how we can take your brand to the next level.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <form className="space-y-4 md:space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-sm text-white/60 ml-1">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-blue/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60 ml-1">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-blue/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60 ml-1">Project Details</label>
              <textarea
                placeholder="Tell me about your project..."
                rows={4}
                className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-blue/50 transition-all resize-none"
              />
            </div>

            <button
              type="button"
              className="w-full py-3 md:py-4 rounded-2xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue bg-size-200 hover:bg-right transition-all duration-500 flex items-center justify-center gap-3 group card-lift"
            >
              <span className="font-semibold text-white">Send Message</span>
              <Send className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-20"
        >
          <p className="text-center text-white/40 text-sm mb-6">Or reach out directly</p>
          <div className="flex justify-center gap-4 md:gap-6">
            {(content.contact?.socials || []).map((social: any, i: number) => {
              const IconComponent = socialIcons[social.icon] || Mail
              return (
              <a
                key={i}
                href={social.url || '#'}
                target={social.url?.startsWith('http') ? '_blank' : '_self'}
                rel={social.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:border-white/20 hover:scale-110 transition-all duration-300 group card-lift"
                title={social.label}
              >
                <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-white/50 group-hover:text-white transition-colors" />
              </a>
            )})}
          </div>
        </motion.div>
      </div>
    </section>
  )
}