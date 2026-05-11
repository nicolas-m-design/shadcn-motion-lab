import { Link } from 'react-router-dom'
import {
  MiniAccordion,
  MiniDialog,
  MiniDrawer,
  MiniMenu,
  MiniTabs,
} from './OverviewPreviews'

const cards = [
  {
    slug: 'dialog',
    title: 'Dialog',
    blurb: 'Backdrop and surface enter together.',
    Preview: MiniDialog,
    delay: 0,
  },
  {
    slug: 'drawer',
    title: 'Drawer',
    blurb: 'Edge slide with a tiny backdrop lead.',
    Preview: MiniDrawer,
    delay: 320,
  },
  {
    slug: 'dropdown-menu',
    title: 'Dropdown Menu',
    blurb: 'Origin grows from the trigger edge.',
    Preview: MiniMenu,
    delay: 640,
  },
  {
    slug: 'accordion',
    title: 'Accordion',
    blurb: 'Height drives the motion; opacity masks the bottom edge.',
    Preview: MiniAccordion,
    delay: 960,
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    blurb: 'Pill slides; label drifts in with a touch of blur.',
    Preview: MiniTabs,
    delay: 1280,
  },
]

export function OverviewPage() {
  return (
    <div className="page page--overview">
      <header className="page-hero page-hero--simple">
        <div className="page-hero__content">
          <h1>A motion lab for shadcn components</h1>
          <p className="page-lede">
            Each study breaks one component into restrained, snappy, expressive, slow-mo, and
            reduced-motion variants — so the choreography can be read frame-by-frame, not just felt.
            Press the demos. Cycle the variants. Read the spec card.
          </p>
        </div>
      </header>

      <section className="content-section">
        <div className="overview-grid">
          {cards.map(card => {
            const Preview = card.Preview
            return (
              <Link className="overview-card" key={card.slug} to={`/components/${card.slug}`}>
                <div className="overview-card__canvas">
                  <Preview delay={card.delay} />
                </div>
                <div className="overview-card__meta">
                  <h3>{card.title}</h3>
                  <p>{card.blurb}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
