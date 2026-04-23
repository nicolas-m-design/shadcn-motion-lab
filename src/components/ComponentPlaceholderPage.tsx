import type { MotionSection } from '../routes/content'

type ComponentPlaceholderPageProps = {
  section: MotionSection
}

const stageContent: Record<
  string,
  {
    eyebrow: string
    title: string
    body: string
    recommended: string
    scenario: string
    frameClassName: string
  }
> = {
  drawer: {
    eyebrow: 'Edge-origin preview',
    title: 'Drawer should read as directional, not heavy.',
    body: 'The stage will compare a short-travel drawer against a slightly more expressive panel while keeping the page content legible behind it.',
    recommended: 'Standard',
    scenario: 'Test open, close, rapid reopen, and mobile-width behavior.',
    frameClassName: 'preview-stage__mock preview-stage__mock--drawer',
  },
  'dropdown-menu': {
    eyebrow: 'High-frequency preview',
    title: 'Menu motion should orient without slowing selection.',
    body: 'This stage will keep the button and menu visible together so subtle stagger choices can be judged in context instead of in isolation.',
    recommended: 'Snappy',
    scenario: 'Test repeated open-close and keyboard navigation rhythm.',
    frameClassName: 'preview-stage__mock preview-stage__mock--menu',
  },
  toast: {
    eyebrow: 'Feedback preview',
    title: 'Toast should be noticeable without hijacking the screen.',
    body: 'The stage will show stacked notifications so timing and overlap can be judged under a realistic burst, not just a single toast.',
    recommended: 'Standard',
    scenario: 'Test stack behavior, dismiss speed, and reduced-motion fallback.',
    frameClassName: 'preview-stage__mock preview-stage__mock--toast',
  },
  accordion: {
    eyebrow: 'Reveal preview',
    title: 'Accordion should clarify expansion without slowing scanning.',
    body: 'The stage will compare content reveal weight, chevron behavior, and repeated toggles across variable-height sections.',
    recommended: 'Standard',
    scenario: 'Test repeat toggles, tall content, and keyboard navigation.',
    frameClassName: 'preview-stage__mock preview-stage__mock--accordion',
  },
  tabs: {
    eyebrow: 'Navigation preview',
    title: 'Tabs should orient through indicator motion, not big panel slides.',
    body: 'The stage will focus on continuity between tab states and whether the indicator does enough work on its own.',
    recommended: 'Snappy',
    scenario: 'Test rapid switching and active-state clarity without motion.',
    frameClassName: 'preview-stage__mock preview-stage__mock--tabs',
  },
}

export function ComponentPlaceholderPage({ section }: ComponentPlaceholderPageProps) {
  const stage = stageContent[section.slug]

  return (
    <div className="page">
      <header className="component-hero">
        <div className="component-hero__copy">
          <p className="eyebrow">{section.category}</p>
          <h1>{section.title}</h1>
          <p className="page-lede">{section.goal}</p>
          <div className="meta-row">
            <span className="meta-chip">4 variants planned</span>
            <span className="meta-chip">Reduced motion included</span>
            <span className="meta-chip meta-chip--warning">Preview mock only</span>
          </div>
        </div>
      </header>

      <section className="content-section content-section--tight" id="preview">
        <div className="preview-grid">
          <div className="preview-stage">
            <div className="preview-stage__canvas preview-stage__canvas--placeholder">
              <p className="eyebrow">{stage.eyebrow}</p>
              <h2>{stage.title}</h2>
              <p>{stage.body}</p>
              <p className="preview-status">
                This page is a route-level scaffold. The stage below is illustrative only and is not interactive yet.
              </p>
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
              <p className="control-panel__hint">
                These are planned variants, not working controls yet.
              </p>
            </div>
            <div className="control-panel__block spec-card">
              <p className="control-panel__label">Selected spec</p>
              <h2>{stage.recommended}</h2>
              <p>{section.intent}</p>
              <p className="spec-card__status">{stage.scenario}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="content-section" id="spec">
        <div className="doc-block">
          <h2>Motion spec</h2>
          <p>{section.goal}</p>
          <ul>
            <li>Planned variants: {section.variants.join(', ')}.</li>
            <li>Primary scenario: {stage.scenario}</li>
            <li>Reduced-motion path is part of v1, not a follow-up task.</li>
          </ul>
        </div>
      </section>

      <section className="content-section" id="implementation">
        <div className="doc-block">
          <h2>Implementation notes</h2>
          <p>{section.implementation}</p>
          <p className="doc-status">
            Implementation for this route has not started yet. The current page establishes content structure and testing expectations only.
          </p>
        </div>
      </section>

      <section className="content-section" id="prompt">
        <div className="doc-block">
          <h2>Prompt template</h2>
          <pre className="code-block">
            <code>{`Implement the ${section.title} motion spec.\n\nConstraints:\n- Keep the default shadcn visual style.\n- Preserve accessibility and keyboard behavior.\n- Add reduced-motion handling.\n- Keep the implementation small and readable.`}</code>
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
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="doc-block">
          <h2>Figma exploration note</h2>
          <p>{section.figma}</p>
        </div>
      </section>
    </div>
  )
}
