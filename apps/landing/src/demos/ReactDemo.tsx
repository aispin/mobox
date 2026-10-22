import { useState } from 'react'
import { Mobox } from '@mobox/react'

export function ReactDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <h3 style={{ margin: 0, fontSize: '1.15rem' }}>@mobox/react</h3>
      <p>
        受控组件 + forwardRef 命令式句柄。Portal 挂载到 body，
        open 变化自动同步开关。
      </p>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        用 React 组件打开
      </button>
      <Mobox open={open} effect="liquid" onOpenChange={setOpen}>
        <h2 className="mobox-title">React 19 适配版</h2>
        <p className="mobox-cont">
          这是来自 <b>@mobox/react</b> 的 &lt;Mobox&gt; 组件，
          内部复用同一份 @mobox/core 引擎。
        </p>
        <div className="mobox-actions">
          <button className="mobox-btn mobox-btn-ghost" data-mobox-close>
            关闭
          </button>
          <button className="mobox-btn mobox-btn-primary" data-mobox-close>
            知道了
          </button>
        </div>
      </Mobox>
    </>
  )
}
