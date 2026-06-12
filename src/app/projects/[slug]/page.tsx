'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, ChevronLeft, ChevronRight, X, Play, Pause, Instagram, Linkedin, Mail, MessageCircle, MapPin, Phone, Send, Calendar, Wrench, Briefcase, Building2 } from 'lucide-react'
import { useContent } from '@/context/ContentContext'
import Navigation from '@/components/Navigation'
import CustomCursor from '@/components/CustomCursor'

export default function ProjectDetailsPage() {
  const params = useParams()
  const slug = params?.slug as string
  const { content } = useContent()
  const [currentProject, setCurrentProject] = useState<any>(null)
  const [prevProject, setPrevProject] = useState<any>(null)
  const [nextProject, setNextProject] = useState<any>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [videoPlaying, setVideoPlaying] = useState(true)

  useEffect(() => {
    if (slug && content.projects?.items) {
      const project = content.projects.items.find((p: any) =>
        p.slug === slug || p.id === slug
      )
      setCurrentProject(project)

      if (project) {
        const projects = content.projects.items
        const currentIndex = projects.findIndex((p: any) =>
          p.slug === slug || p.id === slug
        )
        setPrevProject(currentIndex > 0 ? projects[currentIndex - 1] : null)
        setNextProject(currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null)
      }
    }
  }, [slug, content.projects?.items])

  if (!currentProject) {
    return (
      <>
        <CustomCursor />
        <Navigation />
        <main className="min-h-screen bg-dark pt-32 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
            <p className="text-white/50 mb-8">The project you're looking for doesn't exist.</p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue rounded-full text-white font-medium hover:bg-accent-purple transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>
        </main>
      </>
    )
  }

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

  const projectImage = currentProject.coverImage || currentProject.image
  const gallery = currentProject.gallery || []

  return (
    <>
      <CustomCursor />
      <Navigation />
      <main className="relative min-h-screen bg-dark pt-24">
        {/* Background Effects */}
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
              href="/projects"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Category & Featured Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-sm font-medium">
                {currentProject.category || 'Project'}
              </span>
              {currentProject.featured && (
                <span className="px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple text-sm font-medium">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {currentProject.title}
            </h1>

            {/* Client */}
            <p className="text-xl text-white/60 mb-6">
              {currentProject.client}
            </p>

            {/* Cover Image */}
            {projectImage && (
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-8">
                <img
                  src={projectImage}
                  alt={currentProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              </div>
            )}
          </motion.div>

          {/* Results Section */}
          {currentProject.results?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Results Achieved</h2>
              <div className="flex flex-wrap gap-3">
                {currentProject.results.map((result: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium"
                  >
                    {result}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid lg:grid-cols-3 gap-8 mb-12"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Full Description */}
              {currentProject.fullDescription && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
                  <p className="text-white/70 leading-relaxed whitespace-pre-line">
                    {currentProject.fullDescription}
                  </p>
                </div>
              )}

              {/* Challenge */}
              {currentProject.challenge && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Business Challenge</h2>
                  <p className="text-white/70 leading-relaxed whitespace-pre-line">
                    {currentProject.challenge}
                  </p>
                </div>
              )}

              {/* Objectives */}
              {currentProject.objectives?.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Goals & Objectives</h2>
                  <ul className="space-y-3">
                    {currentProject.objectives.map((objective: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-white/70">
                        <span className="w-2 h-2 rounded-full bg-accent-blue mt-2" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Services Provided */}
              {currentProject.services?.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Services Provided</h2>
                  <div className="flex flex-wrap gap-3">
                    {currentProject.services.map((service: string, i: number) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full bg-accent-blue/10 text-accent-blue text-sm font-medium"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Project Info */}
            <div className="space-y-6">
              {/* Project Information */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Project Details</h3>
                <div className="space-y-4">
                  {currentProject.industry && (
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-accent-blue mt-0.5" />
                      <div>
                        <p className="text-white/40 text-sm">Industry</p>
                        <p className="text-white">{currentProject.industry}</p>
                      </div>
                    </div>
                  )}
                  {currentProject.timeline && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-accent-purple mt-0.5" />
                      <div>
                        <p className="text-white/40 text-sm">Timeline</p>
                        <p className="text-white">{currentProject.timeline}</p>
                      </div>
                    </div>
                  )}
                  {currentProject.tools?.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Wrench className="w-5 h-5 text-accent-blue mt-0.5" />
                      <div>
                        <p className="text-white/40 text-sm">Tools Used</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {currentProject.tools.map((tool: string, i: number) => (
                            <span key={i} className="px-2 py-1 rounded-lg bg-white/5 text-white/70 text-sm">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {currentProject.category && (
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-accent-purple mt-0.5" />
                      <div>
                        <p className="text-white/40 text-sm">Category</p>
                        <p className="text-white">{currentProject.category}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Video */}
          {currentProject.video && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Project Video</h2>
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-white/5">
                <video
                  src={currentProject.video}
                  autoPlay
                  loop
                  muted={!videoPlaying}
                  playsInline
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setVideoPlaying(!videoPlaying)}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm flex items-center gap-2 hover:bg-black/70 transition-colors"
                >
                  {videoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {videoPlaying ? 'Mute' : 'Play Sound'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Project Gallery */}
          {gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Project Gallery</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((image: string, i: number) => (
                  <div
                    key={i}
                    className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => setLightboxImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${currentProject.title} gallery ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-8"
                onClick={() => setLightboxImage(null)}
              >
                <button
                  className="absolute top-4 right-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                  onClick={() => setLightboxImage(null)}
                >
                  <X className="w-6 h-6" />
                </button>
                <img
                  src={lightboxImage}
                  alt="Lightbox"
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Previous / Next Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-between items-center py-8 border-t border-white/10 mb-12"
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug || prevProject.id}`}
                className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm text-white/40">Previous</p>
                  <p className="font-medium">{prevProject.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug || nextProject.id}`}
                className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors text-right"
              >
                <div className="hidden md:block">
                  <p className="text-sm text-white/40">Next</p>
                  <p className="font-medium">{nextProject.title}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </motion.div>

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