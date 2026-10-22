import { useState } from 'react'
import { VanillaDemo } from '../demos/VanillaDemo'
import { ReactDemo } from '../demos/ReactDemo'
import { VueIsland } from '../demos/VueIsland'
import { useI18n } from '../lib/i18n'

type TabKey = 'vanilla' | 'react' | 'vue'

const TABS: Array<{ key: TabKey; labelKey: 'demos.tab.vanilla' | 'demos.tab.react' | 'demos.tab.vue' }> = [
  { key: 'vanilla', labelKey: 'demos.tab.vanilla' },
  { key: 'react', labelKey: 'demos.tab.react' },
  { key: 'vue', labelKey: 'demos.tab.vue' },
]

export function Demos() {
  const [tab, setTab] = useState<TabKey>('vanilla')
  const { t } = useI18n()

  return (
    <section id="demos">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-kicker">{t('demos.kicker')}</div>
          <h2 className="section-title">
            {t('demos.title1')} <span className="grad-text">{t('demos.title2')}</span>
          </h2>
          <p className="section-sub">{t('demos.sub')}</p>
        </div>

        <div className="reveal">
          <div className="tabs" role="tablist">
            {TABS.map((tb) => (
              <button
                key={tb.key}
                role="tab"
                aria-selected={tab === tb.key}
                className={`tab${tab === tb.key ? ' active' : ''}`}
                onClick={() => setTab(tb.key)}
              >
                {t(tb.labelKey)}
              </button>
            ))}
          </div>

          <div className="demo-panel">
            <div className="demo-stage">
              {tab === 'vanilla' && <VanillaDemo />}
              {tab === 'react' && <ReactDemo />}
              {tab === 'vue' && <VueIsland />}
            </div>
            {tab === 'vanilla' && <VanillaCode />}
            {tab === 'react' && <ReactCode />}
            {tab === 'vue' && <VueCode />}
          </div>
        </div>
      </div>
    </section>
  )
}

function VanillaCode() {
  return (
    <pre className="code">
      <code>{`import { Mobox } from '@mobox/core'
import '@mobox/core/mobox.css'

const box = Mobox.create({
  tpl: \`<div class="mobox">
    <div class="mobox-overlay"></div>
    <div class="mobox-inner">
      <h2 class="mobox-title">Hello MOBOX</h2>
      <button data-mobox-close>关闭</button>
    </div>
  </div>\`,
  effect: 'glitch',
})

box.show({ title: 'Hello MOBOX' })`}</code>
    </pre>
  )
}

function ReactCode() {
  return (
    <pre className="code">
      <code>{`import { useState } from 'react'
import { Mobox } from '@mobox/react'
import '@mobox/core/mobox.css'

export function App() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>打开</button>
      <Mobox open={open} effect="liquid"
            onOpenChange={setOpen}>
        <h2 className="mobox-title">React 适配版</h2>
        <button data-mobox-close>关闭</button>
      </Mobox>
    </>
  )
}`}</code>
    </pre>
  )
}

function VueCode() {
  return (
    <pre className="code">
      <code>{`<script setup lang="ts">
import { ref } from 'vue'
import { Mobox } from '@mobox/vue'
import '@mobox/core/mobox.css'

const open = ref(false)
<\/script>

<template>
  <button @click="open = true">打开</button>
  <Mobox v-model:open="open" effect="flip">
    <h2 className="mobox-title">Vue 适配版</h2>
    <button data-mobox-close>关闭</button>
  </Mobox>
</template>`}</code>
    </pre>
  )
}
