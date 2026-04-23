---
version: alpha
name: shadcn-motion-lab
description: A concise interaction pattern lab for AI-native interfaces.
colors:
  primary: "#151515"
  secondary: "#5f625f"
  tertiary: "#9f472c"
  neutral: "#f7f3eb"
  surface: "#fffdf8"
  border: "#ded8cd"
typography:
  h1:
    fontFamily: Geist
    fontSize: 3.25rem
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "-0.04em"
  h2:
    fontFamily: Geist
    fontSize: 1.75rem
    fontWeight: 620
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  body:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: Geist Mono
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  sm: 6px
  md: 12px
  lg: 20px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
components:
  pattern-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  page-shell:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  metadata:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
  category-chip:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: 8px
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  primary-action:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: 12px
---

## Overview

An interaction pattern lab for AI-native interfaces.

The site should feel like an early library: browsable, concrete, and example-first. It should not feel like a case study page, a marketing landing page, or a full design system.

The visual tone is restrained and editorial. The interface should make demos easy to inspect, with enough polish to feel portfolio-worthy and enough restraint to keep attention on interaction behavior.

## Colors

The palette uses warm neutrals, dark ink, quiet borders, and one clay accent.

- **Primary:** dark ink for headings, primary text, and decisive controls.
- **Secondary:** muted gray-green for metadata, captions, and secondary navigation.
- **Tertiary:** clay accent for active states, selected filters, and important interaction cues.
- **Neutral:** warm page background.
- **Surface:** raised demo and documentation panels.
- **Border:** low-contrast structural lines.

## Typography

Use compact, confident typography. Headings should feel editorial rather than SaaS-generic. Metadata and labels can use a mono face when it helps scanning, but avoid overusing technical texture.

## Layout

Prefer a multi-route documentation/library structure:

- an overview page that states the lab's purpose
- a browsable pattern index
- one detail route per pattern

Pattern detail pages should prioritize the live demo first, then explain behavior. Keep notes short and close to the demo they describe.

## Motion

Motion should clarify state changes, not decorate the page.

Use motion for:

- streaming and incremental reveal
- task progress and tool timelines
- approval or confirmation transitions
- compare and apply states
- interruption, resumption, and recovery

Avoid motion that only makes static content feel more dramatic. Always include a reduced-motion path for demos where movement carries meaning.

## Components

Use `shadcn/ui` as scaffolding. The point is not to redesign primitives, but to compose them into AI-native interaction patterns.

Pattern pages can use familiar pieces such as cards, buttons, dialogs, tabs, progress indicators, badges, and side panels. The originality should come from state, sequence, copy, and motion behavior.

## Do's and Don'ts

Do make every pattern feel inspectable.

Do keep placeholder content realistic but product-neutral.

Do make category and state labels easy to scan.

Do prefer a small number of strong states over exhaustive documentation.

Do not turn the site into a design-system documentation project.

Do not expose workflow notes in the public app unless they directly help someone understand a pattern.

Do not make every demo look like developer tooling.

Do not use motion when hierarchy, copy, or layout would solve the problem more clearly.
