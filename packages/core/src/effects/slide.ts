import type { MoboxEffectComponent } from './types'

/** Bottom-sheet style slide. Pairs well with `data-align="bottom"`. */
export const slide: MoboxEffectComponent = {
  name: 'slide',
  enter: ({ inner }) =>
    inner.animate(
      [
        { opacity: 0.4, transform: 'translateY(100%)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 480, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
    ),
  exit: ({ inner }) =>
    inner.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0.4, transform: 'translateY(100%)' },
      ],
      { duration: 300, easing: 'cubic-bezier(0.55, 0, 1, 0.45)', fill: 'both' },
    ),
}
