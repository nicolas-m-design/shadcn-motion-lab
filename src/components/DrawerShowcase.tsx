import * as Dialog from '@radix-ui/react-dialog'
import { useId, useRef, useState } from 'react'
import type { MotionSection } from '../routes/content'
import { useDocumentTitle } from './useDocumentTitle'
import { useInertOutside } from './useInertOutside'
import { useReducedMotionPreference } from './useReducedMotionPreference'
import { VariantRadioGroup } from './VariantRadioGroup'

type DrawerVariant = 'standard' | 'snappy' | 'expressive' | 'reduced'

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
  useDocumentTitle(section.title)
  const descriptionId = useId()
  const prefersReducedMotion = useReducedMotionPreference()
  const previewRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<DrawerVariant>('standard')

  const effectiveVariant = prefersReducedMotion ? 'reduced' : selectedVariant
  const activeVariantMeta = drawerVariantMeta[effectiveVariant]

  useInertOutside(open, '[data-shell-region="outside"], aside.sidebar')

  const variantOptions = drawerVariants.map(variant => ({
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
            <div className="preview-stage__canvas preview-stage__canvas--drawer" ref={previewRef}>
              <Dialog.Root onOpenChange={setOpen} open={open}>
                <div className="demo-surface demo-surface--drawer" data-shell-region="outside">
                  <div className="demo-surface__row">
                    <div>
                      <span className="demo-surface__eyebrow">Right drawer</span>
                      <h2 className="demo-surface__title">Open drawer.</h2>
                    </div>
                    <Dialog.Trigger asChild>
                      <button className="button button--primary" type="button">
                        Filters
                      </button>
                    </Dialog.Trigger>
                  </div>
                  <div className="demo-list" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
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
                      <div>
                        <Dialog.Title className="dialog-title">Filters</Dialog.Title>
                        <Dialog.Description className="dialog-description" id={descriptionId}>
                          {activeVariantMeta.movement}
                        </Dialog.Description>
                      </div>
                      <Dialog.Close asChild>
                        <button aria-label="Close preview drawer" className="icon-button" type="button">
                          ×
                        </button>
                      </Dialog.Close>
                    </div>

                    <div className="drawer-fields">
                      <div className="drawer-field">
                        <span>Status</span>
                        <strong>Active only</strong>
                      </div>
                      <div className="drawer-field">
                        <span>Owner</span>
                        <strong>Design systems</strong>
                      </div>
                      <div className="drawer-field">
                        <span>Updated</span>
                        <strong>Last 14 days</strong>
                      </div>
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
              <p className="control-panel__label">Variants</p>
              <VariantRadioGroup
                ariaLabel="Drawer motion variants"
                onChange={id => setSelectedVariant(id as DrawerVariant)}
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
