import type { MoboxEffectComponent } from './types'

/** Gooey border-radius morph with a springy squash-and-stretch. */
export const liquid: MoboxEffectComponent = {
  name: 'liquid',
  enter: ({ inner }) => {
    inner.style.borderRadius = '28px'
    return inner.animate(
      [
        { opacity: 0, transform: 'scale(0.55)', borderRadius: '50%' },
        { opacity: 1, transform: 'scale(1.09)', borderRadius: '42% 58% 55% 45% / 48% 52% 55% 45%', offset: 0.65 },
        { opacity: 1, transform: 'scale(0.98)', borderRadius: '24px', offset: 0.85 },
        { opacity: 1, transform: 'scale(1)', borderRadius: '20px' },
      ],
      { duration: 640, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'both' },
    )
  },
  exit: ({ inner }) =>
    inner.animate(
      [
        { opacity: 1, transform: 'scale(1)', borderRadius: '20px' },
        { opacity: 0, transform: 'scale(0.6)', borderRadius: '50%' },
      ],
      { duration: 320, easing: 'cubic-bezier(0.55, 0, 1, 0.45)', fill: 'both' },
    ),
}
