export type MotionSection = {
  slug: string
  title: string
  goal: string
  status: 'live' | 'preview'
  variants: string[]
}

export const motionSections: MotionSection[] = [
  {
    slug: 'dialog',
    title: 'Dialog',
    goal: 'Clear layer entry with simultaneous backdrop and surface motion.',
    status: 'live',
    variants: ['Standard', 'Snappy', 'Expressive', 'Reduced motion'],
  },
  {
    slug: 'drawer',
    title: 'Drawer',
    goal: 'Communicate edge origin with a tiny backdrop lead and restrained slide.',
    status: 'live',
    variants: ['Standard', 'Snappy', 'Expressive', 'Reduced motion'],
  },
  {
    slug: 'dropdown-menu',
    title: 'Dropdown Menu',
    goal: 'Improve orientation without slowing a high-frequency interaction.',
    status: 'preview',
    variants: ['Standard', 'Snappy', 'Expressive', 'Reduced motion'],
  },
  {
    slug: 'toast',
    title: 'Toast',
    goal: 'Make transient feedback visible without becoming noisy.',
    status: 'preview',
    variants: ['Standard', 'Snappy', 'Expressive', 'Reduced motion'],
  },
  {
    slug: 'accordion',
    title: 'Accordion',
    goal: 'Clarify reveal and collapse without slowing scanning.',
    status: 'preview',
    variants: ['Standard', 'Snappy', 'Expressive', 'Reduced motion'],
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    goal: 'Preserve orientation through indicator motion rather than heavy panel transitions.',
    status: 'preview',
    variants: ['Standard', 'Snappy', 'Expressive', 'Reduced motion'],
  },
]

export const liveMotionSections = motionSections.filter(section => section.status === 'live')

export function getSectionBySlug(slug: string) {
  return motionSections.find(section => section.slug === slug)
}
