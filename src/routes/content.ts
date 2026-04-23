export type PatternSection = {
  slug: string
  title: string
  category: string
  purpose: string
  scenario: string
  behavior: string
  implementation: string
  states: string[]
  checks: string[]
}

export const overviewCards = [
  {
    title: 'Live interaction states',
    copy:
      'Each pattern is framed around a concrete AI-interface state, then shown as a running route instead of a static mockup.',
  },
  {
    title: 'Built from familiar primitives',
    copy:
      'shadcn/ui provides the base controls so the lab can focus on behavior, sequence, and motion rather than rebuilding primitives.',
  },
  {
    title: 'Motion with a job',
    copy:
      'Transitions are used when they clarify progress, review, approval, or recovery states, with reduced-motion paths planned for meaningful movement.',
  },
]

export const categoryGroups = [
  {
    title: 'Observe',
    copy:
      'Patterns that make agent activity, sources, and progress visible while work is unfolding.',
  },
  {
    title: 'Review',
    copy:
      'Patterns for comparing, inspecting, and deciding whether generated output is ready to use.',
  },
  {
    title: 'Approve',
    copy:
      'Patterns for scoped consent, confirmation, and partial application before an AI action changes something.',
  },
  {
    title: 'Recover',
    copy:
      'Patterns that help users resume interrupted work, repair missing context, or choose a next step after failure.',
  },
]

export const patternSections: PatternSection[] = [
  {
    slug: 'tool-call-timeline',
    title: 'Tool-call timeline',
    category: 'Observe',
    purpose: 'Expose what the assistant is doing without turning progress into noise.',
    scenario:
      'An assistant is gathering context, checking files, and preparing a recommendation while the user waits.',
    behavior:
      'Show ordered steps with current, completed, and pending states. Motion should help new events land without pulling attention away from the active result.',
    implementation:
      'Use a compact vertical timeline with live status, progressive disclosure, and a reduced-motion path for inserted steps.',
    states: ['Queued', 'Running', 'Completed', 'Needs attention'],
    checks: [
      'Current step is obvious at a glance',
      'Completed steps remain scannable',
      'New steps do not create layout jumps',
    ],
  },
  {
    slug: 'streaming-citations',
    title: 'Streaming response with sources',
    category: 'Observe',
    purpose: 'Pair generated text with source context before trust becomes an afterthought.',
    scenario:
      'A response is arriving incrementally and the interface needs to reveal supporting references without interrupting reading.',
    behavior:
      'Stream the answer in chunks, then attach source markers and a compact source panel as evidence becomes available.',
    implementation:
      'Use staged text reveal, inline source chips, and a persistent source summary that can update without moving the main answer.',
    states: ['Generating', 'Source found', 'Source reviewed', 'Complete'],
    checks: [
      'Streaming remains readable',
      'Sources are connected to specific claims',
      'Confidence or uncertainty is visible without dominating the answer',
    ],
  },
  {
    slug: 'compare-apply-review',
    title: 'Compare and apply review',
    category: 'Review',
    purpose: 'Let users inspect generated changes before committing them.',
    scenario:
      'An assistant proposes changes and the user needs to compare the current and suggested versions before applying anything.',
    behavior:
      'Show before and after states, highlight changed regions, and make the apply action feel deliberate rather than automatic.',
    implementation:
      'Use a split review surface with change markers, an apply bar, and clear partial-apply affordances for scoped changes.',
    states: ['Original', 'Suggested', 'Selected changes', 'Applied'],
    checks: [
      'Changed areas are easy to locate',
      'Apply action scope is unambiguous',
      'Rejected changes do not look applied',
    ],
  },
  {
    slug: 'approval-checkpoint',
    title: 'Approval checkpoint',
    category: 'Approve',
    purpose: 'Create a clear pause before an AI action crosses a boundary.',
    scenario:
      'An assistant is ready to perform a scoped action and needs explicit approval before continuing.',
    behavior:
      'Summarize what will happen, show the permission scope, and separate approve, adjust, and cancel paths.',
    implementation:
      'Use a focused checkpoint panel with scope chips, risk level, action preview, and a confirmation transition into progress.',
    states: ['Ready for approval', 'Adjusting scope', 'Approved', 'Cancelled'],
    checks: [
      'The action boundary is explicit',
      'Primary and escape paths are both clear',
      'Approval does not feel like a generic modal',
    ],
  },
  {
    slug: 'interrupted-session',
    title: 'Interrupted and resumed task',
    category: 'Recover',
    purpose: 'Help users understand what stopped and where they can safely continue.',
    scenario:
      'A long-running assistant task was interrupted by a refresh, timeout, or missing permission.',
    behavior:
      'Show the last known step, what was preserved, what needs attention, and a safe resume action.',
    implementation:
      'Use a resumable task card with preserved context, missing requirement callout, and a visible resume checkpoint.',
    states: ['Interrupted', 'Context preserved', 'Missing input', 'Resumed'],
    checks: [
      'The interruption cause is understandable',
      'Preserved work is separated from missing work',
      'Resume action is safer than restart',
    ],
  },
  {
    slug: 'error-recovery',
    title: 'Error with next-step recovery',
    category: 'Recover',
    purpose: 'Turn an AI failure into a usable next step instead of a dead end.',
    scenario:
      'An assistant cannot complete a request because context is missing, a tool failed, or the requested action is unsafe.',
    behavior:
      'Explain the failure in plain language, preserve progress, and offer specific recovery actions.',
    implementation:
      'Use an error panel with status history, likely cause, recommended action, and an alternate path.',
    states: ['Failed', 'Cause identified', 'Next step selected', 'Recovered'],
    checks: [
      'The message avoids blame and vagueness',
      'The next action is concrete',
      'Previous progress remains visible',
    ],
  },
]

export function getSectionBySlug(slug: string) {
  return patternSections.find(section => section.slug === slug)
}
