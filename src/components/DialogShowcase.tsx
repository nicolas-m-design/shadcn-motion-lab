import * as Dialog from '@radix-ui/react-dialog'
import { useId, useRef, useState } from 'react'
import type { MotionSection } from '../routes/content'
import { useDocumentTitle } from './useDocumentTitle'
import { useInertOutside } from './useInertOutside'
import { useReducedMotionPreference } from './useReducedMotionPreference'
import { VariantRadioGroup } from './VariantRadioGroup'

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
  useDocumentTitle(section.title)
  const descriptionId = useId()
  const prefersReducedMotion = useReducedMotionPreference()
  const previewRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<DialogVariant>('standard')

  const effectiveVariant = prefersReducedMotion ? 'reduced' : selectedVariant
  const activeVariantMeta = dialogVariantMeta[effectiveVariant]

  useInertOutside(open, '[data-shell-region="outside"], aside.sidebar')

  const variantOptions = dialogVariants.map(variant => ({
    id: variant.id,
    label: variant.label,
    disabled: prefersReducedMotion && variant.id !== 'reduced',
  }))

  return (
    <div className="page">
      <header className="component-hero" data-shell-region="outside">
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
                <div className="demo-surface" data-shell-region="outside">
                  <span className="demo-surface__eyebrow">Centered overlay</span>
                  <h2 className="demo-surface__title">Open dialog.</h2>
                  <p className="demo-surface__copy">Backdrop and surface start together.</p>
                  <Dialog.Trigger asChild>
                    <button className="button button--primary" type="button">
                      Open dialog
                    </button>
                  </Dialog.Trigger>
                </div>
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
                      <div>
                        <Dialog.Title className="dialog-title">Confirm changes</Dialog.Title>
                        <Dialog.Description className="dialog-description" id={descriptionId}>
                          {activeVariantMeta.movement}
                        </Dialog.Description>
                      </div>
                      <Dialog.Close asChild>
                        <button aria-label="Close preview dialog" className="icon-button" type="button">
                          ×
                        </button>
                      </Dialog.Close>
                    </div>

                    <div className="dialog-copy">
                      <p>{activeVariantMeta.staging}</p>
                    </div>

                    <div className="dialog-actions">
                      <Dialog.Close asChild>
                        <button className="button button--secondary" type="button">
                          Cancel
                        </button>
                      </Dialog.Close>
                      <button className="button button--primary" type="button">
                        Apply
                      </button>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>

          <aside className="control-panel" data-shell-region="outside">
            <div className="control-panel__block">
              <p className="control-panel__label" id="dialog-variants-label">
                Variants
              </p>
              <VariantRadioGroup
                ariaLabel="Dialog motion variants"
                onChange={id => setSelectedVariant(id as DialogVariant)}
                options={variantOptions}
                value={effectiveVariant}
              />
              {prefersReducedMotion ? (
                <p className="control-panel__note">
                  System reduced motion is on. Variant locked to Reduced.
                </p>
              ) : null}
            </div>

            <div className="control-panel__block spec-card">
              <p className="control-panel__label">Profile</p>
              <h2>{activeVariantMeta.label}</h2>
              <div className="metric-row">
                <span className="metric-chip">{activeVariantMeta.summary.split(', ')[0]}</span>
                <span className="metric-chip">{activeVariantMeta.summary.split(', ')[1]}</span>
              </div>
              <p>{activeVariantMeta.movement}</p>
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
