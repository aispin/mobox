import type { MoboxEffectComponent } from './types'

/** 3D fly-in from below the horizon. */
export const warp: MoboxEffectComponent = {
  name: 'warp',
  enter: ({ inner }) => {
    inner.style.transformOrigin = '50% 100%'
    return inner.animate(
      [
        { opacity: 0, transform: 'perspective(1000px) rotateX(42deg) translateZ(-280px)' },
        { opacity: 1, transform: 'perspective(1000px) rotateX(0deg) translateZ(0)' },
      ],
      { duration: 560, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
    )
  },
  exit: ({ inner }) =>
    inner.animate(
      [
        { opacity: 1, transform: 'perspective(1000px) rotateX(0deg) translateZ(0)' },
        { opacity: 0, transform: 'perspective(1000px) rotateX(-32deg) translateZ(-200px)' },
      ],
      { duration: 340, easing: 'cubic-bezier(0.55, 0, 1, 0.45)', fill: 'both' },
    ),
}
