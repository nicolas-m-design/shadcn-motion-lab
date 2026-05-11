import { useEffect } from 'react'

export function useInertOutside(active: boolean, selector: string) {
  useEffect(() => {
    if (!active) return
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector))
    const previous = nodes.map(node => node.getAttribute('inert'))
    nodes.forEach(node => node.setAttribute('inert', ''))
    return () => {
      nodes.forEach((node, index) => {
        const prev = previous[index]
        if (prev === null) {
          node.removeAttribute('inert')
        } else {
          node.setAttribute('inert', prev)
        }
      })
    }
  }, [active, selector])
}
