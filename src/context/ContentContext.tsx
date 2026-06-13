'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import defaultContent from '@/data/content.json'

interface ContentContextType {
  content: typeof defaultContent
  loading: boolean
}

const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  loading: true
})

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Always start with default content to prevent crash
    setContent(defaultContent)

    try {
      const savedContent = localStorage.getItem('portfolioContent')
      if (savedContent && typeof savedContent === 'string') {
        const parsed = JSON.parse(savedContent)
        // Validate it has the expected structure (hero section)
        if (parsed && typeof parsed === 'object' && parsed.hero && parsed.hero.title) {
          setContent(parsed)
        }
      }
    } catch (e) {
      console.error('Error loading saved content:', e)
    }
    setLoading(false)
  }, [])

  return (
    <ContentContext.Provider value={{ content, loading }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}