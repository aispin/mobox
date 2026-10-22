import type { MoboxEffectComponent } from './types'

/** Frosted-glass reveal: inner de-blurs while the overlay gains a backdrop blur. */
export const blur: MoboxEffectComponent = {
  name: 'blur',
  enter: ({ inner, overlay }) => [
    inner.animate(
      [
        { opacity: 0, filter: 'blur(16px)', transform: 'scale(1.06)' },
        { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' },
      ],
      { duration: 460, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
    ),
    overlay.animate(
      [{ backdropFilter: 'blur(0px)' }, { backdropFilter: 'blur(12px)' }],
      { duration: 460, easing: 'ease-out', fill: 'both' },
    ),
  ],
  exit: ({ inner, overlay }) => [
    inner.animate(
      [
        { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' },
        { opacity: 0, filter: 'blur(12px)', transform: 'scale(1.04)' },
      ],
      { duration: 260, easing: 'ease-in', fill: 'both' },
    ),
    overlay.animate(
      [{ backdropFilter: 'blur(12px)' }, { backdropFilter: 'blur(0px)' }],
      { duration: 260, easing: 'ease-in', fill: 'both' },
    ),
  ],
}
