"use client"

import { useEffect } from 'react'

export function usePreventScrollLock() {
  useEffect(() => {
    // Prevent Radix UI from locking scroll
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-scroll-locked') {
          const body = document.body
          if (body.hasAttribute('data-scroll-locked')) {
            body.style.overflow = 'auto'
            body.style.paddingRight = '0'
          }
        }
      })
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-scroll-locked', 'style']
    })

    return () => observer.disconnect()
  }, [])
}