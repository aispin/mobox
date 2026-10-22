import { Mobox } from '@mobox/core'

interface EffectDef {
  name: string
  desc: string
}

const EFFECTS: EffectDef[] = [
  { name: 'zoom', desc: '缩放弹入' },
  { name: 'fade', desc: '淡入上浮' },
  { name: 'flip', desc: '3D 翻转' },
  { name: 'slide', desc: '底部抽屉' },
  { name: 'blur', desc: '毛玻璃 reveal' },
  { name: 'glitch', desc: 'RGB 故障风' },
  { name: 'liquid', desc: '液态形变' },
  { name: 'warp', desc: '3D 穿越' },
  { name: 'elastic', desc: '弹簧过冲' },
  { name: 'sparkle', desc: '粒子爆发' },
]

function template(effect: EffectDef): string {
  return `
<div class="mobox" data-effect="${effect.name}" data-align="${effect.name === 'slide' ? 'bottom' : 'center'}">
  <div class="mobox-overlay"></div>
  <div class="mobox-inner">
    <h2 class="mobox-title">${effect.name}</h2>
    <p class="mobox-cont">
      「${effect.desc}」—— 由独立效果组件 <b>effects/${effect.name}.ts</b> 驱动，
      通过 Web Animations API 播放，可被任意框架复用或替换。
    </p>
    <div class="mobox-actions">
      <button class="mobox-btn mobox-btn-ghost" data-mobox-close>关闭</button>
      <button class="mobox-btn mobox-btn-primary" data-mobox-close>知道了</button>
    </div>
    <button class="mobox-icon-close" data-mobox-close aria-label="Close"></button>
  </div>
</div>`
}

export function EffectsGallery() {
  const open = (effect: EffectDef) => {
    Mobox.create({ tpl: template(effect), effect: effect.name })
  }

  return (
    <section id="effects">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-kicker">Effects as Components</div>
          <h2 className="section-title">
            每种效果，都是一个<span className="grad-text">独立组件</span>
          </h2>
          <p className="section-sub">
            点击任意卡片，真实打开一个弹窗。效果通过 WAAPI 播放，
            零 CSS 类名污染；亦可实现 <code>MoboxEffectComponent</code> 接口
            注册你自己的效果。
          </p>
        </div>
        <div className="effects-grid reveal">
          {EFFECTS.map((effect) => (
            <button
              key={effect.name}
              className="effect-card"
              onClick={() => open(effect)}
              aria-label={`演示 ${effect.name} 效果`}
            >
              <span className="glyph">
                <i />
              </span>
              <b>{effect.name}</b>
              <span>{effect.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
