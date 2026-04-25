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
          <h1>Component motion, tested in live UI.</h1>
          <p className="page-lede">
            Each route isolates a common UI interaction, keeps the motion target explicit, and puts the preview, variants, and notes in one place.
          </p>
          <div className="hero-actions">
            <Link className="button button--primary" to="/components/dialog">
              Open live dialog page
            </Link>
            <a className="button button--secondary" href="#approach">
              See the gallery approach
            </a>
          </div>
          <div className="hero-stat-row">
            <span className="hero-stat">{liveCount} live component</span>
            <span className="hero-stat">{plannedCount} preview routes</span>
            <span className="hero-stat">Reduced motion planned</span>
          </div>
        </div>
        <div className="poster-panel">
          <p className="poster-panel__eyebrow">Build queue</p>
          <p className="poster-panel__line">Dialog is live.</p>
          <p className="poster-panel__line">Drawer studies edge motion next.</p>
          <p className="poster-panel__line">Dropdown, toast, accordion, and tabs follow.</p>
        </div>
      </header>

      <section className="content-section content-section--overview-grid" id="approach">
        <div className="doc-block doc-block--plain">
          <div className="section-heading">
            <p className="eyebrow">Focus</p>
            <h2>What this gallery optimizes for</h2>
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
            <p className="eyebrow">Approach</p>
            <h2>How each motion study is built</h2>
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
          <h2>Current studies</h2>
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
                <span>{section.slug === 'dialog' ? 'Working controls' : 'Spec scaffold'}</span>
                <span>Motion notes</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
