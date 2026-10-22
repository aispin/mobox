import type { MoboxEffectComponent } from './types'

/** RGB-split glitch reveal. */
export const glitch: MoboxEffectComponent = {
  name: 'glitch',
  enter: ({ inner }) =>
    inner.animate(
      [
        { opacity: 0, transform: 'translateX(-18px)', filter: 'hue-rotate(120deg) saturate(3)', clipPath: 'inset(0 0 0 0)' },
        { opacity: 1, transform: 'translateX(10px)', filter: 'hue-rotate(60deg) saturate(2)', clipPath: 'inset(18% 0 52% 0)', offset: 0.25 },
        { opacity: 1, transform: 'translateX(-6px)', filter: 'hue-rotate(-40deg) saturate(1.5)', clipPath: 'inset(58% 0 12% 0)', offset: 0.55 },
        { opacity: 1, transform: 'translateX(3px)', filter: 'none', clipPath: 'inset(30% 0 40% 0)', offset: 0.8 },
        { opacity: 1, transform: 'translateX(0)', filter: 'none', clipPath: 'inset(0 0 0 0)' },
      ],
      { duration: 460, easing: 'linear', fill: 'both' },
    ),
  exit: ({ inner }) =>
    inner.animate(
      [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(14px)', filter: 'hue-rotate(90deg)', clipPath: 'inset(40% 0 30% 0)' },
      ],
      { duration: 220, easing: 'steps(4, end)', fill: 'both' },
    ),
}
