'use client'
import { useState, useEffect } from 'react'
import defaultContent from '@/data/content.json'

export function useContent() {
  const [content, setContent] = useState<any>(defaultContent)
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

  return { content, loading }
}

export default function useContentProvider() {
  return { useContent }
}