import { useRef, type KeyboardEvent } from 'react'

export type VariantOption = {
  id: string
  label: string
  disabled?: boolean
}

type VariantRadioGroupProps = {
  options: VariantOption[]
  value: string
  onChange: (id: string) => void
  ariaLabel: string
}

export function VariantRadioGroup({ options, value, onChange, ariaLabel }: VariantRadioGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  function focusOption(id: string) {
    const next = containerRef.current?.querySelector<HTMLButtonElement>(`[data-variant-id="${id}"]`)
    next?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const enabled = options.filter(option => !option.disabled)
    if (enabled.length === 0) return

    const currentIndex = enabled.findIndex(option => option.id === value)
    const startIndex = currentIndex >= 0 ? currentIndex : 0
    let nextIndex = startIndex

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (startIndex + 1) % enabled.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (startIndex - 1 + enabled.length) % enabled.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = enabled.length - 1
    } else {
      return
    }

    event.preventDefault()
    const next = enabled[nextIndex]
    onChange(next.id)
    focusOption(next.id)
  }

  return (
    <div aria-label={ariaLabel} className="variant-grid" ref={containerRef} role="radiogroup">
      {options.map(option => {
        const checked = option.id === value
        return (
          <button
            aria-checked={checked}
            className={`variant-chip ${checked ? 'variant-chip--active' : ''}`}
            data-variant-id={option.id}
            disabled={option.disabled}
            key={option.id}
            onClick={() => {
              if (!option.disabled) onChange(option.id)
            }}
            onKeyDown={handleKeyDown}
            role="radio"
            tabIndex={checked ? 0 : -1}
            type="button"
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
