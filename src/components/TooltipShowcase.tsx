import * as Tooltip from '@radix-ui/react-tooltip'
import { useState } from 'react'
import type { MotionSection } from '../routes/content'
import { useReducedMotionPreference } from './useReducedMotionPreference'

type TooltipVariant = 'standard' | 'snappy' | 'expressive' | 'slow' | 'reduced'

type TooltipVariantMeta = {
  label: string
  summary: string
  movement: string
  staging: string
  rationale: string
}

const tooltipVariants: { id: TooltipVariant; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'snappy', label: 'Snappy' },
  { id: 'expressive', label: 'Expressive' },
  { id: 'slow', label: 'Slow-mo' },
  { id: 'reduced', label: 'Reduced' },
]

const tooltipVariantMeta: Record<TooltipVariant, TooltipVariantMeta> = {
  standard: {
    label: 'Standard',
    summary: '500ms delay, 180ms enter',
    movement: 'Fade with a 4px lift; origin grows from the trigger.',
    staging: 'Skips the delay on the next trigger if hovered within 300ms.',
    rationale: 'Balanced default for icon buttons and dense controls.',
  },
  snappy: {
    label: 'Snappy',
    summary: '150ms delay, 120ms enter',
    movement: 'Opacity only; minimal travel.',
    staging: 'Reveals quickly for rapid hover scanning.',
    rationale: 'Best when tooltips assist a high-frequency scan.',
  },
  expressive: {
    label: 'Expressive',
    summary: '500ms delay, 260ms enter',
    movement: 'Opacity, 6px lift, 0.96 → 1 scale from the trigger edge.',
    staging: 'Slightly more presence; the tooltip feels intentional.',
    rationale: 'Useful when the help text carries weight worth pausing on.',
  },
  slow: {
    label: 'Slow-mo',
    summary: '500ms delay, 720ms enter',
    movement: 'Standard choreography stretched roughly 4× for inspection.',
    staging: 'Same origin behavior; pace exposes the curve.',
    rationale: 'Inspection variant. Not for production use.',
  },
  reduced: {
    label: 'Reduced motion',
    summary: '500ms delay, 100ms enter',
    movement: 'Opacity only; no lift or scale.',
    staging: 'Origin still anchors via Radix; just no travel.',
    rationale: 'Accessibility-first fallback for reduced-motion contexts.',
  },
}

const variantDelay: Record<TooltipVariant, number> = {
  standard: 500,
  snappy: 150,
  expressive: 500,
  slow: 500,
  reduced: 500,
}

type TooltipShowcaseProps = {
  section: MotionSection
}

const triggers = [
  { label: 'First', tip: 'First action' },
  { label: 'Second', tip: 'Second action' },
  { label: 'Third', tip: 'Third action' },
]

export function TooltipShowcase({ section }: TooltipShowcaseProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const [selectedVariant, setSelectedVariant] = useState<TooltipVariant>('standard')

  const effectiveVariant = prefersReducedMotion ? 'reduced' : selectedVariant
  const activeVariantMeta = tooltipVariantMeta[effectiveVariant]

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
            <div className="preview-stage__canvas preview-stage__canvas--tooltip">
              <Tooltip.Provider delayDuration={variantDelay[effectiveVariant]} skipDelayDuration={300}>
                <div className="tooltip-row">
                  {triggers.map(t => (
                    <Tooltip.Root key={t.label}>
                      <Tooltip.Trigger asChild>
                        <button className="button button--secondary" type="button">
                          {t.label}
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="tooltip-content"
                          data-motion-profile={effectiveVariant}
                          sideOffset={6}
                        >
                          {t.tip}
                          <Tooltip.Arrow className="tooltip-arrow" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  ))}
                </div>
              </Tooltip.Provider>
            </div>
          </div>

          <aside className="control-panel">
            <div className="control-panel__block">
              <p className="control-panel__label">Variants</p>
              <div aria-label="Tooltip motion variants" className="variant-grid" role="group">
                {tooltipVariants.map(variant => (
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
