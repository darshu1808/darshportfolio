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

// Deep merge function to combine localStorage with content.json
function deepMerge(defaultData: any, savedData: any): any {
  if (!savedData) return defaultData

  const result: any = { ...defaultData }

  for (const key in savedData) {
    if (savedData[key] && typeof savedData[key] === 'object' && !Array.isArray(savedData[key])) {
      result[key] = deepMerge(defaultData[key] || {}, savedData[key])
    } else if (savedData[key] !== undefined && savedData[key] !== null && savedData[key] !== '') {
      // Only override non-empty values from localStorage
      result[key] = savedData[key]
    }
  }

  return result
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<typeof defaultContent>(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedContent = localStorage.getItem('portfolioContent')
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent)
        // Merge localStorage with content.json - keeps both up to date
        const merged = deepMerge(defaultContent, parsed)
        setContent(merged)
      } catch (e) {
        console.error('Error parsing saved content:', e)
        setContent(defaultContent)
      }
    } else {
      // No localStorage - use content.json
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