import * as Dialog from '@radix-ui/react-dialog'
import { useId, useState } from 'react'
import type { PatternSection } from '../routes/content'
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

const dialogCodeSnippet = `const effectiveVariant = prefersReducedMotion ? 'reduced' : selectedVariant

<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger asChild>
    <button className="button button--primary">Open dialog</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay forceMount className="dialog-overlay" data-motion-profile={effectiveVariant} />
    <Dialog.Content forceMount className="dialog-content" data-motion-profile={effectiveVariant}>
      ...
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`

const dialogPrompt = `Implement the Dialog motion spec.

Use the shared defaults in src/content/rules/motion-rules.md unless this spec overrides them.

Constraints:
- Keep the default shadcn visual tone.
- Use translate plus opacity first.
- Start backdrop and surface simultaneously.
- Exit should feel faster than entry.
- Preserve focus handling and keyboard dismissal.
- Respect prefers-reduced-motion with an opacity-only path.
- Keep the code small and CSS-first.

Deliver:
- working interaction
- concise implementation notes
- brief rule audit listing which shared rules were applied or intentionally overridden.`

type DialogShowcaseProps = {
  section: PatternSection
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
      <header className="component-hero component-hero--with-aside">
        <div className="component-hero__copy">
          <p className="eyebrow">{section.category}</p>
          <h1>{section.title}</h1>
          <p className="page-lede">{section.purpose}</p>
          <div className="meta-row">
            <span className="meta-chip">4 variants</span>
            <span className="meta-chip">Reduced motion aware</span>
          </div>
        </div>

        <aside className="hero-start-card">
          <p className="control-panel__label">Start here</p>
          <h2>Test the live dialog first.</h2>
          <ol>
            <li>Open the dialog from the preview stage.</li>
            <li>Close it with the backdrop, close button, or Escape.</li>
            <li>Reopen quickly, then compare against Snappy.</li>
          </ol>
        </aside>
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
                  <p className="eyebrow">Live preview</p>
                  <h2>Open the dialog from inside the stage.</h2>
                  <p>Everything needed to test the interaction is visible without switching tabs or scanning the page first.</p>
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
                              This preview keeps the visual shell plain so the choreography is the main thing under review.
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
                            <strong>Focus trap, escape, and close button preserved</strong>
                          </div>
                        </div>

                        <div className="dialog-actions">
                          <Dialog.Close asChild>
                            <button className="button button--secondary" type="button">
                              Close
                            </button>
                          </Dialog.Close>
                          <button className="button button--ghost" type="button">
                            Keep iterating
                          </button>
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
              <div
                aria-label="Dialog motion variants"
                className="variant-grid"
                role="group"
              >
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
              <p className="control-panel__label">Selected spec</p>
              <h2>{activeVariantMeta.label}</h2>
              <div className="metric-row" aria-label={`Selected timing: ${activeVariantMeta.summary}`}>
                <span className="metric-chip">{activeVariantMeta.summary.split(', ')[0]}</span>
                <span className="metric-chip">{activeVariantMeta.summary.split(', ')[1]}</span>
              </div>
              <p>{activeVariantMeta.movement}</p>
              <p>{activeVariantMeta.staging}</p>
              <p className="spec-card__status">
                {prefersReducedMotion
                  ? 'System reduced motion is active, so the preview is currently showing the reduced profile.'
                  : activeVariantMeta.rationale}
              </p>
            </div>

          </aside>
        </div>
      </section>

      <section className="content-section" id="spec">
        <div className="doc-block">
          <h2>Motion spec</h2>
          <ul>
            <li>Intent: clear layer entry without slowing repeated use.</li>
            <li>Trigger: open or close the dialog from the preview stage.</li>
            <li>Behavior: opacity plus upward settle, with faster exit than entry.</li>
            <li>Staging: backdrop and surface start simultaneously.</li>
            <li>Reduced motion: opacity-only state change.</li>
          </ul>
        </div>
      </section>

      <section className="content-section" id="implementation">
        <div className="doc-block">
          <h2>Implementation notes</h2>
          <p>{section.implementation}</p>
          <p>
            The demo uses Radix Dialog for semantics and focus management, while motion stays CSS-first through
            `data-state` and `data-motion-profile`.
          </p>
          <pre className="code-block">
            <code>{dialogCodeSnippet}</code>
          </pre>
        </div>
      </section>

      <section className="content-section" id="prompt">
        <div className="doc-block">
          <h2>Prompt template</h2>
          <pre className="code-block">
            <code>{dialogPrompt}</code>
          </pre>
        </div>
      </section>

      <section className="content-section" id="checks">
        <div className="doc-block">
          <h2>Reliability checks</h2>
          <ul>
            {section.checks.map(check => (
              <li key={check}>{check}</li>
            ))}
            <li>Backdrop and surface still feel simultaneous after visual polish changes.</li>
          </ul>
        </div>
      </section>

    </div>
  )
}
