import { Mobox } from '@aifire/mobox-core'
import { useI18n } from '../lib/i18n'

const EFFECTS = [
  'zoom',
  'fade',
  'flip',
  'slide',
  'blur',
  'glitch',
  'liquid',
  'warp',
  'elastic',
  'sparkle',
] as const

type EffectName = (typeof EFFECTS)[number]

export function EffectsGallery() {
  const { t, rich } = useI18n()

  const open = (name: EffectName) => {
    const desc = t(`effects.${name}` as const)
    Mobox.create({
      tpl: `
<div class="mobox" data-effect="${name}" data-align="${name === 'slide' ? 'bottom' : 'center'}">
  <div class="mobox-overlay"></div>
  <div class="mobox-inner">
    <h2 class="mobox-title">${name}</h2>
    <p class="mobox-cont">${t('effects.dialog', { desc, name })}</p>
    <div class="mobox-actions">
      <button class="mobox-btn mobox-btn-ghost" data-mobox-close>${t('effects.close')}</button>
      <button class="mobox-btn mobox-btn-primary" data-mobox-close>${t('effects.gotit')}</button>
    </div>
    <button class="mobox-icon-close" data-mobox-close aria-label="${t('effects.close')}"></button>
  </div>
</div>`,
      effect: name,
    })
  }

  return (
    <section id="effects">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-kicker">{t('effects.kicker')}</div>
          <h2 className="section-title">
            {t('effects.title1')} <span className="grad-text">{t('effects.title2')}</span>
          </h2>
          <p className="section-sub">{rich('effects.sub')}</p>
        </div>
        <div className="effects-grid reveal">
          {EFFECTS.map((name) => (
            <button
              key={name}
              className="effect-card"
              onClick={() => open(name)}
              aria-label={`${name} — ${t(`effects.${name}` as const)}`}
            >
              <span className="glyph">
                <i />
              </span>
              <b>{name}</b>
              <span>{t(`effects.${name}` as const)}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
