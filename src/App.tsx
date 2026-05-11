import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import type { ComponentType } from 'react'
import { AccordionShowcase } from './components/AccordionShowcase'
import { ComponentPlaceholderPage } from './components/ComponentPlaceholderPage'
import { DialogShowcase } from './components/DialogShowcase'
import { DrawerShowcase } from './components/DrawerShowcase'
import { DropdownMenuShowcase } from './components/DropdownMenuShowcase'
import { OverviewPage } from './components/OverviewPage'
import { TabsShowcase } from './components/TabsShowcase'
import { ToastShowcase } from './components/ToastShowcase'
import { TooltipShowcase } from './components/TooltipShowcase'
import type { MotionSection } from './routes/content'
import { getSectionBySlug, motionSections } from './routes/content'

const showcaseBySlug: Record<string, ComponentType<{ section: MotionSection }>> = {
  dialog: DialogShowcase,
  drawer: DrawerShowcase,
  'dropdown-menu': DropdownMenuShowcase,
  accordion: AccordionShowcase,
  tabs: TabsShowcase,
  toast: ToastShowcase,
  tooltip: TooltipShowcase,
}

function ComponentRoute() {
  const { slug } = useParams()
  const section = getSectionBySlug(slug ?? '')

  if (!section) {
    return <Navigate replace to="/" />
  }

  const Showcase = showcaseBySlug[section.slug]
  if (Showcase) {
    return <Showcase section={section} />
  }

  return <ComponentPlaceholderPage section={section} />
}

function getActiveKey(pathname: string) {
  if (pathname === '/') return 'overview'
  if (pathname.startsWith('/components/')) return pathname.replace('/components/', '')
  return null
}

function Sidebar() {
  const { pathname } = useLocation()
  const activeKey = getActiveKey(pathname)
  const navRef = useRef<HTMLElement | null>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const pillRef = useRef<{ top: number; height: number } | null>(null)
  const [pill, setPill] = useState<{ top: number; height: number } | null>(null)
  const [hasMoved, setHasMoved] = useState(false)

  const linkSetters = useMemo(() => {
    const setters: Record<string, (el: HTMLAnchorElement | null) => void> = {}
    const keys = ['overview', ...motionSections.map(s => s.slug)]
    for (const key of keys) {
      setters[key] = el => {
        linkRefs.current[key] = el
      }
    }
    return setters
  }, [])

  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav || !activeKey) return
    const measure = () => {
      const el = linkRefs.current[activeKey]
      if (!el || !nav) return
      const navRect = nav.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const next = { top: elRect.top - navRect.top, height: elRect.height }
      const prev = pillRef.current
      if (prev && prev.top === next.top && prev.height === next.height) return
      if (prev && prev.top !== next.top) setHasMoved(true)
      pillRef.current = next
      setPill(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    Object.values(linkRefs.current).forEach(el => el && ro.observe(el))
    ro.observe(nav)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [activeKey])

  return (
    <aside className="sidebar">
      <div className="sidebar__masthead">
        <NavLink className="brand" to="/">
          shadcn Motion Lab
        </NavLink>
      </div>

      <nav aria-label="Primary" className="sidebar__nav" ref={navRef}>
        {pill && (
          <span
            aria-hidden="true"
            className="sidebar-pill"
            data-moved={hasMoved ? 'true' : 'false'}
            style={{ transform: `translateY(${pill.top}px)`, height: pill.height }}
          />
        )}

        <div className="sidebar__group">
          <NavLink
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
            end
            ref={linkSetters.overview}
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
              ref={linkSetters[section.slug]}
              to={`/components/${section.slug}`}
            >
              <span>{section.title}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  )
}

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Sidebar />

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
