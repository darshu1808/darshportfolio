'use client'
import React from 'react'
import GlobalCanvas from '../components/GlobalCanvas'
import Navigation from '../components/Navigation'
import Brands from '../components/Brands'
import Hero from '../components/Hero'
import About from '../components/About'
import Timeline from '../components/Timeline'
import Services from '../components/Services'
import CaseStudies from '../components/CaseStudies'
import ContentShowcase from '../components/ContentShowcase'
import Workflow from '../components/Workflow'
import Testimonials from '../components/Testimonials'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import CustomCursor from '../components/CustomCursor'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <GlobalCanvas />
      <Navigation />
      <main className="relative w-full flex flex-col min-h-screen z-10 overflow-x-hidden">
        <Hero />
        <About />
        <Timeline />
        <Services />
        <Brands />
        <CaseStudies />
        <ContentShowcase />
        <Workflow />
        <Testimonials />
        <Skills />
        <Contact id="contact" />
      </main>
    </>
  )
}