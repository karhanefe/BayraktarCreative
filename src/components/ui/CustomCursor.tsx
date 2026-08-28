'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, useGSAP } from '@/lib/gsap-config'
import { Z_INDEX } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'

type CursorState = 'default' | 'hover' | 'view' | 'drag' | 'close' | 'hidden'

export function CustomCursor() {
  const pathname = usePathname()
  const cursorRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isPointerFine, setIsPointerFine] = useState(false)
  const [cursorState, setCursorState] = useState<CursorState>('hidden')
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setTimeout(() => {
      setIsPointerFine(mediaQuery.matches)
      if (mediaQuery.matches) setCursorState('default')
    }, 0)
      
    const handler = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches)
      setCursorState(e.matches ? 'default' : 'hidden')
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const { contextSafe } = useGSAP(() => {
    if (!isPointerFine || !cursorRef.current) return

    const cursor = cursorRef.current
    
    gsap.set(cursor, { xPercent: -50, yPercent: -50 })

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const viewEl = target.closest('[data-cursor="view"]')
      const hoverEl = target.closest('a, button, [data-cursor="hover"]')
      const dragEl = target.closest('[data-cursor="drag"]')
      const closeEl = target.closest('[data-cursor="close"]')

      if (viewEl) setCursorState('view')
      else if (closeEl) setCursorState('close')
      else if (dragEl) setCursorState('drag')
      else if (hoverEl) setCursorState('hover')
      else setCursorState('default')
    }

    const handleMouseLeave = () => {
      setCursorState('hidden')
    }
    const handleMouseEnter = () => {
      setCursorState('default')
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isPointerFine])

  useGSAP(() => {
    if (!cursorRef.current) return
    
    const cursor = cursorRef.current
    const text = textRef.current

    switch(cursorState) {
      case 'hidden':
        gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.2 })
        break
      case 'default':
        gsap.to(cursor, { opacity: 1, scale: 1, width: 16, height: 16, backgroundColor: '#f5f5f0', duration: 0.2 })
        if (text) gsap.to(text, { opacity: 0, duration: 0.2 })
        break
      case 'hover':
        gsap.to(cursor, { opacity: 1, scale: 1, width: 48, height: 48, backgroundColor: 'rgba(245, 245, 240, 0.2)', mixBlendMode: 'difference', duration: 0.3 })
        if (text) gsap.to(text, { opacity: 0, duration: 0.2 })
        break
      case 'view':
        gsap.to(cursor, { opacity: 1, scale: 1, width: 80, height: 80, backgroundColor: '#f5f5f0', mixBlendMode: 'normal', duration: 0.3 })
        if (text) {
          text.innerText = 'VIEW'
          gsap.to(text, { opacity: 1, color: '#0a0a0a', duration: 0.2, delay: 0.1 })
        }
        break
      case 'drag':
        gsap.to(cursor, { opacity: 1, scale: 1, width: 80, height: 80, backgroundColor: '#f5f5f0', mixBlendMode: 'normal', duration: 0.3 })
        if (text) {
          text.innerText = 'DRAG'
          gsap.to(text, { opacity: 1, color: '#0a0a0a', duration: 0.2, delay: 0.1 })
        }
        break
      case 'close':
        gsap.to(cursor, { opacity: 1, scale: 1, width: 80, height: 80, backgroundColor: '#f5f5f0', mixBlendMode: 'normal', duration: 0.3 })
        if (text) {
          text.innerText = 'CLOSE'
          gsap.to(text, { opacity: 1, color: '#0a0a0a', duration: 0.2, delay: 0.1 })
        }
        break
    }
  }, [cursorState])

  if (!isPointerFine || pathname?.startsWith('/admin')) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center"
      style={{ zIndex: Z_INDEX.cursor, width: 16, height: 16, backgroundColor: '#f5f5f0' }}
    >
      <div 
        ref={textRef} 
        className="text-[10px] font-bold tracking-widest absolute opacity-0 pointer-events-none"
      />
    </div>
  )
}
