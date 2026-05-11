import * as Tabs from '@radix-ui/react-tabs'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { MotionSection } from '../routes/content'
import { useReducedMotionPreference } from './useReducedMotionPreference'

type TabsVariant = 'standard' | 'snappy' | 'expressive' | 'slow' | 'reduced'

type TabsVariantMeta = {
  label: string
  summary: string
  movement: string
  staging: string
  rationale: string
}

const tabsVariants: { id: TabsVariant; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'snappy', label: 'Snappy' },
  { id: 'expressive', label: 'Expressive' },
  { id: 'slow', label: 'Slow-mo' },
  { id: 'reduced', label: 'Reduced' },
]

const tabsVariantMeta: Record<TabsVariant, TabsVariantMeta> = {
  standard: {
    label: 'Standard',
    summary: '280ms pill, 200ms label',
    movement: 'Pill slides; label drifts in with a touch of blur as the pill arrives.',
    staging: 'Pill width tracks the active label as it expands.',
    rationale: 'Balanced default for primary-navigation tab bars.',
  },
  snappy: {
    label: 'Snappy',
    summary: '180ms pill, 120ms label',
    movement: 'Pill slides; label fades without blur.',
    staging: 'Faster commit; minimal blur on the label arrival.',
    rationale: 'Best when tab switching is high-frequency.',
  },
  expressive: {
    label: 'Expressive',
    summary: '380ms pill, 280ms label',
    movement: 'Pill slides; label arrives with a heavier blur clear.',
    staging: 'Longer settle; heavier blur clear on the label.',
    rationale: 'Useful when a tab change marks a real context shift.',
  },
  slow: {
    label: 'Slow-mo',
    summary: '1120ms pill, 800ms label',
    movement: 'Standard choreography stretched roughly 4× for inspection.',
    staging: 'Same arrival behavior; pace exposes the curve.',
    rationale: 'Inspection variant. Not for production use.',
  },
  reduced: {
    label: 'Reduced motion',
    summary: '0ms pill, 120ms label',
    movement: 'Pill snaps; label opacity carries the state cue.',
    staging: 'No blur, no slide.',
    rationale: 'Accessibility-first fallback for reduced-motion contexts.',
  },
}

const tabItems = [
  {
    value: 'one',
    label: 'First',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="5" y="5" width="14" height="14" rx="2.4" />
      </svg>
    ),
  },
  {
    value: 'two',
    label: 'Second',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="7" />
      </svg>
    ),
  },
  {
    value: 'three',
    label: 'Third',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="12,5 19.5,18 4.5,18" />
      </svg>
    ),
  },
  {
    value: 'four',
    label: 'Fourth',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="12,4 20,12 12,20 4,12" />
      </svg>
    ),
  },
] as const

const transitionDurationMap: Record<TabsVariant, number> = {
  standard: 280,
  snappy: 180,
  expressive: 380,
  slow: 1120,
  reduced: 0,
}

type TabsShowcaseProps = {
  section: MotionSection
}

export function TabsShowcase({ section }: TabsShowcaseProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const [selectedVariant, setSelectedVariant] = useState<TabsVariant>('standard')
  const [active, setActive] = useState<string>('one')
  const [transitFrom, setTransitFrom] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const pillRectRef = useRef({ left: 0, width: 0 })
  const [pillRect, setPillRect] = useState({ left: 0, width: 0 })

  const triggerSetters = useMemo(() => {
    const setters: Record<string, (el: HTMLButtonElement | null) => void> = {}
    for (const tab of tabItems) {
      setters[tab.value] = el => {
        triggerRefs.current[tab.value] = el
      }
    }
    return setters
  }, [])

  const effectiveVariant = prefersReducedMotion ? 'reduced' : selectedVariant
  const activeVariantMeta = tabsVariantMeta[effectiveVariant]

  const activeIndex = tabItems.findIndex(t => t.value === active)
  const transitFromIndex = transitFrom ? tabItems.findIndex(t => t.value === transitFrom) : -1

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const el = triggerRefs.current[active]
      if (!el) return
      const listRect = list.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const next = { left: elRect.left - listRect.left, width: elRect.width }
      const prev = pillRectRef.current
      if (prev.left === next.left && prev.width === next.width) return
      pillRectRef.current = next
      setPillRect(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    Object.values(triggerRefs.current).forEach(el => el && ro.observe(el))
    ro.observe(list)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [active])

  const handleChange = (next: string) => {
    if (next === active) return
    setTransitFrom(active)
    setActive(next)
    const duration = transitionDurationMap[effectiveVariant]
    window.setTimeout(() => setTransitFrom(null), duration + 60)
  }

  const isDividerHidden = (i: number) => {
    if (i === activeIndex || i + 1 === activeIndex) return true
    if (transitFromIndex !== -1) {
      const lo = Math.min(transitFromIndex, activeIndex)
      const hi = Math.max(transitFromIndex, activeIndex)
      if (i >= lo && i + 1 <= hi) return true
    }
    return false
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
            <div className="preview-stage__canvas preview-stage__canvas--tabs">
              <Tabs.Root
                activationMode="manual"
                className="tabs-root"
                data-motion-profile={effectiveVariant}
                onValueChange={handleChange}
                value={active}
              >
                <Tabs.List
                  aria-label="Demo tabs"
                  className="tabs-list"
                  ref={listRef}
                >
                  <span
                    aria-hidden="true"
                    className="tabs-pill"
                    style={{
                      transform: `translateX(${pillRect.left}px)`,
                      width: pillRect.width,
                    }}
                  />
                  {tabItems.map((tab, i) => {
                    const isActive = tab.value === active
                    return (
                      <div className="tabs-slot" key={tab.value}>
                        <Tabs.Trigger
                          aria-label={tab.label}
                          className="tabs-trigger"
                          ref={triggerSetters[tab.value]}
                          value={tab.value}
                        >
                          <span className="tabs-icon">{tab.icon}</span>
                          <span
                            className="tabs-label"
                            data-state={isActive ? 'active' : 'inactive'}
                          >
                            {tab.label}
                          </span>
                        </Tabs.Trigger>
                        {i < tabItems.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="tabs-divider"
                            data-hidden={isDividerHidden(i) ? 'true' : 'false'}
                          />
                        )}
                      </div>
                    )
                  })}
                </Tabs.List>
              </Tabs.Root>
            </div>
          </div>

          <aside className="control-panel">
            <div className="control-panel__block">
              <p className="control-panel__label">Variants</p>
              <div aria-label="Tabs motion variants" className="variant-grid" role="group">
                {tabsVariants.map(variant => (
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
              <p>{prefersReducedMotion ? 'Reduced profile active.' : activeVariantMeta.movement}</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
