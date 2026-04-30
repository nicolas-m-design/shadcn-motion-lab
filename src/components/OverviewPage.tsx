import { Link } from 'react-router-dom'
import { motionSections } from '../routes/content'

export function OverviewPage() {
  const liveCount = motionSections.filter(section => section.slug === 'dialog').length
  const plannedCount = motionSections.length - liveCount

  return (
    <div className="page page--overview">
      <header className="page-hero page-hero--simple">
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
            <a className="button button--secondary" href="#components">
              Browse components
            </a>
          </div>
          <div className="hero-stat-row">
            <span className="hero-stat">{liveCount} live component</span>
            <span className="hero-stat">{plannedCount} preview routes</span>
            <span className="hero-stat">Reduced motion planned</span>
          </div>
        </div>
      </header>

      <section className="content-section" id="components">
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
