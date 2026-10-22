import { Mobox } from '@mobox/core'

const TPL = `
<div class="mobox" data-effect="glitch">
  <div class="mobox-overlay"></div>
  <div class="mobox-inner">
    <h2 class="mobox-title">无框架依赖版</h2>
    <p class="mobox-cont">
      这个弹窗由 <b>@mobox/core</b> 直接用模板字符串创建，
      没有任何框架参与。数据通过 show(data) 绑定到 .mobox-title 等节点。
    </p>
    <div class="mobox-actions">
      <button class="mobox-btn mobox-btn-ghost" data-mobox-close>关闭</button>
      <button class="mobox-btn mobox-btn-primary" data-mobox-close>知道了</button>
    </div>
    <button class="mobox-icon-close" data-mobox-close aria-label="Close"></button>
  </div>
</div>`

export function VanillaDemo() {
  const open = () => {
    const box = Mobox.create({ tpl: TPL, effect: 'glitch' })
    box?.show({ title: 'Hello, MOBOX core' })
  }

  return (
    <>
      <h3 style={{ margin: 0, fontSize: '1.15rem' }}>@mobox/core</h3>
      <p>
        命令式 API：Mobox.create() + show(data)。模板即结构，
        效果通过 data-effect 指定。
      </p>
      <button className="btn btn-primary" onClick={open}>
        用 core 打开弹窗
      </button>
    </>
  )
}
