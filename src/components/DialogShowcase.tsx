import * as Dialog from '@radix-ui/react-dialog'
import { useId, useRef, useState } from 'react'
import type { MotionSection } from '../routes/content'
import { useReducedMotionPreference } from './useReducedMotionPreference'

type DialogVariant = 'standard' | 'snappy' | 'expressive' | 'slow' | 'reduced'

type DialogVariantMeta = {
  label: string
  summary: string
  movement: string
  staging: string
  rationale: string
}

const dialogVariants: { id: DialogVariant; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'snappy', label: 'Snappy' },
  { id: 'expressive', label: 'Expressive' },
  { id: 'slow', label: 'Slow-mo' },
  { id: 'reduced', label: 'Reduced' },
]

const dialogVariantMeta: Record<DialogVariant, DialogVariantMeta> = {
  standard: {
    label: 'Standard',
    summary: '220ms enter, 160ms exit',
    movement: 'Opacity with a 14px upward settle.',
    staging: 'Backdrop and surface start simultaneously.',
    rationale: 'Balanced default for most product surfaces.',
  },
  snappy: {
    label: 'Snappy',
    summary: '150ms enter, 120ms exit',
    movement: 'Opacity with an 8px settle.',
    staging: 'Same choreography, tuned for faster repetition.',
    rationale: 'Best for high-frequency internal tools.',
  },
  expressive: {
    label: 'Expressive',
    summary: '280ms enter, 200ms exit',
    movement: 'Opacity with an 18px settle and a longer ease.',
    staging: 'Same start time, slightly more travel for added presence.',
    rationale: 'Useful when the modal change should feel more intentional.',
  },
  slow: {
    label: 'Slow-mo',
    summary: '880ms enter, 640ms exit',
    movement: 'Standard choreography stretched roughly 4× for inspection.',
    staging: 'Backdrop and surface still start together; pace exposes the easing.',
    rationale: 'Inspection variant. Not for production use.',
  },
  reduced: {
    label: 'Reduced motion',
    summary: '120ms enter, 100ms exit',
    movement: 'Opacity only.',
    staging: 'State change remains obvious with travel removed.',
    rationale: 'Accessibility-first fallback for reduced-motion contexts.',
  },
}

type DialogShowcaseProps = {
  section: MotionSection
}

export function DialogShowcase({ section }: DialogShowcaseProps) {
  const descriptionId = useId()
  const prefersReducedMotion = useReducedMotionPreference()
  const previewRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<DialogVariant>('standard')

  const effectiveVariant = prefersReducedMotion ? 'reduced' : selectedVariant
  const activeVariantMeta = dialogVariantMeta[effectiveVariant]

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
            <div className="preview-stage__canvas preview-stage__canvas--dialog" ref={previewRef}>
              <Dialog.Root onOpenChange={setOpen} open={open}>
                <Dialog.Trigger asChild>
                  <button className="button button--primary" type="button">
                    Open dialog
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal container={previewRef.current ?? undefined}>
                  <Dialog.Overlay
                    forceMount
                    className="dialog-overlay"
                    data-motion-profile={effectiveVariant}
                  />
                  <Dialog.Content
                    forceMount
                    aria-describedby={descriptionId}
                    className="dialog-content"
                    data-motion-profile={effectiveVariant}
                  >
                    <div className="dialog-content__header">
                      <Dialog.Title className="dialog-title">Dialog</Dialog.Title>
                      <Dialog.Close asChild>
                        <button aria-label="Close preview dialog" className="icon-button" type="button">
                          ×
                        </button>
                      </Dialog.Close>
                    </div>
                    <Dialog.Description className="dialog-description" id={descriptionId}>
                      Surface content lives here.
                    </Dialog.Description>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>

          <aside className="control-panel">
            <div className="control-panel__block">
              <p className="control-panel__label">Variants</p>
              <div aria-label="Dialog motion variants" className="variant-grid" role="group">
                {dialogVariants.map(variant => (
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
