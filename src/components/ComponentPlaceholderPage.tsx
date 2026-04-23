import type { PatternSection } from '../routes/content'

type ComponentPlaceholderPageProps = {
  section: PatternSection
}

const stageContent: Record<
  string,
  {
    eyebrow: string
    title: string
    body: string
    recommended: string
    scenario: string
  }
> = {
  'tool-call-timeline': {
    eyebrow: 'Activity preview',
    title: 'Make agent work visible without making it loud.',
    body: 'The stage will show ordered tool steps, current activity, and completed context checks while keeping the main result area calm.',
    recommended: 'Observe',
    scenario: 'Test queued, running, completed, and attention states.',
  },
  'streaming-citations': {
    eyebrow: 'Source preview',
    title: 'Let evidence arrive with the answer.',
    body: 'The stage will pair incremental text reveal with source markers and a compact evidence panel that updates without disrupting reading.',
    recommended: 'Observe',
    scenario: 'Test generating, source found, source reviewed, and complete states.',
  },
  'compare-apply-review': {
    eyebrow: 'Review preview',
    title: 'Keep generated changes inspectable before they land.',
    body: 'The stage will compare current and suggested states, highlight changes, and make partial apply paths visible.',
    recommended: 'Review',
    scenario: 'Test original, suggested, selected changes, and applied states.',
  },
  'approval-checkpoint': {
    eyebrow: 'Approval preview',
    title: 'Pause before an AI action crosses a boundary.',
    body: 'The stage will summarize the proposed action, expose its scope, and separate approve, adjust, and cancel paths.',
    recommended: 'Approve',
    scenario: 'Test ready, adjusting scope, approved, and cancelled states.',
  },
  'interrupted-session': {
    eyebrow: 'Resume preview',
    title: 'Show what stopped and what can continue.',
    body: 'The stage will preserve completed work, call out missing context, and make resume safer than starting over.',
    recommended: 'Recover',
    scenario: 'Test interrupted, context preserved, missing input, and resumed states.',
  },
  'error-recovery': {
    eyebrow: 'Recovery preview',
    title: 'Turn failure into a concrete next step.',
    body: 'The stage will explain what failed, preserve progress, and offer recovery actions that are specific enough to choose.',
    recommended: 'Recover',
    scenario: 'Test failed, cause identified, next step selected, and recovered states.',
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
          <p className="page-lede">{section.purpose}</p>
          <div className="meta-row">
            <span className="meta-chip">{section.category}</span>
            <span className="meta-chip">{section.states.length} key states</span>
            <span className="meta-chip meta-chip--warning">Route scaffold</span>
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
                This route is a scaffold. The preview below is illustrative only and will become interactive in a later milestone.
              </p>
              <div className="pattern-preview-card" aria-label={`${section.title} planned states`}>
                <div className="pattern-preview-card__header">
                  <span>{section.category}</span>
                  <strong>{section.states.length} states</strong>
                </div>
                <ol className="pattern-state-list">
                  {section.states.map((state, index) => (
                    <li
                      className={index === 0 ? 'pattern-state-list__item pattern-state-list__item--active' : 'pattern-state-list__item'}
                      key={state}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{state}</strong>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <aside className="control-panel">
            <div className="control-panel__block">
              <p className="control-panel__label">Key states</p>
              <div className="variant-grid">
                {section.states.map(state => (
                  <span className="variant-chip" key={state}>
                    {state}
                  </span>
                ))}
              </div>
              <p className="control-panel__hint">
                These are planned states, not working controls yet.
              </p>
            </div>
            <div className="control-panel__block spec-card">
              <p className="control-panel__label">Pattern category</p>
              <h2>{stage.recommended}</h2>
              <p>{section.behavior}</p>
              <p className="spec-card__status">{stage.scenario}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="content-section" id="spec">
        <div className="doc-block">
          <h2>Pattern anatomy</h2>
          <p>{section.scenario}</p>
          <ul>
            <li>Category: {section.category}.</li>
            <li>Primary scenario: {stage.scenario}</li>
            <li>Motion should clarify state changes without becoming the pattern itself.</li>
          </ul>
        </div>
      </section>

      <section className="content-section" id="implementation">
        <div className="doc-block">
          <h2>Implementation notes</h2>
          <p>{section.implementation}</p>
          <p className="doc-status">
            Implementation for this route has not started yet. The current page establishes the pattern structure and state expectations only.
          </p>
        </div>
      </section>

      <section className="content-section" id="prompt">
        <div className="doc-block">
          <h2>Starter prompt</h2>
          <pre className="code-block">
            <code>{`Implement the ${section.title} pattern.\n\nPurpose:\n${section.purpose}\n\nScenario:\n${section.scenario}\n\nConstraints:\n- Use shadcn/ui primitives where they help.\n- Keep the demo product-neutral and inspectable.\n- Make state transitions clear.\n- Add reduced-motion handling if motion carries meaning.\n- Keep the implementation small and readable.`}</code>
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
    </div>
  )
}
