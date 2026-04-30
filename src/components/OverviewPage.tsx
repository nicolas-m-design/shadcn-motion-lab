import { Link } from 'react-router-dom'
import { motionSections } from '../routes/content'

export function OverviewPage() {
  return (
    <div className="page page--overview">
      <header className="page-hero page-hero--simple">
        <div className="page-hero__content">
          <h1>Component motion, tested in live UI.</h1>
          <div className="hero-actions">
            <Link className="button button--primary" to="/components/dialog">
              Open dialog
            </Link>
          </div>
        </div>
      </header>

      <section className="content-section" id="components">
        <div className="component-index">
          {motionSections.map(section => (
            <Link className="index-link index-link--simple" key={section.slug} to={`/components/${section.slug}`}>
              <h3>{section.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
