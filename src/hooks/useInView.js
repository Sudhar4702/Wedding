import { useEffect, useRef, useState } from 'react'

function useInView({ rootMargin = '0px 0px -12% 0px', threshold = 0.2 } = {}) {
  const hasSupport = typeof IntersectionObserver !== 'undefined'
  const ref = useRef(null)
  const [inView, setInView] = useState(!hasSupport)

  useEffect(() => {
    const node = ref.current
    if (!node || !hasSupport) {
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, threshold, hasSupport])

  return { ref, inView }
}

export default useInView