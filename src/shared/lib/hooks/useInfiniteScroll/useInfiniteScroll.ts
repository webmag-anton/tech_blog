import { MutableRefObject, useEffect } from 'react'

export interface UseInfiniteScrollOptions {
  wrapperRef?: MutableRefObject<HTMLElement>
  triggerRef: MutableRefObject<HTMLElement>
  callback?: () => void
}

export function useInfiniteScroll({ callback, triggerRef, wrapperRef }: UseInfiniteScrollOptions) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null

    const wrapperElement = wrapperRef?.current || null
    const triggerElement = triggerRef.current

    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0
      }

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      }, options)

      observer.observe(triggerElement)
    }

    return () => {
      if (observer) {
        observer.unobserve(triggerElement)
      }
    }
  }, [callback, triggerRef, wrapperRef])
}