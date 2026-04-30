import type { MotionSection } from '../routes/content'

type ComponentPlaceholderPageProps = {
  section: MotionSection
}

const stageContent: Record<
  string,
  {
    profile: string
    scenario: string
    frameClassName: string
  }
> = {
  'dropdown-menu': {
    profile: 'Snappy',
    scenario: 'Open, close, repeated trigger, keyboard use.',
    frameClassName: 'preview-stage__mock preview-stage__mock--menu',
  },
  toast: {
    profile: 'Standard',
    scenario: 'Burst, dismiss, overlap, reduced motion.',
    frameClassName: 'preview-stage__mock preview-stage__mock--toast',
  },
  accordion: {
    profile: 'Standard',
    scenario: 'Repeated toggles, tall content, keyboard use.',
    frameClassName: 'preview-stage__mock preview-stage__mock--accordion',
  },
  tabs: {
    profile: 'Snappy',
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
              <p className="control-panel__label">Preview</p>
              <h2>{stage.profile}</h2>
              <p className="spec-card__status">{stage.scenario}</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
