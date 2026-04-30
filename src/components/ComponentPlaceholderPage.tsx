import type { MotionSection } from '../routes/content'

type ComponentPlaceholderPageProps = {
  section: MotionSection
}

const stageContent: Record<
  string,
  {
    title: string
    recommended: string
    scenario: string
    frameClassName: string
  }
> = {
  drawer: {
    title: 'Edge-origin panel reveal.',
    recommended: 'Standard',
    scenario: 'Open, close, rapid reopen, mobile width.',
    frameClassName: 'preview-stage__mock preview-stage__mock--drawer',
  },
  'dropdown-menu': {
    title: 'Trigger-attached menu motion.',
    recommended: 'Snappy',
    scenario: 'Open, close, repeated trigger, keyboard use.',
    frameClassName: 'preview-stage__mock preview-stage__mock--menu',
  },
  toast: {
    title: 'Transient stack entry and exit.',
    recommended: 'Standard',
    scenario: 'Burst, dismiss, overlap, reduced motion.',
    frameClassName: 'preview-stage__mock preview-stage__mock--toast',
  },
  accordion: {
    title: 'Content reveal without drag.',
    recommended: 'Standard',
    scenario: 'Repeated toggles, tall content, keyboard use.',
    frameClassName: 'preview-stage__mock preview-stage__mock--accordion',
  },
  tabs: {
    title: 'Indicator-led continuity.',
    recommended: 'Snappy',
    scenario: 'Rapid switching, active-state clarity.',
    frameClassName: 'preview-stage__mock preview-stage__mock--tabs',
  },
}

export function ComponentPlaceholderPage({ section }: ComponentPlaceholderPageProps) {
  const stage = stageContent[section.slug]

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
            <div className="preview-stage__canvas preview-stage__canvas--placeholder">
              <h2>{stage.title}</h2>
              <div className={stage.frameClassName} aria-hidden="true" />
            </div>
          </div>

          <aside className="control-panel">
            <div className="control-panel__block">
              <p className="control-panel__label">Variants</p>
              <div className="variant-grid">
                {section.variants.map(variant => (
                  <span className="variant-chip" key={variant}>
                    {variant}
                  </span>
                ))}
              </div>
            </div>
            <div className="control-panel__block spec-card">
              <p className="control-panel__label">Motion target</p>
              <h2>{stage.recommended}</h2>
              <p className="spec-card__status">{stage.scenario}</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
