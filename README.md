# MOBOX 2.0

同一份核心，三种形态。一个零依赖的弹窗（modal / dialog / popup）引擎，外加 React、Vue 适配层，全部由 pnpm workspace + catalog 收敛版本。

- **`@aifire/mobox-core`** — 零依赖 TypeScript 引擎。每个动画效果都是独立组件（Web Animations API + CSS 变量 + SVG/Canvas/WebGL 特效），支持 `registerEffect` 注册自定义效果。`Mobox.create()` 不传 `tpl` 时使用内置基础模板（title + content + 关闭按钮），传 `tpl` 则完全自定义结构。
- **`@aifire/mobox-react`** — React 19 适配：`<Mobox>` 受控组件 + `useMobox` hook，Portal 挂载 body，open 变化自动同步。
- **`@aifire/mobox-vue`** — Vue 3 适配：`v-model:open` 双向绑定 + Teleport 到 body。

内置 10 种效果：`fade` `zoom` `flip` `slide` `blur` `glitch` `liquid` `warp` `elastic` `sparkle`。

## 快速开始

```bash
pnpm install
pnpm -r build      # 构建全部包 + 落地页
pnpm dev           # 启动落地页 dev server
```

### 无框架

```html
<link rel="stylesheet" href="@aifire/mobox-core/mobox.css" />
<script type="module">
  import { Mobox } from '@aifire/mobox-core'
  // 不传 tpl：使用内置基础模板（title + content + 关闭按钮）
  Mobox.create({ effect: 'liquid' }).show({ title: 'Hello', content: 'MOBOX' })
  // 自定义结构：Mobox.create({ tpl: '#tpl', effect: 'liquid' })
</script>
```

### React

```tsx
import { Mobox, useMobox } from '@aifire/mobox-react'
import '@aifire/mobox-core/mobox.css'

const [open, setOpen] = useState(false)
<Mobox open={open} effect="zoom" onOpenChange={setOpen}>content</Mobox>
```

### Vue

```vue
<script setup>
import { ref } from 'vue'
import { Mobox } from '@aifire/mobox-vue'
import '@aifire/mobox-core/mobox.css'
const open = ref(false)
</script>
<template>
  <Mobox v-model:open="open" effect="glitch">content</Mobox>
</template>
```

## 仓库结构

```
packages/core    # @aifire/mobox-core  — 零依赖引擎 + 效果组件
packages/react   # @aifire/mobox-react — React 19 适配
packages/vue     # @aifire/mobox-vue   — Vue 3 适配
apps/landing     # PWA 落地页（Three.js GLSL hero + Canvas 粒子 + 版本发现）
```

## 落地页

`apps/landing` 是 PWA 落地页：Three.js + 自定义 GLSL Shader  Hero、Canvas 2D 粒子场、SVG 架构图、三端实时演示。带 `version.json` 版本发现与更新横幅（vite-plugin-pwa + workbox）。

## License

MIT
