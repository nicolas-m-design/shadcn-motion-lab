import * as Accordion from '@radix-ui/react-accordion'
import { useState } from 'react'
import type { MotionSection } from '../routes/content'
import { useReducedMotionPreference } from './useReducedMotionPreference'

type AccordionVariant = 'standard' | 'snappy' | 'expressive' | 'slow' | 'reduced'

type AccordionVariantMeta = {
  label: string
  summary: string
  movement: string
  staging: string
  rationale: string
}

const accordionVariants: { id: AccordionVariant; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'snappy', label: 'Snappy' },
  { id: 'expressive', label: 'Expressive' },
  { id: 'slow', label: 'Slow-mo' },
  { id: 'reduced', label: 'Reduced' },
]

const accordionVariantMeta: Record<AccordionVariant, AccordionVariantMeta> = {
  standard: {
    label: 'Standard',
    summary: '220ms expand, 160ms collapse',
    movement: 'Height with opacity fade on inner content.',
    staging: 'Container height drives the motion; content fades to mask the bottom edge.',
    rationale: 'Balanced default for FAQ-style and disclosure patterns.',
  },
  snappy: {
    label: 'Snappy',
    summary: '140ms expand, 110ms collapse',
    movement: 'Height with shorter fade.',
    staging: 'Same staging, tighter pace for repeated toggling.',
    rationale: 'Best when the accordion is used to scan many sections.',
  },
  expressive: {
    label: 'Expressive',
    summary: '300ms expand, 220ms collapse',
    movement: 'Height with a longer ease and slower content fade.',
    staging: 'More room for the reveal to feel deliberate.',
    rationale: 'Useful when each section carries weight worth pausing on.',
  },
  slow: {
    label: 'Slow-mo',
    summary: '880ms expand, 640ms collapse',
    movement: 'Standard choreography stretched roughly 4× for inspection.',
    staging: 'Same height-then-fade behavior; pace exposes the curve.',
    rationale: 'Inspection variant. Not for production use.',
  },
  reduced: {
    label: 'Reduced motion',
    summary: '120ms expand, 100ms collapse',
    movement: 'Opacity only; height switches without animation.',
    staging: 'Layout changes are immediate; opacity carries the state cue.',
    rationale: 'Accessibility-first fallback for reduced-motion contexts.',
  },
}

type AccordionShowcaseProps = {
  section: MotionSection
}

const accordionItems = [
  {
    value: 'enter',
    question: 'How should the panel enter?',
    answer:
      'Drive the container height from zero to its measured size. Fade the inner content slightly behind it so the bottom edge resolves cleanly.',
  },
  {
    value: 'exit',
    question: 'Should collapse mirror expand?',
    answer:
      'Usually no. Exit can run a hair faster so the layout settles quickly. Keep the easing curve symmetrical so the motion still feels like one gesture.',
  },
  {
    value: 'reduced',
    question: 'What about reduced motion?',
    answer:
      'Drop the height transition entirely and let opacity handle the state cue. The layout still updates; just without travel.',
  },
]

export function AccordionShowcase({ section }: AccordionShowcaseProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const [selectedVariant, setSelectedVariant] = useState<AccordionVariant>('standard')

  const effectiveVariant = prefersReducedMotion ? 'reduced' : selectedVariant
  const activeVariantMeta = accordionVariantMeta[effectiveVariant]

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
            <div className="preview-stage__canvas preview-stage__canvas--accordion">
              <Accordion.Root
                className="accordion-root"
                collapsible
                data-motion-profile={effectiveVariant}
                defaultValue="enter"
                type="single"
              >
                {accordionItems.map(item => (
                  <Accordion.Item className="accordion-item" key={item.value} value={item.value}>
                    <Accordion.Header className="accordion-header">
                      <Accordion.Trigger className="accordion-trigger">
                        <span>{item.question}</span>
                        <span aria-hidden="true" className="accordion-chevron">
                          ›
                        </span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="accordion-content">
                      <div className="accordion-content__inner">
                        <p>{item.answer}</p>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </div>

          <aside className="control-panel">
            <div className="control-panel__block">
              <p className="control-panel__label">Variants</p>
              <div aria-label="Accordion motion variants" className="variant-grid" role="group">
                {accordionVariants.map(variant => (
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
