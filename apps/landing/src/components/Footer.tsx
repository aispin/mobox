import { useI18n } from '../lib/i18n'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>{t('footer.license')}</span>
        <span style={{ fontFamily: 'var(--mono)' }}>{t('footer.built')}</span>
      </div>
    </footer>
  )
}
