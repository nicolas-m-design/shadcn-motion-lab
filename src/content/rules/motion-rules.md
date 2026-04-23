# Motion Rules

Use these defaults unless a component spec overrides them.

## Duration

- Keep UI motion under 300ms.
- Micro-interactions should usually land in 100-150ms.
- Standard overlays like dropdowns and tooltips should usually land in 150-250ms.
- Larger overlays like dialogs and drawers should usually land in 200-300ms.
- Exit should feel faster than enter, usually by about 20%.
- Longer travel or larger surfaces can justify slightly longer duration.

## Easing

- Entering surfaces should bias toward ease-out.
- Exiting surfaces should use a sharper ease so they clear faster than entry.
- On-screen movement or morphing should use ease-in-out.
- Hover changes should use ease.
- Constant motion should use linear.

## Spatial Movement

- Prefer translate plus opacity first.
- Keep travel short and tied to the component's geometry.
- Origin-aware overlays should feel attached to their trigger or edge.
- Reduced motion should remove travel before it removes clarity.
- If scale is used, start near full size, not from 0.

## Practical Tips

- Add `will-change` on layers that animate `transform` or `opacity` if motion looks jittery.
- Animate a child instead of the hovered parent when hover transitions flicker.
- Keep hit targets at 44px minimum when motion depends on repeated tapping.
- Use subtle blur only as polish, not to hide weak choreography.

## Anti-Patterns

- Do not use `scale(0)` for UI entry.
- Do not add bounce unless the spec explicitly asks for it.
- Do not let expressive stagger delay high-frequency interactions.
- Do not use large slides when a smaller settle would keep orientation clearer.
