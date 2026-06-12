'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Instagram, Linkedin, Mail, MessageCircle, MapPin, Phone, Send } from 'lucide-react'
import { useContent } from '@/context/ContentContext'
import Navigation from '@/components/Navigation'
import CustomCursor from '@/components/CustomCursor'

export default function ProjectsPage() {
  const { content } = useContent()

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      url: content.contact?.socials?.[0]?.url || '#',
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: content.contact?.socials?.[1]?.url || '#',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      label: 'Email',
      url: content.contact?.socials?.[2]?.url || `mailto:${content.settings?.email || 'darsh@example.com'}`,
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      url: content.contact?.socials?.[3]?.url || '#',
      color: 'from-green-500 to-emerald-500'
    },
  ]

  const handleSocialClick = (url: string) => {
    if (url.startsWith('mailto:')) {
      window.location.href = url
    } else if (url !== '#') {
      window.open(url, '_blank')
    }
  }

  return (
    <>
      <CustomCursor />
      <Navigation />
      <main className="relative min-h-screen bg-dark pt-24">
        {/* Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-blue/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue mb-4">
              {content.projects?.tagline || 'Portfolio'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {content.projects?.title || 'Featured Work'}
            </h1>
            <p className="text-white/50 text-lg max-w-2xl">
              {content.projects?.description || 'A collection of projects showcasing my expertise in digital marketing and creative strategy.'}
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {content.projects?.items?.length > 0 ? (
              content.projects.items.map((project: any, i: number) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug || project.id}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-accent-blue/30 transition-all cursor-pointer"
                  >
                  {/* Project Image/Video */}
                  <div className="aspect-video relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center">
                        <span className="text-white/30 text-4xl font-bold">
                          {project.title?.charAt(0) || 'P'}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-medium">
                        {project.category || 'Project'}
                      </span>
                      {project.featured && (
                        <span className="px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/50 text-sm mb-4">{project.client}</p>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Results */}
                    {project.results?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.results.map((result: string, ri: number) => (
                          <span
                            key={ri}
                            className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium"
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center py-20">
                <p className="text-white/40">No projects yet. Add projects from the admin panel.</p>
                <Link
                  href="/admin"
                  className="inline-block mt-4 px-6 py-3 bg-accent-blue rounded-full text-white font-medium hover:bg-accent-purple transition-colors"
                >
                  Add Projects in Admin
                </Link>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-20 border-t border-white/10"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Let&apos;s Work Together
              </h2>
              <p className="text-white/50 max-w-xl mx-auto">
                Have a project in mind? Reach out and let&apos;s discuss how we can take your brand to the next level.
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-white/60">
                <Mail className="w-5 h-5" />
                <span>{content.settings?.email || 'darsh@example.com'}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Phone className="w-5 h-5" />
                <span>{content.settings?.phone || '+91 1234567890'}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-5 h-5" />
                <span>{content.settings?.location || 'Mumbai, India'}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, i) => (
                <button
                  key={i}
                  onClick={() => handleSocialClick(social.url)}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center hover:scale-110 transition-transform`}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </button>
              ))}
            </div>

            {/* Contact Form */}
            <div className="max-w-xl mx-auto mt-16">
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.get('name')}`)
                  const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\nProject Details:\n${formData.get('message')}`)
                  window.location.href = `mailto:${content.settings?.email || 'darsh@example.com'}?subject=${subject}&body=${body}`
                }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-white/60 ml-1">Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-blue/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60 ml-1">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-blue/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/60 ml-1">Project Details</label>
                  <textarea
                    name="message"
                    required
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-blue/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue bg-size-200 hover:bg-right transition-all duration-500 flex items-center justify-center gap-3 group"
                >
                  <span className="font-semibold text-white">Send Message</span>
                  <Send className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}