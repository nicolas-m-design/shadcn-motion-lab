import { NavLink, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { ComponentPlaceholderPage } from './components/ComponentPlaceholderPage'
import { OverviewPage } from './components/OverviewPage'
import { getSectionBySlug, patternSections } from './routes/content'

function PatternRoute() {
  const { slug } = useParams()
  const section = getSectionBySlug(slug ?? '')

  if (!section) {
    return <Navigate replace to="/" />
  }

  return <ComponentPlaceholderPage section={section} />
}

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <aside className="sidebar">
        <div className="sidebar__masthead">
          <p className="eyebrow">Pattern lab</p>
          <NavLink className="brand" to="/">
            shadcn Motion Lab
          </NavLink>
          <p className="sidebar__copy">
            An interaction pattern lab for AI-native interfaces, built from familiar shadcn primitives.
          </p>
        </div>

        <nav aria-label="Primary" className="sidebar__nav">
          <div className="sidebar__group">
            <p className="sidebar__label">Start</p>
            <NavLink
              className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
              end
              to="/"
            >
              <span>Overview</span>
              <small>Project intent</small>
            </NavLink>
          </div>

          <div className="sidebar__group">
            <p className="sidebar__label">Patterns</p>
            {patternSections.map(section => (
              <NavLink
                className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
                key={section.slug}
                to={`/patterns/${section.slug}`}
              >
                <span>{section.title}</span>
                <small>{section.category}</small>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="sidebar__footer">
          <p>Example-first routes. Live demos first. Behavior notes stay compact.</p>
        </div>
      </aside>

      <main className="page-shell" id="main-content" tabIndex={-1}>
        <Routes>
          <Route element={<OverviewPage />} path="/" />
          <Route element={<PatternRoute />} path="/patterns/:slug" />
          <Route element={<Navigate replace to="/patterns/tool-call-timeline" />} path="/components/:slug" />
        </Routes>
      </main>
    </div>
  )
}

export default App
