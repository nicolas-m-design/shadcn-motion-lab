# V1 Project Brief

## Working thesis

Build a portfolio-grade interaction lab that shows how AI changes the way interaction patterns are explored, specified, and implemented.

The repo is not a design system and not an open-source pattern library. It may resemble one on the surface because the work is organized as a gallery, but the real purpose is to document a design-engineering workflow and produce a strong article from it.

## Why this project exists

Personal goals:

- learn practical AI workflows for interaction design and frontend implementation
- produce a credible artifact for design engineers and frontend peers
- write a case-study article about what changed in the workflow, what held up, and what still required judgment

## Positioning

- `shadcn/ui` is the starting base, not the story
- motion matters, but it sits inside broader AI-native interaction behavior
- the repo should feel like a lab or experiment archive, not polished product marketing
- documentation should stay light and useful, never turn into system governance

## Core question

How does AI change the workflow for designing and building interaction patterns, especially patterns that include motion, state transitions, approval moments, uncertainty, and recovery?

## Canonical workflow

1. Explore interaction shapes in Figma or quick visual studies.
2. Use AI to iterate on structure, states, copy, and implementation approaches.
3. Capture only the minimum spec needed to keep intent clear.
4. Implement live demos in code, starting from `shadcn/ui` where it speeds things up.
5. Note what AI handled well, what needed correction, and what the workflow changed.

## Site structure

- Home / overview
- Pattern gallery
- Individual pattern pages or sections
- Short workflow notes
- Article-oriented conclusions or findings

The site should read like an organized archive of experiments:

- enough context to understand each pattern
- enough implementation detail to feel real
- enough written reflection to support the later article
- not enough documentation to feel like a framework or public reference system

## Suggested taxonomy

### Observe

- tool-call timeline
- streaming output
- citations or source context
- background task progress

### Review

- compare mode
- diff review
- confidence or uncertainty display
- version snapshots

### Approve

- approval checkpoint
- scoped permission request
- risky action confirmation
- partial apply

### Recover

- interrupted task
- resumed session
- missing context state
- error with next-step recovery

## V1 pattern set

Start with six demos:

1. Tool-call timeline
2. Streaming response with citation or confidence affordances
3. Compare and apply review
4. Approval checkpoint
5. Interrupted and resumed task state
6. Error and recovery state

## Pattern page anatomy

Each pattern should stay compact and repeat the same structure:

- pattern name
- one-sentence purpose
- realistic but product-neutral scenario
- live demo
- key states
- short implementation notes
- short workflow note: what AI helped with, what needed human correction

Optional only when useful:

- Figma exploration image or note
- tiny spec block
- notable motion rules

## Placeholder content rules

Use copy that is:

- realistic enough to explain why the interaction exists
- generic enough to avoid turning the pattern into one fake product
- specific enough to avoid filler language

Avoid:

- lorem ipsum
- generic labels like `Item A`
- heavy coding-product copy that makes every demo feel like developer tooling

## Scope boundaries

Do:

- build real interactive demos
- keep visual language clean and restrained
- use `shadcn/ui` pragmatically
- include motion when it clarifies state or intent
- capture brief workflow reflections as you go

Do not:

- build a full component system
- go deep on token architecture or governance
- write long docs for every pattern
- pretend this is a production product
- optimize for external contributors or open-source adoption

## Success criteria

V1 succeeds if it produces:

- a coherent interaction lab with 5 to 6 believable demos
- a visible throughline around AI-assisted workflow
- enough craft that peers take the work seriously
- enough insight that the final article says something specific

## Article angle

Primary article question:

> What changed in my interaction design and frontend workflow once AI became part of the loop?

Likely article sections:

1. Why I built the lab
2. Why `shadcn/ui` was a useful base but not the point
3. How AI changed exploration, implementation, and iteration
4. Which interaction patterns were easier to develop with AI
5. Where AI still needed explicit guidance or correction
6. What I would keep from this workflow
