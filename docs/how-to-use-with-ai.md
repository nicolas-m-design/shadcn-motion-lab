# How To Use With AI

## Goal

Give an AI agent enough motion context to implement a component interaction without redesigning the component or bloating the code.

## Rules

- Start from a named component and one named variant.
- Keep the default shadcn visual style unless the task explicitly changes visuals.
- Preserve accessibility and keyboard behavior.
- Add a reduced-motion fallback.
- Prefer CSS and native browser transitions unless orchestration clearly needs more.
- Keep the implementation small and explain tradeoffs when the spec cannot be matched exactly.

## Starter prompt

Implement the `Dialog / Standard` motion spec.

Constraints:

- Keep the default shadcn visual style.
- Do not redesign the component.
- Preserve accessibility and focus behavior.
- Add reduced-motion handling.
- Keep code small and readable.
- Prefer native CSS/transitions unless orchestration clearly benefits from a motion library.

Deliver:

- working interaction
- concise implementation notes
- tradeoffs if the spec cannot be matched exactly
