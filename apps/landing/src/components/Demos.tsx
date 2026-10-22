import { useState } from 'react'
import { VanillaDemo } from '../demos/VanillaDemo'
import { ReactDemo } from '../demos/ReactDemo'
import { VueIsland } from '../demos/VueIsland'

type TabKey = 'vanilla' | 'react' | 'vue'

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: 'vanilla', label: '无框架 core' },
  { key: 'react', label: 'React' },
  { key: 'vue', label: 'Vue' },
]

export function Demos() {
  const [tab, setTab] = useState<TabKey>('vanilla')

  return (
    <section id="demos">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-kicker">One Core, Three Flavors</div>
          <h2 className="section-title">
            同一份核心，<span className="grad-text">三端同台</span>
          </h2>
          <p className="section-sub">
            左侧为真实可点的演示，右侧为对应源码。Vue 演示通过 Vue Island
            挂载——React 页面里跑着真正的 Vue 组件。
          </p>
        </div>

        <div className="reveal">
          <div className="tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                className={`tab${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
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
    <h2 class="mobox-title">Vue 适配版</h2>
    <button data-mobox-close>关闭</button>
  </Mobox>
</template>`}</code>
    </pre>
  )
}
