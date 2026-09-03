import { useEffect, useRef } from 'react'
import mainBackground from '../assets/main-background.png'

const ZOOM_RANGE_PX = 450
const MAX_SCALE_DESKTOP = 1.12
const MAX_SCALE_MOBILE = 1.08

function ParallaxBackground() {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current

    if (!layer) {
      return undefined
    }

    const updateZoom = () => {
      const maxScale =
        window.innerWidth < 768
          ? MAX_SCALE_MOBILE
          : MAX_SCALE_DESKTOP

      const progress = Math.min(
        Math.max(window.scrollY / ZOOM_RANGE_PX, 0),
        1
      )

      // Smooth acceleration
      const eased =
        progress * progress * (3 - 2 * progress)

      const scale =
        1 + (maxScale - 1) * eased

      // IMPORTANT:
      // Only scale.
      // No translate.
      layer.style.transform =
        `scale(${scale})`
    }

    updateZoom()

    window.addEventListener(
      'scroll',
      updateZoom,
      { passive: true }
    )

    window.addEventListener(
      'resize',
      updateZoom
    )

    return () => {
      window.removeEventListener(
        'scroll',
        updateZoom
      )

      window.removeEventListener(
        'resize',
        updateZoom
      )
    }
  }, [])

  return (
    <div
      ref={layerRef}
      className="parallax-background"
      style={{
        backgroundImage: `url(${mainBackground})`
      }}
      aria-hidden="true"
    />
  )
}

export default ParallaxBackground