import { Link } from 'react-router-dom'
import { categoryGroups, overviewCards, patternSections } from '../routes/content'

export function OverviewPage() {
  const liveCount = 0
  const plannedCount = patternSections.length

  return (
    <div className="page page--overview">
      <header className="page-hero">
        <div className="page-hero__content">
          <p className="eyebrow">Overview</p>
          <h1>An interaction pattern lab for AI-native interfaces.</h1>
          <p className="page-lede">
            A browsable set of early pattern routes for observing, reviewing, approving, and recovering from AI-assisted work.
          </p>
          <div className="hero-actions">
            <Link className="button button--primary" to="/patterns/approval-checkpoint">
              Open approval checkpoint
            </Link>
            <a className="button button--secondary" href="#patterns">
              Browse patterns
            </a>
          </div>
          <div className="hero-stat-row">
            <span className="hero-stat">{liveCount} live demos</span>
            <span className="hero-stat">{plannedCount} planned routes</span>
            <span className="hero-stat">4 behavior categories</span>
          </div>
        </div>
        <div className="poster-panel">
          <p className="poster-panel__eyebrow">V1 pattern set</p>
          <p className="poster-panel__line">Observe active work.</p>
          <p className="poster-panel__line">Review generated changes.</p>
          <p className="poster-panel__line">Approve scoped actions.</p>
          <p className="poster-panel__line">Recover from interruptions.</p>
        </div>
      </header>

      <section className="content-section content-section--overview-grid" id="categories">
        <div className="doc-block doc-block--plain">
          <div className="section-heading">
            <p className="eyebrow">Library shape</p>
            <h2>What the lab optimizes for</h2>
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
            <p className="eyebrow">Taxonomy</p>
            <h2>Four behavior categories</h2>
          </div>
          <ol className="workflow-list workflow-list--compact">
            {categoryGroups.map(group => (
              <li key={group.title}>
                <strong>{group.title}</strong>
                <p>{group.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="content-section" id="patterns">
        <div className="section-heading">
          <p className="eyebrow">Patterns</p>
          <h2>Current pattern routes</h2>
        </div>
        <div className="component-index">
          {patternSections.map(section => (
            <Link className="index-link" key={section.slug} to={`/patterns/${section.slug}`}>
              <div>
                <p className="eyebrow">{section.category}</p>
                <h3>{section.title}</h3>
              </div>
              <p>{section.purpose}</p>
              <div className="index-link__meta">
                <span>Route scaffold</span>
                <span>{section.states.length} states</span>
                <span>{section.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
