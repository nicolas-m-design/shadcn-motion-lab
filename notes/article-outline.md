# Article Outline

## Working Title Options

- Designing AI-Native Interactions With AI
- What Changed When I Let AI Into My Interaction Workflow
- Building an AI Interaction Lab Without Starting in Figma
- From Prompt to Pattern: Testing AI in Interaction Design

## Thesis

An interaction pattern lab for AI-native interfaces.

The article should explain how the project was built, but the deeper story is workflow: what changed when interaction exploration started with AI coding tools instead of a blank Figma canvas.

## Core Argument

AI made it faster to move between idea, interface state, and working prototype. It did not remove the need for design judgment. The useful workflow was not "ask AI to design it", but "use AI to keep more interaction alternatives alive long enough to compare them."

## Current Workflow: Codex

Codex is being used as a repo-aware collaborator inside the local project.

Useful for:

- project framing and scope control
- repo setup and sanitization
- translating decisions into durable docs
- checking the existing codebase before planning changes
- implementation planning
- future code changes and verification loops

Observed strengths to track:

- keeps context close to the repo
- can inspect files before suggesting changes
- works well for surgical documentation and code edits
- encourages explicit success criteria and verification

Observed risks to track:

- can over-formalize a project if not constrained
- may drift toward documentation-heavy structures
- needs clear boundaries between public app content and private article notes

## Later Workflow Experiment: Claude Code

Claude Code can be introduced later as a comparison point, not as a replacement.

Possible uses:

- implement one pattern from the same pattern brief and `DESIGN.md`
- review Codex-built code for accessibility, state modeling, and overengineering
- refactor shared pattern-page structure once 2 to 3 patterns exist
- compare how a second agent interprets the same AI-context files
- generate an alternate solution for the same interaction, then compare tradeoffs

Comparison questions:

- Does the same `DESIGN.md` produce more consistent UI across tools?
- Which agent is better at preserving intent across multiple files?
- Which agent needs more explicit interaction-state guidance?
- Which workflow produces code that is easier to revise manually?

## Deliberately Not Starting In Figma

This project can use the absence of Figma as part of the experiment.

The article angle:

- as a designer, I would normally start by shaping the interface visually
- here, I started with AI coding tools and a running app
- this made interaction states, edge cases, and implementation constraints visible earlier
- the tradeoff is that visual exploration can narrow too quickly if the first coded structure becomes sticky

## Draft Structure

1. Why I built this lab
2. Why the site looks like an early library
3. Why I started with Codex instead of Figma
4. What `shadcn/ui` gave me for free
5. What a lightweight `DESIGN.md` changed, if anything
6. Building the first interaction pattern
7. Comparing Codex and Claude Code on the same brief
8. What AI accelerated
9. What still needed design judgment
10. What I would keep in my next workflow

## Evidence To Collect

- session durations by milestone
- before and after code snippets
- prompts or brief fragments that materially changed the output
- examples where AI produced a useful alternative quickly
- examples where AI needed correction
- places where starting in code revealed interaction problems earlier than a static mockup would have
