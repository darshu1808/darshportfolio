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
    const savedContent = localStorage.getItem('portfolioContent')
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent))
      } catch (e) {
        console.error('Error parsing saved content:', e)
      }
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