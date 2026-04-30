import { NavLink, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { ComponentPlaceholderPage } from './components/ComponentPlaceholderPage'
import { DialogShowcase } from './components/DialogShowcase'
import { OverviewPage } from './components/OverviewPage'
import { getSectionBySlug, motionSections } from './routes/content'

function ComponentRoute() {
  const { slug } = useParams()
  const section = getSectionBySlug(slug ?? '')

  if (!section) {
    return <Navigate replace to="/" />
  }

  if (section.slug === 'dialog') {
    return <DialogShowcase section={section} />
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
          <NavLink className="brand" to="/">
            shadcn Motion Lab
          </NavLink>
        </div>

        <nav aria-label="Primary" className="sidebar__nav">
          <div className="sidebar__group">
            <NavLink
              className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
              end
              to="/"
            >
              <span>Overview</span>
            </NavLink>
          </div>

          <div className="sidebar__group">
            {motionSections.map(section => (
              <NavLink
                className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
                key={section.slug}
                to={`/components/${section.slug}`}
              >
                <span>{section.title}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>

      <main className="page-shell" id="main-content" tabIndex={-1}>
        <Routes>
          <Route element={<OverviewPage />} path="/" />
          <Route element={<ComponentRoute />} path="/components/:slug" />
        </Routes>
      </main>
    </div>
  )
}

export default App
