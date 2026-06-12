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
    try {
      const savedContent = localStorage.getItem('portfolioContent')
      if (savedContent) {
        const parsed = JSON.parse(savedContent)
        // Use saved content from localStorage (user's uploaded content)
        setContent(parsed)
      } else {
        // No localStorage - use content.json
        setContent(defaultContent)
      }
    } catch (e) {
      console.error('Error loading content:', e)
      setContent(defaultContent)
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