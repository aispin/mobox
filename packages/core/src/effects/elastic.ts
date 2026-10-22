import type { MoboxEffectComponent } from './types'

/** Springy overshoot pop. */
export const elastic: MoboxEffectComponent = {
  name: 'elastic',
  enter: ({ inner }) =>
    inner.animate(
      [
        { opacity: 0, transform: 'scale(0.3)' },
        { opacity: 1, transform: 'scale(1.14)', offset: 0.55 },
        { opacity: 1, transform: 'scale(0.94)', offset: 0.78 },
        { opacity: 1, transform: 'scale(1.03)', offset: 0.92 },
        { opacity: 1, transform: 'scale(1)' },
      ],
      { duration: 720, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
    ),
  exit: ({ inner }) =>
    inner.animate(
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.4)' },
      ],
      { duration: 260, easing: 'cubic-bezier(0.55, 0, 1, 0.45)', fill: 'both' },
    ),
}
