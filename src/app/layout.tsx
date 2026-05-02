import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Darsh Pandav | Digital Marketer & Strategist',
  description: 'Building brands through strategy, content & AI-powered marketing. Futuristic portfolio of Darsh Pandav.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syncopate:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
