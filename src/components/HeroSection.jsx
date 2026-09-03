import { useEffect, useRef, useState } from 'react'
import templeImg from '../assets/temple.png'
import { weddingData } from '../data/weddingData.js'
import goldenShineImg from '../assets/Gold.png'

const TEMPLE_ZOOM_RANGE = 1024
const TEMPLE_MAX_SCALE_DESKTOP = 2.6
const TEMPLE_MAX_SCALE_MOBILE = 2.4

function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false)

  const sectionRef = useRef(null)
  const glowRef = useRef(null)
  const contentRef = useRef(null)
  const templeRef = useRef(null)
  const goldenShineRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const temple = templeRef.current
    const glow = glowRef.current
    const content = contentRef.current
    const goldenShine = goldenShineRef.current

    if (!section || !temple || !glow || !content || !goldenShine) {
  return undefined
}

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let rafId = null
    let currentProgress = 0
    let targetProgress = 0

    const clamp01 = (value) => {
      return Math.min(Math.max(value, 0), 1)
    }

    const ease = (value) => {
      return value * value * (3 - 2 * value)
    }

    /*
     * ============================================================
     * UPDATE TEMPLE + HERO EFFECTS
     * ============================================================
     */

    const applyEffects = (progress) => {
      /*
       * ----------------------------------------------------------
       * TEMPLE ZOOM
       * ----------------------------------------------------------
       *
       * ONLY scale is changed here.
       *
       * There is NO:
       * translateY()
       * translate()
       * translate3d()
       *
       * So the temple will not be moved upward by this animation.
       */
      /*
 * GOLDEN SHINE VISIBILITY
 */

    /*
 * ==========================================================
 * GOLDEN SHINE
 * ==========================================================
 *
 * Scroll starts
 *      ↓
 * Fade in
 *      ↓
 * FAST ZOOM
 *      ↓
 * Covers full screen
 *      ↓
 * Fade out
 */

/*
 * ==========================================================
 * GOLDEN SHINE + TEMPLE VISIBILITY
 * ==========================================================
 */

/*
 * ==========================================================
 * GOLDEN SHINE
 * ==========================================================
 */

/*
 * ==========================================================
 * GOLDEN SHINE
 * ==========================================================
 */

const shineProgress = clamp01(
  (progress - 0.05) / 0.40
)

/*
 * GOLDEN SHINE SCALE
 */
const shineScale =
  0.15 + (6.0 * ease(shineProgress))

/*
 * TEMPLE
 *
 * Hide IMMEDIATELY when the golden shine
 * reaches 50% of its zoom.
 */
if (shineProgress >= 0.50) {
  temple.style.opacity = '0'
} else {
  temple.style.opacity = '1'
}

/*
 * BEFORE SHINE
 */
if (shineProgress <= 0) {

  goldenShine.style.opacity = '0'

  goldenShine.style.transform =
    'translate(-50%, -50%) scale(0.15)'

}

/*
 * SHINE ACTIVE
 */
else if (shineProgress < 1) {

  let shineOpacity = 1

  /*
   * FADE IN
   */
  if (shineProgress < 0.10) {
    shineOpacity =
      shineProgress / 0.10
  }

  /*
   * FADE OUT
   */
  if (shineProgress > 0.75) {
    shineOpacity =
      1 -
      (
        (shineProgress - 0.75) /
        0.25
      )
  }

  goldenShine.style.opacity =
    Math.max(shineOpacity, 0).toFixed(3)

  goldenShine.style.transform =
    `translate(-50%, -50%) scale(${shineScale.toFixed(3)})`

}

/*
 * SHINE FINISHED
 */
else {

  goldenShine.style.opacity = '0'

  goldenShine.style.transform =
    'translate(-50%, -50%) scale(6)'

  temple.style.opacity = '0'
}
/*________________________________________________________________*/

      const maxScale =
        window.innerWidth < 768
          ? TEMPLE_MAX_SCALE_MOBILE
          : TEMPLE_MAX_SCALE_DESKTOP

      const templeProgress = clamp01(
        window.scrollY / TEMPLE_ZOOM_RANGE
      )

      const templeEase = ease(templeProgress)

      const templeScale =
        1 +
        (maxScale - 1) * templeEase

      temple.style.transform =
        `scale(${templeScale.toFixed(4)})`

      /*
       * The image grows from its center.
       */
      temple.style.transformOrigin =
        'center center'

      /*
       * ----------------------------------------------------------
       * TEMPLE LIGHT GLOW
       * ----------------------------------------------------------
       */

      const glowProgress = ease(
        clamp01((progress - 0.12) / 0.82)
      )

      const glowScale =
        0.55 +
        2.35 *
          ease(
            clamp01((progress - 0.15) / 0.85)
          )

      glow.style.opacity =
        glowProgress.toFixed(3)

      glow.style.transform =
        `translate(-50%, -50%) scale(${glowScale.toFixed(3)})`

      /*
       * ----------------------------------------------------------
       * BRIDE + GROOM FADE
       * ----------------------------------------------------------
       */

      const contentOpacity =
        1 -
        ease(
          clamp01((progress - 0.5) / 0.42)
        )

      content.style.opacity =
        contentOpacity.toFixed(3)

      /*
       * ----------------------------------------------------------
       * TEMPLE BRIGHTNESS
       * ----------------------------------------------------------
       *
       * This only changes brightness.
       * It does not change position.
       */

      const brightness =
        1 +
        0.5 *
          ease(
            clamp01((progress - 0.15) / 0.85)
          )

      temple.style.filter =
        `brightness(${brightness.toFixed(3)})`
    }

    /*
     * ============================================================
     * SMOOTH ANIMATION
     * ============================================================
     */

    const tick = () => {
      rafId = null

      currentProgress +=
        (targetProgress - currentProgress) * 0.12

      applyEffects(currentProgress)

      if (
        Math.abs(
          targetProgress - currentProgress
        ) > 0.001
      ) {
        rafId =
          requestAnimationFrame(tick)
      }
    }

    /*
     * ============================================================
     * SCROLL UPDATE
     * ============================================================
     */

    const update = () => {
      /*
       * Scroll indicator
       */

      setIsScrolled(
        window.scrollY > 24
      )

      if (reduceMotion) {
        return
      }

      /*
       * Calculate hero section scroll progress.
       */

      const rect =
        section.getBoundingClientRect()

      const sectionHeight =
        rect.height || window.innerHeight

      targetProgress =
        sectionHeight > 0
          ? clamp01(
              -rect.top /
                sectionHeight
            )
          : 0

      /*
       * Start animation frame.
       */

      if (rafId === null) {
        rafId =
          requestAnimationFrame(tick)
      }
    }

    /*
     * ============================================================
     * INITIAL STATE
     * ============================================================
     */

    if (reduceMotion) {
      temple.style.transform =
        'scale(1)'

      temple.style.transformOrigin =
        'center center'

      temple.style.filter =
        'brightness(1)'

      glow.style.opacity =
        '0'

      content.style.opacity =
        '1'
    } else {
      update()
    }

    /*
     * ============================================================
     * EVENTS
     * ============================================================
     */

    window.addEventListener(
      'scroll',
      update,
      { passive: true }
    )

    window.addEventListener(
      'resize',
      update
    )

    /*
     * ============================================================
     * CLEANUP
     * ============================================================
     */

    return () => {
      window.removeEventListener(
        'scroll',
        update
      )

      window.removeEventListener(
        'resize',
        update
      )

      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`hero-section${
        isScrolled
          ? ' is-scrolled'
          : ''
      }`}
    >
      {/* ========================================================
          TEMPLE LIGHT GLOW
          ======================================================== */}

      <div
        ref={glowRef}
        className="hero-glow"
        aria-hidden="true"
      />

      {/* ========================================================
          BRIDE + GROOM
          ======================================================== */}

      <div
        ref={contentRef}
        className="hero-content"
      >
        <div className="hero-names">

          <span className="hero-name bride-name">
            {weddingData.brideName}
          </span>

          <span className="hero-ampersand">
            &amp;
          </span>

          <span className="hero-name groom-name">
            {weddingData.groomName}
          </span>

        </div>

        {weddingData.invitationMessage ? (
          <p className="hero-message">
            {weddingData.invitationMessage}
          </p>
        ) : null}
      </div>

      {/* ========================================================
          TEMPLE
          ======================================================== */}

      <div className="hero-temple-wrap">
        <img
          ref={goldenShineRef}
          className="golden-shine"
          src={goldenShineImg}
          alt=""
          aria-hidden="true"
        />
        <img
          ref={templeRef}
          className="hero-temple"
          src={templeImg}
          alt=""
        />
      </div>

      {/* ========================================================
          SCROLL INDICATOR
          ======================================================== */}

    </section>
  )
}

export default HeroSection