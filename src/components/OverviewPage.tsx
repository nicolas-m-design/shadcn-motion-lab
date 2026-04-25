import { Link } from 'react-router-dom'
import { motionSections, overviewCards, workflowSteps } from '../routes/content'

export function OverviewPage() {
  const liveCount = motionSections.filter(section => section.slug === 'dialog').length
  const plannedCount = motionSections.length - liveCount

  return (
    <div className="page page--overview">
      <header className="page-hero">
        <div className="page-hero__content">
          <p className="eyebrow">Overview</p>
          <h1>A motion gallery that behaves like product docs, not a concept board.</h1>
          <p className="page-lede">
            Preview stages come first. Controls stay adjacent. Notes stay static. The current build has one live component and a stable route pattern for the rest.
          </p>
          <div className="hero-actions">
            <Link className="button button--primary" to="/components/dialog">
              Open live dialog page
            </Link>
            <a className="button button--secondary" href="#workflow">
              Review the workflow
            </a>
          </div>
          <div className="hero-stat-row">
            <span className="hero-stat">{liveCount} live component</span>
            <span className="hero-stat">{plannedCount} preview routes</span>
            <span className="hero-stat">Preview-first IA</span>
          </div>
        </div>
        <div className="poster-panel">
          <p className="poster-panel__eyebrow">Build order</p>
          <p className="poster-panel__line">Dialog is live.</p>
          <p className="poster-panel__line">Drawer is next.</p>
          <p className="poster-panel__line">The rest already share the page pattern.</p>
        </div>
      </header>

      <section className="content-section content-section--overview-grid" id="workflow">
        <div className="doc-block doc-block--plain">
          <div className="section-heading">
            <p className="eyebrow">Operating model</p>
            <h2>What this starter optimizes for</h2>
          </div>
          <div className="compact-list">
            {overviewCards.map(card => (
              <article className="compact-list__item" key={card.title}>
                <strong>{card.title}</strong>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="doc-block doc-block--plain">
          <div className="section-heading">
            <p className="eyebrow">Workflow</p>
            <h2>Figma explores, the repo decides</h2>
          </div>
          <ol className="workflow-list workflow-list--compact">
            {workflowSteps.map(step => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Components</p>
          <h2>Current routes</h2>
        </div>
        <div className="component-index">
          {motionSections.map(section => (
            <Link className="index-link" key={section.slug} to={`/components/${section.slug}`}>
              <div>
                <p className="eyebrow">{section.category}</p>
                <h3>{section.title}</h3>
              </div>
              <p>{section.goal}</p>
              <div className="index-link__meta">
                <span>{section.slug === 'dialog' ? 'Live demo' : 'Preview mock'}</span>
                <span>{section.slug === 'dialog' ? 'Working controls' : 'Planned controls'}</span>
                <span>Static docs</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
