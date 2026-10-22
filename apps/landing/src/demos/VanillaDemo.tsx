import { Mobox } from '@mobox/core'
import { useI18n } from '../lib/i18n'

export function VanillaDemo() {
  const { t } = useI18n()

  const open = () => {
    const box = Mobox.create({
      tpl: `
<div class="mobox" data-effect="glitch">
  <div class="mobox-overlay"></div>
  <div class="mobox-inner">
    <h2 class="mobox-title">${t('demos.vanilla.dialogTitle')}</h2>
    <p class="mobox-cont">${t('demos.vanilla.dialogP')}</p>
    <div class="mobox-actions">
      <button class="mobox-btn mobox-btn-ghost" data-mobox-close>${t('effects.close')}</button>
      <button class="mobox-btn mobox-btn-primary" data-mobox-close>${t('effects.gotit')}</button>
    </div>
    <button class="mobox-icon-close" data-mobox-close aria-label="${t('effects.close')}"></button>
  </div>
</div>`,
      effect: 'glitch',
    })
    box?.show({ title: 'Hello, MOBOX core' })
  }

  return (
    <>
      <h3 style={{ margin: 0, fontSize: '1.15rem' }}>@mobox/core</h3>
      <p>{t('demos.vanilla.desc')}</p>
      <button className="btn btn-primary" onClick={open}>
        {t('demos.vanilla.btn')}
      </button>
    </>
  )
}
