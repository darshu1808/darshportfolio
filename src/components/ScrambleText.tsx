'use client'
import React, { useState, useEffect, useRef } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

export default function ScrambleText({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayText, setDisplayText] = useState('')
  const [isScrambling, setIsScrambling] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isScrambling && displayText !== text) {
          setIsScrambling(true)
          let iteration = 0
          
          setTimeout(() => {
            const interval = setInterval(() => {
              setDisplayText(
                text
                  .split('')
                  .map((letter, index) => {
                    if (index < iteration) {
                      return text[index]
                    }
                    if (text[index] === ' ') return ' '
                    return CHARS[Math.floor(Math.random() * CHARS.length)]
                  })
                  .join('')
              )

              if (iteration >= text.length) {
                clearInterval(interval)
                setIsScrambling(false)
              }
              iteration += 1 / 3
            }, 30)
          }, delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [text, isScrambling, displayText, delay])

  return <span ref={ref}>{displayText || text.replace(/[^ ]/g, '_')}</span>
}
