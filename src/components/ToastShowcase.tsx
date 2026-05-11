import { useEffect, useRef, useState } from 'react'
import type { MotionSection } from '../routes/content'
import { useReducedMotionPreference } from './useReducedMotionPreference'

type ToastVariant = 'single' | 'burst' | 'stack-collapsed' | 'stack-expanded' | 'reduced'

type ToastVariantMeta = {
  label: string
  summary: string
  movement: string
  staging: string
  rationale: string
}

const toastVariants: { id: ToastVariant; label: string }[] = [
  { id: 'single', label: 'Single' },
  { id: 'burst', label: 'Burst' },
  { id: 'stack-collapsed', label: 'Stack collapsed' },
  { id: 'stack-expanded', label: 'Stack expanded' },
  { id: 'reduced', label: 'Reduced' },
]

const toastVariantMeta: Record<ToastVariant, ToastVariantMeta> = {
  single: {
    label: 'Single',
    summary: '220ms enter, 160ms exit',
    movement: 'One toast at a time; new ones replace the current.',
    staging: 'Replace-on-trigger keeps the corner quiet.',
    rationale: 'Best when toasts are rare and one-at-a-time is enough.',
  },
  burst: {
    label: 'Burst',
    summary: '220ms enter, 80ms stagger',
    movement: 'Up to three toasts pop in quick succession, each offset by 80ms.',
    staging: 'Stagger lets the eye catch separate events without overlap.',
    rationale: 'Useful for short bursts of related notifications.',
  },
  'stack-collapsed': {
    label: 'Stack collapsed',
    summary: '240ms enter, 0.94 scale step',
    movement: 'New toast on top; older ones scale down and translate behind.',
    staging: 'Stack reads as one object; hover or focus expands it.',
    rationale: 'Best when many toasts may arrive but one matters most.',
  },
  'stack-expanded': {
    label: 'Stack expanded',
    summary: '240ms enter, full list',
    movement: 'New toasts push older ones up; nothing is hidden.',
    staging: 'Older toasts stay legible at the cost of vertical space.',
    rationale: 'Useful when each toast carries unique information.',
  },
  reduced: {
    label: 'Reduced motion',
    summary: '120ms enter, opacity only',
    movement: 'Fade in and fade out; no slide or scale.',
    staging: 'Stack behavior is dropped; toasts arrive one at a time.',
    rationale: 'Accessibility-first fallback for reduced-motion contexts.',
  },
}

type ToastShowcaseProps = {
  section: MotionSection
}

type ToastItem = {
  id: number
  title: string
}

let toastIdCounter = 0

const sampleTitles = [
  'First notice',
  'Second notice',
  'Third notice',
  'Fourth notice',
  'Fifth notice',
]

export function ToastShowcase({ section }: ToastShowcaseProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const [selectedVariant, setSelectedVariant] = useState<ToastVariant>('single')
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [expanded, setExpanded] = useState(false)
  const [paused, setPaused] = useState(false)
  const timersRef = useRef<Map<number, { remove: () => void; remaining: number; startedAt: number; timerId: number }>>(new Map())
  const burstTimersRef = useRef<Set<number>>(new Set())

  const effectiveVariant = prefersReducedMotion ? 'reduced' : selectedVariant
  const activeVariantMeta = toastVariantMeta[effectiveVariant]

  useEffect(() => {
    const timers = timersRef.current
    const bursts = burstTimersRef.current
    return () => {
      timers.forEach(entry => window.clearTimeout(entry.timerId))
      timers.clear()
      bursts.forEach(id => window.clearTimeout(id))
      bursts.clear()
    }
  }, [])

  useEffect(() => {
    setToasts([])
    setExpanded(false)
    setPaused(false)
    timersRef.current.forEach(entry => window.clearTimeout(entry.timerId))
    timersRef.current.clear()
    burstTimersRef.current.forEach(id => window.clearTimeout(id))
    burstTimersRef.current.clear()
  }, [selectedVariant])

  const dismiss = (id: number) => {
    const entry = timersRef.current.get(id)
    if (entry) {
      window.clearTimeout(entry.timerId)
      timersRef.current.delete(id)
    }
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const scheduleRemoval = (id: number, ms: number) => {
    const startedAt = Date.now()
    const remove = () => {
      setToasts(prev => prev.filter(t => t.id !== id))
      timersRef.current.delete(id)
    }
    const timerId = window.setTimeout(remove, ms)
    timersRef.current.set(id, { remove, remaining: ms, startedAt, timerId })
  }

  const pauseAll = () => {
    if (paused) return
    setPaused(true)
    const now = Date.now()
    timersRef.current.forEach((entry, id) => {
      window.clearTimeout(entry.timerId)
      const elapsed = now - entry.startedAt
      const remaining = Math.max(0, entry.remaining - elapsed)
      timersRef.current.set(id, { ...entry, remaining, timerId: 0 })
    })
  }

  const resumeAll = () => {
    if (!paused) return
    setPaused(false)
    const now = Date.now()
    timersRef.current.forEach((entry, id) => {
      const timerId = window.setTimeout(entry.remove, entry.remaining)
      timersRef.current.set(id, { ...entry, startedAt: now, timerId })
    })
  }

  const pushOne = (title: string, lifespan = 4500) => {
    const id = ++toastIdCounter
    setToasts(prev => {
      if (effectiveVariant === 'single' || effectiveVariant === 'reduced') {
        return [{ id, title }]
      }
      const max = effectiveVariant === 'burst' ? 3 : 5
      const next = [...prev, { id, title }]
      return next.slice(-max)
    })
    scheduleRemoval(id, lifespan)
  }

  const handleTrigger = () => {
    const title = sampleTitles[toastIdCounter % sampleTitles.length]
    if (effectiveVariant === 'burst') {
      pushOne(title)
      const id1 = window.setTimeout(() => {
        pushOne(sampleTitles[(toastIdCounter + 1) % sampleTitles.length])
        burstTimersRef.current.delete(id1)
      }, 80)
      const id2 = window.setTimeout(() => {
        pushOne(sampleTitles[(toastIdCounter + 2) % sampleTitles.length])
        burstTimersRef.current.delete(id2)
      }, 160)
      burstTimersRef.current.add(id1)
      burstTimersRef.current.add(id2)
      return
    }
    pushOne(title)
  }

  const reversed = [...toasts].reverse() // newest first

  const isCollapsed = effectiveVariant === 'stack-collapsed' && !expanded
  const stackStyle = (index: number, total: number) => {
    if (isCollapsed) {
      const depth = Math.min(index, 2)
      return {
        transform: `translateY(${depth * -8}px) scale(${1 - depth * 0.06})`,
        opacity: depth === 2 ? 0.5 : 1,
        zIndex: total - index,
      }
    }
    return { transform: 'translateY(0) scale(1)', opacity: 1, zIndex: total - index }
  }

  return (
    <div className="page">
      <header className="component-hero">
        <div className="component-hero__copy">
          <h1>{section.title}</h1>
          <p className="page-lede">{section.goal}</p>
        </div>
      </header>

      <section className="content-section content-section--tight" id="preview">
        <div className="preview-grid">
          <div className="preview-stage">
            <div className="preview-stage__canvas preview-stage__canvas--toast">
              <button className="button button--primary" onClick={handleTrigger} type="button">
                Trigger toast
              </button>
              <div
                aria-label="Notifications"
                aria-live="polite"
                aria-relevant="additions"
                className="toast-region"
                data-motion-profile={effectiveVariant}
                onBlur={resumeAll}
                onFocus={pauseAll}
                onMouseEnter={() => {
                  pauseAll()
                  if (effectiveVariant === 'stack-collapsed') setExpanded(true)
                }}
                onMouseLeave={() => {
                  resumeAll()
                  if (effectiveVariant === 'stack-collapsed') setExpanded(false)
                }}
                role="region"
              >
                {reversed.map((toast, index) => (
                  <div
                    className="toast"
                    data-motion-profile={effectiveVariant}
                    key={toast.id}
                    role="status"
                    style={stackStyle(index, reversed.length)}
                  >
                    <span className="toast__dot" aria-hidden="true" />
                    <span className="toast__title">{toast.title}</span>
                    <button
                      aria-label={`Dismiss ${toast.title}`}
                      className="toast__dismiss"
                      onClick={() => dismiss(toast.id)}
                      type="button"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="control-panel">
            <div className="control-panel__block">
              <p className="control-panel__label">Variants</p>
              <div aria-label="Toast motion variants" className="variant-grid" role="group">
                {toastVariants.map(variant => (
                  <button
                    aria-pressed={selectedVariant === variant.id}
                    className={`variant-chip ${selectedVariant === variant.id ? 'variant-chip--active' : ''}`}
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    type="button"
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-panel__block spec-card">
              <h2>{activeVariantMeta.label}</h2>
              <div className="metric-row" aria-label={`Selected timing: ${activeVariantMeta.summary}`}>
                <span className="metric-chip">{activeVariantMeta.summary.split(', ')[0]}</span>
                <span className="metric-chip">{activeVariantMeta.summary.split(', ')[1]}</span>
              </div>
              <p>{prefersReducedMotion ? 'Reduced profile active.' : activeVariantMeta.staging}</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
