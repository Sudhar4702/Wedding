import { useEffect, useRef, useState } from 'react'
import { weddingData } from '../data/weddingData.js'
import useInView from '../hooks/useInView.js'

const REVEAL_THRESHOLD = 0.55
const SCRATCH_SIZE = 46
const SAMPLE_STEP = 8

function ScratchSection() {
  const canvasRef = useRef(null)
  const revealedRef = useRef(false)
  const [revealed, setRevealed] = useState(false)
  const { ref, inView } = useInView()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || revealedRef.current) {
      return undefined
    }

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()

    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const w = canvas.width / dpr
    const h = canvas.height / dpr

    const base = ctx.createLinearGradient(0, 0, 0, h)
    base.addColorStop(0, '#7b2030')
    base.addColorStop(0.55, '#571523')
    base.addColorStop(1, '#3d0c14')
    ctx.fillStyle = base
    ctx.fillRect(0, 0, w, h)

    const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 1.6)
    glow.addColorStop(0, 'rgba(236, 196, 130, 0.28)')
    glow.addColorStop(1, 'rgba(236, 196, 130, 0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, w, h)

    const sheen = ctx.createLinearGradient(0, h, w, 0)
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0)')
    sheen.addColorStop(0.45, 'rgba(255, 240, 205, 0.08)')
    sheen.addColorStop(0.55, 'rgba(255, 240, 205, 0.14)')
    sheen.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = sheen
    ctx.fillRect(0, 0, w, h)

    const vignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.75)
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)')
    vignette.addColorStop(1, 'rgba(22, 5, 9, 0.42)')
    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, w, h)

    const drawBorder = (inset, alpha) => {
      ctx.strokeStyle = `rgba(233, 202, 139, ${alpha})`
      ctx.lineWidth = 1.5
      ctx.strokeRect(inset, inset, w - inset * 2, h - inset * 2)
    }
    drawBorder(10, 0.6)
    drawBorder(16, 0.28)

    ctx.save()
    ctx.shadowColor = 'rgba(22, 6, 10, 0.45)'
    ctx.shadowBlur = 14
    ctx.fillStyle = '#f2d491'
    ctx.font = "500 16px Georgia, 'Times New Roman', serif"
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if ('letterSpacing' in ctx) {
      ctx.letterSpacing = '3px'
    }
    ctx.fillText('SCRATCH TO REVEAL', w / 2, h / 2 - 18)

    ctx.shadowBlur = 0
    ctx.font = "12px Georgia, 'Times New Roman', serif"
    if ('letterSpacing' in ctx) {
      ctx.letterSpacing = '0px'
    }
    ctx.fillText('\u2726', w / 2, h / 2 + 22)
    ctx.fillText('\u2726', w / 2, h / 2 - 42)
    ctx.restore()

    const stroke = () => {
      ctx.strokeStyle = 'rgba(0, 0, 0, 1)'
      ctx.lineWidth = SCRATCH_SIZE
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    }

    const point = (event) => {
      const bounds = canvas.getBoundingClientRect()
      return {
        x: (event.clientX - bounds.left) * (canvas.width / bounds.width),
        y: (event.clientY - bounds.top) * (canvas.height / bounds.height),
      }
    }

    let drawing = false
    let progressScheduled = false

    const checkProgress = () => {
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      let total = 0
      let cleared = 0
      for (let i = 3; i < image.length; i += 4 * SAMPLE_STEP) {
        total += 1
        if (image[i] === 0) {
          cleared += 1
        }
      }
      if (cleared / total >= REVEAL_THRESHOLD) {
        revealedRef.current = true
        setRevealed(true)
      }
    }

    const scheduleProgress = () => {
      if (progressScheduled || revealedRef.current) {
        return
      }
      progressScheduled = true
      requestAnimationFrame(() => {
        progressScheduled = false
        checkProgress()
      })
    }

    const handleDown = (event) => {
      if (revealedRef.current) {
        return
      }
      drawing = true
      canvas.setPointerCapture(event.pointerId)
      const pos = point(event)
      ctx.save()
      stroke()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
      ctx.lineTo(pos.x + 0.1, pos.y + 0.1)
      ctx.stroke()
      ctx.restore()
      scheduleProgress()
    }

    const handleMove = (event) => {
      if (!drawing || revealedRef.current) {
        return
      }
      const pos = point(event)
      ctx.save()
      stroke()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
      ctx.restore()
      scheduleProgress()
    }

    const handleUp = () => {
      drawing = false
    }

    canvas.addEventListener('pointerdown', handleDown)
    canvas.addEventListener('pointermove', handleMove)
    canvas.addEventListener('pointerup', handleUp)
    canvas.addEventListener('pointercancel', handleUp)

    return () => {
      canvas.removeEventListener('pointerdown', handleDown)
      canvas.removeEventListener('pointermove', handleMove)
      canvas.removeEventListener('pointerup', handleUp)
      canvas.removeEventListener('pointercancel', handleUp)
    }
  }, [])

  return (
    <section
      ref={ref}
      className={`scratch-section${revealed ? ' is-revealed' : ''}${inView ? ' is-in-view' : ''}`}
    >
      <h2>Wedding Day</h2>
      <p className="scratch-hint">Scratch the card to reveal our wedding date</p>

      <div
        className={`scratch-card${revealed ? ' is-revealed' : ''}`}
        role="img"
        aria-label="Wedding date hidden. Scratch the card with your mouse or finger to reveal the date and countdown."
      >
        <div className="scratch-reveal">
          <span className="reveal-label">SAVE THE DATE</span>
          <span className="reveal-date">{weddingData.weddingDate}</span>
          {revealed ? <Countdown /> : null}
        </div>
        <canvas ref={canvasRef} className="scratch-canvas" />
        <div className="scratch-cover-sheen" aria-hidden="true" />
      </div>
    </section>
  )
}

function Countdown() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const remaining = Math.max(0, new Date(weddingData.weddingDateISO).getTime() - now)
  const secondsTotal = Math.floor(remaining / 1000)
  const days = Math.floor(secondsTotal / 86400)
  const hours = Math.floor((secondsTotal % 86400) / 3600)
  const minutes = Math.floor((secondsTotal % 3600) / 60)
  const seconds = secondsTotal % 60

  const items = [
    { value: days, label: 'DAYS' },
    { value: String(hours).padStart(2, '0'), label: 'HOURS' },
    { value: String(minutes).padStart(2, '0'), label: 'MINUTES' },
    { value: String(seconds).padStart(2, '0'), label: 'SECONDS' },
  ]

  return (
    <div className="countdown" role="timer" aria-live="polite">
      {items.map((item, index) => (
        <div
          className="countdown-item"
          key={item.label}
          style={{ animationDelay: `${0.5 + index * 0.08}s` }}
        >
          <span className="countdown-value">{item.value}</span>
          <span className="countdown-label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default ScratchSection