'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Folder, Mail, User } from 'lucide-react'
import { useContent } from '@/context/ContentContext'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { content } = useContent()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/projects', label: 'Projects', icon: Folder },
    { href: '#contact', label: 'Contact', icon: Mail },
  ]

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith('#')) {
      const element = document.getElementById(href.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-dark/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {content.settings?.siteName?.split(' ').map(n => n[0]).join('') || 'DP'}
              </span>
            </div>
            <span className="text-lg font-bold text-white hidden sm:block">
              {content.settings?.siteName || 'Darsh Pandav'}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-white/60 hover:text-white transition-colors text-sm font-medium"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors text-sm font-medium ${
                    pathname === item.href ? 'text-accent-blue' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-dark-alt z-50 border-l border-white/10"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-white">Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    item.href.startsWith('#') ? (
                      <button
                        key={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className="flex items-center gap-3 text-white/60 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 transition-colors text-left"
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
                          pathname === item.href
                            ? 'text-accent-blue bg-accent-blue/10'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    )
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}