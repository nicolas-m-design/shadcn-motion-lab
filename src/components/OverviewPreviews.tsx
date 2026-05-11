import { useEffect, useState } from 'react'
import { useReducedMotionPreference } from './useReducedMotionPreference'

function useAutoCycle(count: number, intervalMs: number, initialDelay: number, enabled: boolean) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!enabled) {
      setIndex(prev => (prev === 0 ? prev : 0))
      return
    }
    let intervalId = 0
    const startTimeout = window.setTimeout(() => {
      setIndex(i => (i + 1) % count)
      intervalId = window.setInterval(() => setIndex(i => (i + 1) % count), intervalMs)
    }, initialDelay)
    return () => {
      window.clearTimeout(startTimeout)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [count, intervalMs, initialDelay, enabled])
  return index
}

const useAutoToggle = (intervalMs: number, initialDelay: number, enabled: boolean) =>
  useAutoCycle(2, intervalMs, initialDelay, enabled) === 0

type DelayProps = { delay?: number }

export function MiniDialog({ delay = 0 }: DelayProps) {
  const reduced = useReducedMotionPreference()
  const open = useAutoToggle(2600, delay, !reduced)
  return (
    <div aria-hidden="true" className="mini mini--dialog" data-open={open ? 'true' : 'false'}>
      <div aria-hidden="true" className="mini-backdrop" />
      <div aria-hidden="true" className="mini-surface mini-surface--dialog" />
    </div>
  )
}

export function MiniDrawer({ delay = 0 }: DelayProps) {
  const reduced = useReducedMotionPreference()
  const open = useAutoToggle(2600, delay, !reduced)
  return (
    <div aria-hidden="true" className="mini mini--drawer" data-open={open ? 'true' : 'false'}>
      <div aria-hidden="true" className="mini-backdrop" />
      <div aria-hidden="true" className="mini-panel" />
    </div>
  )
}

export function MiniMenu({ delay = 0 }: DelayProps) {
  const reduced = useReducedMotionPreference()
  const open = useAutoToggle(2400, delay, !reduced)
  return (
    <div aria-hidden="true" className="mini mini--menu" data-open={open ? 'true' : 'false'}>
      <div aria-hidden="true" className="mini-trigger" />
      <div aria-hidden="true" className="mini-menu">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

export function MiniAccordion({ delay = 0 }: DelayProps) {
  const reduced = useReducedMotionPreference()
  const idx = useAutoCycle(3, 2200, delay, !reduced)
  return (
    <div aria-hidden="true" className="mini mini--accordion">
      {[0, 1, 2].map(i => (
        <div aria-hidden="true" className="mini-row" data-active={i === idx ? 'true' : 'false'} key={i} />
      ))}
    </div>
  )
}

export function MiniTabs({ delay = 0 }: DelayProps) {
  const reduced = useReducedMotionPreference()
  const idx = useAutoCycle(4, 1900, delay, !reduced)
  return (
    <div aria-hidden="true" className="mini mini--tabs">
      <div aria-hidden="true" className="mini-bar">
        <span className="mini-pill" style={{ transform: `translateX(${idx * 26}px)` }} />
        {[0, 1, 2, 3].map(i => (
          <span className="mini-dot" key={i} />
        ))}
      </div>
    </div>
  )
}
