'use client'
import React from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'
import GlobalCanvas from '../components/GlobalCanvas'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import CaseStudies from '../components/CaseStudies'
import ContentShowcase from '../components/ContentShowcase'
import Workflow from '../components/Workflow'
import Testimonials from '../components/Testimonials'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import CustomCursor from '../components/CustomCursor'
import Preloader from '../components/Preloader'

export default function Home() {
  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <CustomCursor />
      <Preloader />
      <GlobalCanvas />
      <main className="relative w-full flex flex-col min-h-screen z-10">
        <Hero />
        <About />
        <Services />
        <CaseStudies />
        <ContentShowcase />
        <Workflow />
        <Testimonials />
        <Skills />
        <Contact />
      </main>
    </ReactLenis>
  )
}
