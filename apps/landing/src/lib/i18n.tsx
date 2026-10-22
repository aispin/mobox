import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'zh' | 'en'

const STORAGE_KEY = 'mobox-lang'

function detectLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'zh' || stored === 'en') return stored
  } catch {
    // storage unavailable
  }
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

const ZH = {
  'nav.effects': '效果',
  'nav.demos': '三端演示',
  'nav.web3d': 'Web3D',
  'nav.install': '安装',
  'nav.lang': '中',
  'nav.theme': '切换明暗主题',

  'hero.badge': 'MOBOX 2.0 现已发布 · 无框架依赖 · PWA',
  'hero.title1': '弹窗，',
  'hero.title2': '重新想象',
  'hero.sub':
    'Modern Dialog + Pop Box + Overlay。效果即组件，基于 <c>Web Animations</c> / <c>WebGL</c> / <c>GLSL</c>。一份核心，三个版本：<c>无框架</c> · <c>React</c> · <c>Vue</c>。',
  'hero.cta1': '立即安装',
  'hero.cta2': '体验 10 种效果',
  'hero.stat1': '可组合效果组件',
  'hero.stat2': '核心运行时依赖',
  'hero.stat3': 'GZIPPED 核心体积',
  'hero.stat4': 'LIGHTHOUSE PWA',

  'features.kicker': 'Why MOBOX 2.0',
  'features.title1': '全新架构，',
  'features.title2': '为现代 Web 而生',
  'features.sub': '全新架构：TypeScript 7、Vite 8、pnpm workspace，以及一整套 Web3D 视觉。',
  'features.f1.title': '零依赖核心',
  'features.f1.desc':
    '@aifire/mobox-core 运行时零依赖，gzip 约 4KB。无 Modernizr、无 Snap.svg、无 jQuery。',
  'features.f2.title': '效果即组件',
  'features.f2.desc': '每种弹窗效果是独立模块，WAAPI 驱动。注册自定义效果只需实现两个方法。',
  'features.f3.title': '三端同源',
  'features.f3.desc': 'core / react / vue 共享同一引擎与效果系统，行为完全一致。',
  'features.f4.title': '现代可访问性',
  'features.f4.desc': '焦点圈禁、ESC 关闭、滚动锁定、inert 隔离、prefers-reduced-motion 全支持。',

  'effects.kicker': 'Effects as Components',
  'effects.title1': '每种效果，都是一个',
  'effects.title2': '独立组件',
  'effects.sub':
    '点击任意卡片，真实打开一个弹窗。效果通过 WAAPI 播放，零 CSS 类名污染；亦可实现 <c>MoboxEffectComponent</c> 接口注册你自己的效果。',
  'effects.zoom': '缩放弹入',
  'effects.fade': '淡入上浮',
  'effects.flip': '3D 翻转',
  'effects.slide': '底部抽屉',
  'effects.blur': '毛玻璃 reveal',
  'effects.glitch': 'RGB 故障风',
  'effects.liquid': '液态形变',
  'effects.warp': '3D 穿越',
  'effects.elastic': '弹簧过冲',
  'effects.sparkle': '粒子爆发',
  'effects.dialog':
    '「{desc}」—— 由独立效果组件 <b>effects/{name}.ts</b> 驱动，通过 Web Animations API 播放，可被任意框架复用或替换。',
  'effects.close': '关闭',
  'effects.gotit': '知道了',

  'arch.kicker': 'Monorepo',
  'arch.title1': '项目',
  'arch.title2': '架构图',
  'arch.sub': '一份 pnpm-workspace.yaml 收敛全部共享依赖版本，TS 7 / Vite 8 / React 19 / Vue 3.5 全量最新。',
  'arch.root': 'mobox (root)',
  'arch.pm': 'packageManager: pnpm@12',
  'arch.workspace': 'pnpm-workspace.yaml',
  'arch.catalogFile': 'catalog: 收敛版本',
  'arch.catalog': 'catalog:',
  'arch.coreSub': '无框架依赖 · 零依赖',
  'arch.reactSub': 'React 19 · forwardRef',
  'arch.vueSub': 'Vue 3.5 · render fn',
  'arch.dist': 'dist: es + umd',
  'arch.landingSub': 'React + Three.js + GLSL + PWA',

  'demos.kicker': 'One Core, Three Flavors',
  'demos.title1': '同一份核心，',
  'demos.title2': '三端同台',
  'demos.sub':
    '左侧为真实可点的演示，右侧为对应源码。Vue 演示通过 Vue Island 挂载——React 页面里跑着真正的 Vue 组件。',
  'demos.tab.vanilla': '无框架 core',
  'demos.tab.react': 'React',
  'demos.tab.vue': 'Vue',
  'demos.vanilla.desc':
    '命令式 API：不传 tpl 时自动使用内置基础模板（title + content + 关闭按钮），也可传自定义模板。',
  'demos.vanilla.btn': '用 core 打开弹窗',
  'demos.vanilla.dialogTitle': '无框架依赖版',
  'demos.vanilla.dialogP':
    '这个弹窗由 <b>@aifire/mobox-core</b> 创建——没有传 tpl，用的是内置基础模板；内容通过 show(data) 绑定到 .mobox-title 等节点。需要按钮或自定义结构时，传自己的 tpl 即可。',
  'demos.react.desc': '受控组件 + forwardRef 命令式句柄。Portal 挂载到 body，open 变化自动同步开关。',
  'demos.react.btn': '用 React 组件打开',
  'demos.react.dialogTitle': 'React 19 适配版',
  'demos.react.dialogP':
    '这是来自 <b>@aifire/mobox-react</b> 的 &lt;Mobox&gt; 组件，内部复用同一份 @aifire/mobox-core 引擎。',
  'demos.vue.desc': 'Vue 3 适配组件，v-model:open 双向绑定，Teleport 到 body，内部同样复用 @aifire/mobox-core。',
  'demos.vue.btn': '用 Vue 组件打开',
  'demos.vue.dialogTitle': 'Vue 3.5 适配版',
  'demos.vue.dialogP':
    '这个弹窗由 <b>@aifire/mobox-vue</b> 渲染——你现在看到的整个页面是 React 应用，这里是一个 Vue Island。',

  'playground.kicker': 'Web3D Playground',
  'playground.title1': 'Canvas 2D ·',
  'playground.title2': '实时粒子场',
  'playground.sub':
    'Hero 背景由 Three.js + 自定义 GLSL Shader（域扭曲星云 + SDF 盒阵光线步进）渲染；这里是一个零依赖的 Canvas 2D 粒子星座，移动鼠标试试。这片粒子场与弹窗引擎同链协作：<b>点击任意星节点，Mobox 弹窗随即点亮</b>——引擎不关心触发源，一次 click 足矣。',
  'playground.dialogTitle': '星节点 #{id}',
  'playground.dialogP':
    '你点击了坐标 ({x}, {y}) 的粒子。这个弹窗由 <b>@aifire/mobox-core</b> 渲染——渲染层与弹窗引擎完全解耦，任意 DOM 事件都能驱动它。',

  'install.kicker': 'Install',
  'install.title1': '三十秒，',
  'install.title2': '接入完成',
  'install.sub':
    '核心零依赖，React / Vue 版按需安装。样式表随包发布，<b>只需引入一次</b>，之后所有弹窗自动获得完整样式与主题变量。',
  'install.step1': '安装包',
  'install.step2': '引入样式（仅一次）',
  'install.step2.note': '两种方式任选其一：直接写进 HTML，或在应用入口 import。之后无需任何额外类名。',
  'install.step3': '打开弹窗',
  'install.step3.desc': '三端用法见上方「三端演示」——core 命令式、React 受控组件、Vue v-model 任选。',
  'install.vue': 'Vue 项目',
  'install.copy': '复制',
  'install.copied': '已复制',

  'banner.available': '发现新版本 v{remote}（当前 v{current}）',
  'banner.swReady': '新版本已就绪，刷新即可生效',
  'banner.update': '立即更新',
  'banner.reload': '刷新页面',

  'footer.license': 'MOBOX 2.0 · MIT License',
  'footer.built': 'built with vite + react + vue + three.js',
} as const

export type MsgKey = keyof typeof ZH

const EN: Record<MsgKey, string> = {
  'nav.effects': 'Effects',
  'nav.demos': 'Demos',
  'nav.web3d': 'Web3D',
  'nav.install': 'Install',
  'nav.lang': 'EN',
  'nav.theme': 'Toggle light/dark theme',

  'hero.badge': 'MOBOX 2.0 is here · Zero-dependency · PWA',
  'hero.title1': 'Dialogs,',
  'hero.title2': 'reimagined',
  'hero.sub':
    'Modern Dialog + Pop Box + Overlay. Effects as components, powered by <c>Web Animations</c> / <c>WebGL</c> / <c>GLSL</c>. One core, three flavors: <c>framework-free</c> · <c>React</c> · <c>Vue</c>.',
  'hero.cta1': 'Install now',
  'hero.cta2': 'Try 10 effects',
  'hero.stat1': 'Composable effect components',
  'hero.stat2': 'Runtime dependencies',
  'hero.stat3': 'Gzipped core size',
  'hero.stat4': 'Lighthouse PWA',

  'features.kicker': 'Why MOBOX 2.0',
  'features.title1': 'A brand-new architecture,',
  'features.title2': 'for the modern web',
  'features.sub':
    'A fresh stack: TypeScript 7, Vite 8, pnpm workspace, and a full Web3D visual system.',
  'features.f1.title': 'Zero-dependency core',
  'features.f1.desc':
    'The @aifire/mobox-core runtime ships zero dependencies, ~4KB gzipped. No Modernizr, no Snap.svg, no jQuery.',
  'features.f2.title': 'Effects as components',
  'features.f2.desc':
    'Every dialog effect is an independent module driven by WAAPI. Register your own with just two methods.',
  'features.f3.title': 'One core, three flavors',
  'features.f3.desc': 'core / react / vue share the same engine and effect system — identical behavior.',
  'features.f4.title': 'Modern accessibility',
  'features.f4.desc':
    'Focus trap, ESC to close, scroll lock, inert isolation, prefers-reduced-motion — all built in.',

  'effects.kicker': 'Effects as Components',
  'effects.title1': 'Every effect is an',
  'effects.title2': 'independent component',
  'effects.sub':
    'Click any card to open a real dialog. Effects play via WAAPI with zero CSS class pollution; implement the <c>MoboxEffectComponent</c> interface to register your own.',
  'effects.zoom': 'Scale in',
  'effects.fade': 'Fade & float',
  'effects.flip': '3D flip',
  'effects.slide': 'Bottom sheet',
  'effects.blur': 'Frosted reveal',
  'effects.glitch': 'RGB glitch',
  'effects.liquid': 'Liquid morph',
  'effects.warp': '3D warp',
  'effects.elastic': 'Spring overshoot',
  'effects.sparkle': 'Particle burst',
  'effects.dialog':
    '&ldquo;{desc}&rdquo; — powered by the standalone effect component <b>effects/{name}.ts</b>, played through the Web Animations API, reusable and replaceable across any framework.',
  'effects.close': 'Close',
  'effects.gotit': 'Got it',

  'arch.kicker': 'Monorepo',
  'arch.title1': 'Project',
  'arch.title2': 'Architecture',
  'arch.sub':
    'A single pnpm-workspace.yaml pins every shared dependency — TS 7 / Vite 8 / React 19 / Vue 3.5, all latest.',
  'arch.root': 'mobox (root)',
  'arch.pm': 'packageManager: pnpm@12',
  'arch.workspace': 'pnpm-workspace.yaml',
  'arch.catalogFile': 'catalog: pinned versions',
  'arch.catalog': 'catalog:',
  'arch.coreSub': 'framework-free · zero deps',
  'arch.reactSub': 'React 19 · forwardRef',
  'arch.vueSub': 'Vue 3.5 · render fn',
  'arch.dist': 'dist: es + umd',
  'arch.landingSub': 'React + Three.js + GLSL + PWA',

  'demos.kicker': 'One Core, Three Flavors',
  'demos.title1': 'One core,',
  'demos.title2': 'three flavors',
  'demos.sub':
    'Real clickable demos on the left, source on the right. The Vue demo mounts as a Vue Island — a genuine Vue component running inside this React page.',
  'demos.tab.vanilla': 'Vanilla core',
  'demos.tab.react': 'React',
  'demos.tab.vue': 'Vue',
  'demos.vanilla.desc':
    'Imperative API: skip tpl to get the built-in basic template (title + content + close button), or pass your own.',
  'demos.vanilla.btn': 'Open with core',
  'demos.vanilla.dialogTitle': 'Framework-free',
  'demos.vanilla.dialogP':
    'This dialog is created by <b>@aifire/mobox-core</b> — no tpl passed, it uses the built-in basic template; content binds to nodes like .mobox-title via show(data). Need buttons or a custom structure? Pass your own tpl.',
  'demos.react.desc':
    'Controlled component + forwardRef imperative handle. Portals to body; the open state stays in sync.',
  'demos.react.btn': 'Open with React',
  'demos.react.dialogTitle': 'React 19 adapter',
  'demos.react.dialogP':
    'This is the &lt;Mobox&gt; component from <b>@aifire/mobox-react</b>, reusing the very same @aifire/mobox-core engine.',
  'demos.vue.desc':
    'Vue 3 adapter component with v-model:open two-way binding, teleported to body, reusing @aifire/mobox-core under the hood.',
  'demos.vue.btn': 'Open with Vue',
  'demos.vue.dialogTitle': 'Vue 3.5 adapter',
  'demos.vue.dialogP':
    'This dialog is rendered by <b>@aifire/mobox-vue</b> — the whole page you see is a React app, and this is a Vue Island.',

  'playground.kicker': 'Web3D Playground',
  'playground.title1': 'Canvas 2D ·',
  'playground.title2': 'live particle field',
  'playground.sub':
    'The hero background is rendered with Three.js and a custom GLSL shader (domain-warped nebula + SDF box ray-marching). Below is a zero-dependency Canvas 2D particle constellation — move your mouse around. This field works hand in hand with the dialog engine: <b>click any star node and a Mobox dialog lights up right there</b> — the engine does not care what triggered it, a single click is enough.',
  'playground.dialogTitle': 'Star node #{id}',
  'playground.dialogP':
    'You clicked the particle at ({x}, {y}). This dialog is rendered by <b>@aifire/mobox-core</b> — the render layer and the dialog engine stay fully decoupled; any DOM event can drive it.',

  'install.kicker': 'Install',
  'install.title1': 'Thirty seconds,',
  'install.title2': 'done',
  'install.sub':
    'The core is zero-dependency; React / Vue adapters install on demand. The stylesheet ships with the package — <b>import it once</b> and every dialog is fully styled.',
  'install.step1': 'Install the package',
  'install.step2': 'Import the CSS (once)',
  'install.step2.note':
    'Pick one: write it in your HTML, or import it in your app entry. No extra class names needed afterwards.',
  'install.step3': 'Open a dialog',
  'install.step3.desc':
    'See the three flavors above — imperative core, controlled React component, or Vue v-model.',
  'install.vue': 'Vue project',
  'install.copy': 'Copy',
  'install.copied': 'Copied',

  'banner.available': 'New version v{remote} available (current v{current})',
  'banner.swReady': 'A new version is ready — reload to apply',
  'banner.update': 'Update now',
  'banner.reload': 'Reload',

  'footer.license': 'MOBOX 2.0 · MIT License',
  'footer.built': 'built with vite + react + vue + three.js',
}

const DICT: Record<Lang, Record<MsgKey, string>> = { zh: ZH, en: EN }

/** Replaces <c>…</c> markers with <code> elements; both branches decode HTML entities. */
function renderRich(text: string): ReactNode {
  const nodes: ReactNode[] = []
  const parts = text.split(/(<c>[\s\S]*?<\/c>)/g)
  parts.forEach((part, i) => {
    if (!part) return
    if (part.startsWith('<c>')) {
      nodes.push(<code key={i} dangerouslySetInnerHTML={{ __html: part.slice(3, -4) }} />)
    } else {
      nodes.push(<span key={i} dangerouslySetInnerHTML={{ __html: part }} />)
    }
  })
  return <>{nodes}</>
}

export interface I18n {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Plain text; supports {placeholder} interpolation. */
  t: (key: MsgKey, vars?: Record<string, string | number>) => string
  /** Text with <c>code</c> and <b>bold</b> markers rendered as elements. */
  rich: (key: MsgKey, vars?: Record<string, string | number>) => ReactNode
}

const I18nContext = createContext<I18n | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // storage unavailable
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const value = useMemo<I18n>(() => {
    const interpolate = (
      key: MsgKey,
      vars?: Record<string, string | number>,
    ): string => {
      let text = DICT[lang][key]
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replaceAll(`{${k}}`, String(v))
        }
      }
      return text
    }
    return {
      lang,
      setLang,
      t: interpolate,
      rich: (key, vars) => renderRich(interpolate(key, vars)),
    }
  }, [lang, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
