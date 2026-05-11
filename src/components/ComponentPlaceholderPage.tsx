import type { MotionSection } from '../routes/content'

type ComponentPlaceholderPageProps = {
  section: MotionSection
}

export function ComponentPlaceholderPage({ section }: ComponentPlaceholderPageProps) {
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
              <div className="preview-stage__mock preview-stage__mock--toast" aria-hidden="true" />
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
              <p className="spec-card__status">Coming soon — burst, dismiss, overlap, reduced motion.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
