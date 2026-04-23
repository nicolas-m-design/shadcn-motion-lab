export type MotionSection = {
  slug: string
  title: string
  category: string
  goal: string
  intent: string
  implementation: string
  figma: string
  variants: string[]
  checks: string[]
}

export const overviewCards = [
  {
    title: 'Clear motion contracts',
    copy:
      'Each component is documented with a compact motion spec so humans and AI agents work from the same interaction target.',
  },
  {
    title: 'Default shadcn baseline',
    copy:
      'V1 keeps the visual treatment close to shadcn so the repo isolates interaction quality rather than redesigning the whole surface.',
  },
  {
    title: 'Reduced motion included',
    copy:
      'Every section ships with a reduced-motion fallback so reliability includes accessibility, not just visual polish.',
  },
]

export const workflowSteps = [
  {
    title: 'Explore in Figma',
    copy:
      'Use rough motion boards and MCP-assisted experiments to find a plausible interaction shape before implementation.',
  },
  {
    title: 'Lock the repo spec',
    copy:
      'Treat the repo as the canonical source for motion intent, prompt templates, code, and lightweight reliability checks.',
  },
  {
    title: 'Refine through implementation',
    copy:
      'Start with CSS and native browser transitions, then reach for a motion library only when orchestration meaningfully improves the result.',
  },
]

export const motionSections: MotionSection[] = [
  {
    slug: 'dialog',
    title: 'Dialog',
    category: 'Overlay',
    goal: 'Clear layer entry with simultaneous backdrop and surface motion.',
    intent:
      'Use translate plus opacity to make layer changes readable without adding drag to a frequent interaction.',
    implementation:
      'CSS first. Backdrop and surface start together. Exit should be faster than entry. No scale in v1.',
    figma:
      'Use rough frames to check entry and exit pacing before encoding the canonical timings in code.',
    variants: ['Standard', 'Snappy', 'Expressive', 'Reduced motion'],
    checks: [
      'Focus trap remains correct',
      'Rapid reopen does not glitch',
      'Escape and outside click behavior stay intact',
    ],
  },
  {
    slug: 'drawer',
    title: 'Drawer',
    category: 'Overlay',
    goal: 'Communicate edge origin with a tiny backdrop lead and restrained slide.',
    intent:
      'Preserve perceived responsiveness while keeping the panel direction obvious on desktop and mobile.',
    implementation:
      'CSS first. Backdrop may lead slightly. Keep travel short and avoid heavy-feeling motion.',
    figma:
      'Use edge-origin references in rough boards to test whether the panel feels directional without feeling slow.',
    variants: ['Standard', 'Snappy', 'Expressive', 'Reduced motion'],
    checks: [
      'Open and close remain responsive',
      'Content stays readable during motion',
      'Reduced-motion path is clearly simpler',
    ],
  },
  {
    slug: 'dropdown-menu',
    title: 'Dropdown Menu',
    category: 'Overlay',
    goal: 'Improve orientation without slowing a high-frequency interaction.',
    intent:
      'Keep the movement brief and close to native expectations, with only a very subtle expressive stagger.',
    implementation:
      'CSS first. Use minimal travel. Expressive mode may stagger only two or three items perceptibly.',
    figma:
      'Test whether item staggering helps orientation or simply adds delay before making it canonical.',
    variants: ['Standard', 'Snappy', 'Expressive', 'Reduced motion'],
    checks: [
      'Keyboard navigation is unaffected',
      'Rapid open and close remains crisp',
      'Expressive mode stays subtle',
    ],
  },
  {
    slug: 'toast',
    title: 'Toast',
    category: 'Feedback',
    goal: 'Make transient feedback visible without becoming noisy.',
    intent:
      'Use brief, edge-aware entry so the toast is noticeable but does not dominate the page.',
    implementation:
      'CSS first. Keep entry short, exit faster, and avoid bounce in v1.',
    figma:
      'Rough stacking studies should answer whether multiple toasts still feel orderly with the chosen timings.',
    variants: ['Standard', 'Snappy', 'Expressive', 'Reduced motion'],
    checks: [
      'Stacked toasts remain legible',
      'Dismiss remains crisp',
      'Reduced-motion mode preserves clarity',
    ],
  },
  {
    slug: 'accordion',
    title: 'Accordion',
    category: 'Micro-interaction',
    goal: 'Clarify reveal and collapse without slowing scanning.',
    intent:
      'Use restrained content reveal with chevron and content moving together, while the chevron remains quieter.',
    implementation:
      'CSS first. Keep the interaction light, avoid rubbery feel, and do not overplay the icon.',
    figma:
      'Use rough motion boards to tune how much content fade helps before it starts to feel delayed.',
    variants: ['Standard', 'Snappy', 'Expressive', 'Reduced motion'],
    checks: [
      'Variable heights behave cleanly',
      'Repeated toggles do not jitter',
      'Chevron motion stays secondary to content',
    ],
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    category: 'Micro-interaction',
    goal: 'Preserve orientation through indicator motion rather than heavy panel transitions.',
    intent:
      'Make switching feel connected while keeping the active state understandable even with very little motion.',
    implementation:
      'Indicator animation first. Keep panel transitions light and avoid large slides in v1.',
    figma:
      'Use rough boards to compare indicator-led continuity against panel-led continuity before implementing.',
    variants: ['Standard', 'Snappy', 'Expressive', 'Reduced motion'],
    checks: [
      'Rapid tab switching stays stable',
      'Keyboard behavior remains correct',
      'Indicator motion does most of the work',
    ],
  },
]

export function getSectionBySlug(slug: string) {
  return motionSections.find(section => section.slug === slug)
}
