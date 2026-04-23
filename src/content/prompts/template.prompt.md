Implement the `<Component / Variant>` motion spec.

Use the shared defaults in `src/content/rules/motion-rules.md` unless the component spec overrides them.

Constraints:

- Keep the default shadcn visual style.
- Do not redesign the component.
- Preserve accessibility and keyboard behavior.
- Add reduced-motion handling.
- Choose easing, duration, and spatial origin from the shared rules unless the spec says otherwise.
- Prefer CSS and native browser transitions unless orchestration clearly needs more.
- Keep the implementation small and readable.

Deliver:

- working interaction
- concise implementation notes
- brief rule audit listing which shared rules were applied or intentionally overridden
- tradeoffs if the spec cannot be matched exactly
