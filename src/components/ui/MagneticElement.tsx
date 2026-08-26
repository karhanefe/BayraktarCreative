'use client'

import React, { useRef, useState, useEffect } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-config'

interface MagneticElementProps {
  children: React.ReactElement
  intensity?: number
}

export function MagneticElement({ children, intensity = 0.3 }: MagneticElementProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPointerFine, setIsPointerFine] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    // avoid synchronous setState in effect
    setTimeout(() => setIsPointerFine(mediaQuery.matches), 0)
    
    const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const { contextSafe } = useGSAP({ scope: containerRef })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointerFine || !containerRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    
    const x = (clientX - (left + width / 2)) * intensity
    const y = (clientY - (top + height / 2)) * intensity

    contextSafe(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          x,
          y,
          duration: 0.6,
          ease: 'power3.out'
        })
      }
    })()
  }

  const handleMouseLeave = () => {
    if (!isPointerFine || !containerRef.current) return
    setIsHovered(false)
    
    contextSafe(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)'
        })
      }
    })()
  }

  if (!isPointerFine) {
    return children
  }

  return (
    <div 
      ref={containerRef}
      className="inline-block relative z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
