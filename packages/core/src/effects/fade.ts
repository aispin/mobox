import type { MoboxEffectComponent } from './types'

export const fade: MoboxEffectComponent = {
  name: 'fade',
  enter: ({ inner }) =>
    inner.animate(
      [
        { opacity: 0, transform: 'translateY(14px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
    ),
  exit: ({ inner }) =>
    inner.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(10px)' },
      ],
      { duration: 220, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'both' },
    ),
}
