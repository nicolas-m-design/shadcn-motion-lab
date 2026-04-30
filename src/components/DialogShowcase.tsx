import * as Dialog from '@radix-ui/react-dialog'
import { useId, useState } from 'react'
import type { MotionSection } from '../routes/content'
import { useReducedMotionPreference } from './useReducedMotionPreference'

type DialogVariant = 'standard' | 'snappy' | 'expressive' | 'reduced'

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
            <div className="preview-stage__canvas preview-stage__canvas--dialog">
              <div className="preview-stage__window">
                <div className="preview-stage__toolbar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="preview-stage__body">
                  <h2>Open dialog.</h2>
                  <Dialog.Root onOpenChange={setOpen} open={open}>
                    <Dialog.Trigger asChild>
                      <button className="button button--primary" type="button">
                        Open dialog
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
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
                          <div>
                            <Dialog.Title className="dialog-title">Review motion intent</Dialog.Title>
                            <Dialog.Description className="dialog-description" id={descriptionId}>
                              Plain shell. Visible choreography.
                            </Dialog.Description>
                          </div>
                          <Dialog.Close asChild>
                            <button
                              aria-label="Close preview dialog"
                              className="icon-button"
                              type="button"
                            >
                              ×
                            </button>
                          </Dialog.Close>
                        </div>

                        <div className="dialog-details">
                          <div className="dialog-detail">
                            <span>Profile</span>
                            <strong>{activeVariantMeta.label}</strong>
                          </div>
                          <div className="dialog-detail">
                            <span>Movement</span>
                            <strong>{activeVariantMeta.movement}</strong>
                          </div>
                          <div className="dialog-detail">
                            <span>Accessibility</span>
                            <strong>Focus trap, escape, close preserved</strong>
                          </div>
                        </div>

                        <div className="dialog-actions">
                          <Dialog.Close asChild>
                            <button className="button button--secondary" type="button">
                              Close
                            </button>
                          </Dialog.Close>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              </div>
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
              <p className="control-panel__label">Motion target</p>
              <h2>{activeVariantMeta.label}</h2>
              <div className="metric-row" aria-label={`Selected timing: ${activeVariantMeta.summary}`}>
                <span className="metric-chip">{activeVariantMeta.summary.split(', ')[0]}</span>
                <span className="metric-chip">{activeVariantMeta.summary.split(', ')[1]}</span>
              </div>
              <p>{activeVariantMeta.staging}</p>
              <p className="spec-card__status">
                {prefersReducedMotion ? 'Reduced profile active.' : activeVariantMeta.rationale}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
