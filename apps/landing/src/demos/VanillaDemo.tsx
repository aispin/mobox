import { Mobox } from '@aifire/mobox-core'
import { useI18n } from '../lib/i18n'

export function VanillaDemo() {
  const { t } = useI18n()

  const open = () => {
    // No tpl: falls back to the built-in basic template
    // (title + content + close button). Pass `tpl` for a custom structure.
    const box = Mobox.create({ effect: 'glitch' })
    box?.show({ title: t('demos.vanilla.dialogTitle'), content: t('demos.vanilla.dialogP') })
  }

  return (
    <>
      <h3 style={{ margin: 0, fontSize: '1.15rem' }}>@aifire/mobox-core</h3>
      <p>{t('demos.vanilla.desc')}</p>
      <button className="btn btn-primary" onClick={open}>
        {t('demos.vanilla.btn')}
      </button>
    </>
  )
}
