import { useState } from 'react'
import { Mobox } from '@mobox/react'
import { useI18n } from '../lib/i18n'

export function ReactDemo() {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()

  return (
    <>
      <h3 style={{ margin: 0, fontSize: '1.15rem' }}>@mobox/react</h3>
      <p>{t('demos.react.desc')}</p>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        {t('demos.react.btn')}
      </button>
      <Mobox open={open} effect="liquid" onOpenChange={setOpen}>
        <h2 className="mobox-title">{t('demos.react.dialogTitle')}</h2>
        <p
          className="mobox-cont"
          dangerouslySetInnerHTML={{ __html: t('demos.react.dialogP') }}
        />
        <div className="mobox-actions">
          <button className="mobox-btn mobox-btn-ghost" data-mobox-close>
            {t('effects.close')}
          </button>
          <button className="mobox-btn mobox-btn-primary" data-mobox-close>
            {t('effects.gotit')}
          </button>
        </div>
      </Mobox>
    </>
  )
}
