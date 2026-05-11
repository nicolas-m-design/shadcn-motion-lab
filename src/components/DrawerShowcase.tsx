import * as Dialog from '@radix-ui/react-dialog'
import { useId, useRef, useState } from 'react'
import type { MotionSection } from '../routes/content'
import { useReducedMotionPreference } from './useReducedMotionPreference'

type DrawerVariant = 'standard' | 'snappy' | 'expressive' | 'slow' | 'reduced'

type DrawerVariantMeta = {
  label: string
  summary: string
  movement: string
  staging: string
  rationale: string
}

const drawerVariants: { id: DrawerVariant; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'snappy', label: 'Snappy' },
  { id: 'expressive', label: 'Expressive' },
  { id: 'slow', label: 'Slow-mo' },
  { id: 'reduced', label: 'Reduced' },
]

const drawerVariantMeta: Record<DrawerVariant, DrawerVariantMeta> = {
  standard: {
    label: 'Standard',
    summary: '240ms enter, 160ms exit',
    movement: 'Opacity with a 28px edge slide.',
    staging: 'Backdrop leads by a hair, then the panel settles in.',
    rationale: 'Good default when the panel should feel directional, not heavy.',
  },
  snappy: {
    label: 'Snappy',
    summary: '170ms enter, 120ms exit',
    movement: 'Opacity with an 18px edge slide.',
    staging: 'Same order, shortened for frequent use.',
    rationale: 'Best when the drawer behaves more like a utility tray.',
  },
  expressive: {
    label: 'Expressive',
    summary: '300ms enter, 210ms exit',
    movement: 'Opacity with a 36px edge slide and a longer settle.',
    staging: 'The backdrop softens in first, then the panel lands with more presence.',
    rationale: 'Useful when the drawer is the main transition on the screen.',
  },
  slow: {
    label: 'Slow-mo',
    summary: '960ms enter, 640ms exit',
    movement: 'Standard choreography stretched roughly 4× for inspection.',
    staging: 'Same backdrop lead, exaggerated edge slide.',
    rationale: 'Inspection variant. Not for production use.',
  },
  reduced: {
    label: 'Reduced motion',
    summary: '120ms enter, 100ms exit',
    movement: 'Opacity with a 6px edge settle.',
    staging: 'Direction stays visible with most travel removed.',
    rationale: 'Accessibility-first fallback for reduced-motion contexts.',
  },
}

type DrawerShowcaseProps = {
  section: MotionSection
}

export function DrawerShowcase({ section }: DrawerShowcaseProps) {
  const descriptionId = useId()
  const prefersReducedMotion = useReducedMotionPreference()
  const previewRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<DrawerVariant>('standard')

  const effectiveVariant = prefersReducedMotion ? 'reduced' : selectedVariant
  const activeVariantMeta = drawerVariantMeta[effectiveVariant]

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
            <div className="preview-stage__canvas preview-stage__canvas--drawer" ref={previewRef}>
              <Dialog.Root onOpenChange={setOpen} open={open}>
                <Dialog.Trigger asChild>
                  <button className="button button--primary" type="button">
                    Open drawer
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal container={previewRef.current ?? undefined}>
                  <Dialog.Overlay
                    forceMount
                    className="drawer-overlay"
                    data-motion-profile={effectiveVariant}
                  />
                  <Dialog.Content
                    forceMount
                    aria-describedby={descriptionId}
                    className="drawer-content"
                    data-motion-profile={effectiveVariant}
                  >
                    <div className="dialog-content__header">
                      <Dialog.Title className="dialog-title">Drawer</Dialog.Title>
                      <Dialog.Close asChild>
                        <button aria-label="Close preview drawer" className="icon-button" type="button">
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
              <div aria-label="Drawer motion variants" className="variant-grid" role="group">
                {drawerVariants.map(variant => (
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
