import type { MoboxEffectComponent } from './types'

export const zoom: MoboxEffectComponent = {
  name: 'zoom',
  enter: ({ inner }) =>
    inner.animate(
      [
        { opacity: 0, transform: 'scale(0.82) rotate(-1.5deg)' },
        { opacity: 1, transform: 'scale(1) rotate(0deg)' },
      ],
      { duration: 380, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
    ),
  exit: ({ inner }) =>
    inner.animate(
      [
        { opacity: 1, transform: 'scale(1) rotate(0deg)' },
        { opacity: 0, transform: 'scale(0.86) rotate(1deg)' },
      ],
      { duration: 240, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'both' },
    ),
}
