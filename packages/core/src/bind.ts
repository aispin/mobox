import type { MoboxSceneData } from './types'

interface AttrValue {
  attrs: Record<string, string>
}

function isAttrValue(value: unknown): value is AttrValue {
  return typeof value === 'object' && value !== null && 'attrs' in value
}

function applyValue(node: HTMLElement, value: unknown, hideNull: boolean): void {
  if (value === null || value === undefined) {
    if (hideNull) node.hidden = true
    return
  }
  node.hidden = false

  if (isAttrValue(value)) {
    for (const [key, val] of Object.entries(value.attrs)) {
      node.setAttribute(key, val)
    }
    return
  }

  if (node instanceof HTMLInputElement && (node.type === 'checkbox' || node.type === 'radio')) {
    node.checked = Boolean(value)
  } else if (node instanceof HTMLButtonElement) {
    node.innerHTML = String(value)
  } else if ('value' in node) {
    ;(node as HTMLInputElement).value = String(value)
  } else {
    node.innerHTML = String(value)
  }
}

/**
 * Bind a data object onto template nodes.
 * A key `title` fills `.mobox-title` elements and any `[data-title]` element.
 */
export function bindData(root: HTMLElement, data: MoboxSceneData, hideNull: boolean): void {
  for (const key of Object.keys(data)) {
    const value = data[key]
    const nodes = [
      ...root.querySelectorAll<HTMLElement>(`.mobox-${key}`),
      ...root.querySelectorAll<HTMLElement>(`[data-${key}]`),
    ]
    for (const node of nodes) applyValue(node, value, hideNull)
  }
}
