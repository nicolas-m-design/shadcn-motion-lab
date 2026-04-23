# Reliability Checklist

- Does the interaction match the written motion spec?
- Do easing, duration, and travel follow `src/content/rules/motion-rules.md` unless the spec overrides them?
- Is the motion origin clear for the component's geometry or trigger position?
- Does rapid repeat interaction still behave correctly?
- Does reduced-motion mode feel intentionally simpler?
- Do focus and keyboard behavior still work?
- Were known anti-patterns avoided unless the spec explicitly allowed them?
- Is the implementation still small and readable?
