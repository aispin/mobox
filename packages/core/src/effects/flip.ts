import type { MoboxEffectComponent } from './types'

export const flip: MoboxEffectComponent = {
  name: 'flip',
  enter: ({ inner }) => {
    inner.style.transformOrigin = '50% 50%'
    return inner.animate(
      [
        { opacity: 0, transform: 'perspective(1200px) rotateY(-72deg)' },
        { opacity: 1, transform: 'perspective(1200px) rotateY(0deg)' },
      ],
      { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
    )
  },
  exit: ({ inner }) =>
    inner.animate(
      [
        { opacity: 1, transform: 'perspective(1200px) rotateY(0deg)' },
        { opacity: 0, transform: 'perspective(1200px) rotateY(56deg)' },
      ],
      { duration: 320, easing: 'cubic-bezier(0.55, 0, 1, 0.45)', fill: 'both' },
    ),
}
