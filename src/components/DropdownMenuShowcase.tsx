import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useRef, useState } from 'react'
import type { MotionSection } from '../routes/content'
import { useReducedMotionPreference } from './useReducedMotionPreference'

type DropdownVariant = 'standard' | 'snappy' | 'expressive' | 'slow' | 'reduced'

type DropdownVariantMeta = {
  label: string
  summary: string
  movement: string
  staging: string
  rationale: string
}

const dropdownVariants: { id: DropdownVariant; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'snappy', label: 'Snappy' },
  { id: 'expressive', label: 'Expressive' },
  { id: 'slow', label: 'Slow-mo' },
  { id: 'reduced', label: 'Reduced' },
]

const dropdownVariantMeta: Record<DropdownVariant, DropdownVariantMeta> = {
  standard: {
    label: 'Standard',
    summary: '140ms enter, 100ms exit',
    movement: 'Opacity with a 6px lift and origin at the trigger edge.',
    staging: 'Origin grows from the trigger so the menu feels attached.',
    rationale: 'Balanced default for product navigation menus.',
  },
  snappy: {
    label: 'Snappy',
    summary: '90ms enter, 70ms exit',
    movement: 'Opacity with a 4px lift, no scale.',
    staging: 'Same origin behavior, faster pace for repeated triggering.',
    rationale: 'Best for high-frequency menus where pace matters more than presence.',
  },
  expressive: {
    label: 'Expressive',
    summary: '180ms enter, 130ms exit',
    movement: 'Opacity, 8px lift, and a subtle 0.97 → 1 scale.',
    staging: 'Slightly more presence to mark a deliberate change.',
    rationale: 'Useful when the menu opens an important branch of the UI.',
  },
  slow: {
    label: 'Slow-mo',
    summary: '560ms enter, 400ms exit',
    movement: 'Standard choreography stretched roughly 4× for inspection.',
    staging: 'Origin still grows from the trigger; pace exposes the curve.',
    rationale: 'Inspection variant. Not for production use.',
  },
  reduced: {
    label: 'Reduced motion',
    summary: '90ms enter, 80ms exit',
    movement: 'Opacity only.',
    staging: 'Origin and travel removed; state change stays obvious.',
    rationale: 'Accessibility-first fallback for reduced-motion contexts.',
  },
}

type DropdownShowcaseProps = {
  section: MotionSection
}

export function DropdownMenuShowcase({ section }: DropdownShowcaseProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const previewRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<DropdownVariant>('standard')

  const effectiveVariant = prefersReducedMotion ? 'reduced' : selectedVariant
  const activeVariantMeta = dropdownVariantMeta[effectiveVariant]

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
            <div className="preview-stage__canvas preview-stage__canvas--menu" ref={previewRef}>
              <DropdownMenu.Root onOpenChange={setOpen} open={open}>
                <DropdownMenu.Trigger asChild>
                  <button className="button button--primary" type="button">
                    Open menu
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal container={previewRef.current ?? undefined}>
                  <DropdownMenu.Content
                    align="start"
                    className="dropdown-content"
                    data-motion-profile={effectiveVariant}
                    sideOffset={8}
                  >
                    <DropdownMenu.Item className="dropdown-item">First</DropdownMenu.Item>
                    <DropdownMenu.Item className="dropdown-item">Second</DropdownMenu.Item>
                    <DropdownMenu.Item className="dropdown-item">Third</DropdownMenu.Item>
                    <DropdownMenu.Separator className="dropdown-separator" />
                    <DropdownMenu.Item className="dropdown-item dropdown-item--danger">
                      Destructive
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>

          <aside className="control-panel">
            <div className="control-panel__block">
              <p className="control-panel__label">Variants</p>
              <div aria-label="Dropdown menu motion variants" className="variant-grid" role="group">
                {dropdownVariants.map(variant => (
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
