'use client'

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, useGSAP } from '@/lib/gsap-config'
import { Z_INDEX } from '@/lib/design-tokens'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [displayChildren, setDisplayChildren] = useState(children)
  const isInitialRender = useRef(true)

  useGSAP(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (!overlayRef.current) return

    // In a real Next.js app with App router, seamless page transitions 
    // often require a bit more context setup (like template.tsx), 
    // but we can animate an overlay on pathname change.
    
    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayChildren(children)
        gsap.to(overlayRef.current, {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          duration: 0.3,
          ease: 'power2.inOut'
        })
      }
    })

    tl.fromTo(overlayRef.current, 
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
      { 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', 
        duration: 0.3, 
        ease: 'power2.inOut' 
      }
    )

  }, [pathname])

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-nearBlack pointer-events-none"
        style={{ 
          zIndex: Z_INDEX.transition,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
        }}
      />
      {displayChildren}
    </>
  )
}
