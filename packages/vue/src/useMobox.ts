import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Mobox, type MoboxInstance, type MoboxOptions, type MoboxSceneData } from '@mobox/core'

export type UseMoboxOptions = MoboxOptions

/**
 * Imperative MOBOX composable. Bind the returned `el` ref with `ref="el"`
 * (or `:ref="el"`) on any element; the engine normalizes the structure.
 */
export function useMobox(options: UseMoboxOptions = {}) {
  const el = ref<HTMLElement | null>(null)
  let inst: MoboxInstance | null = null

  onMounted(() => {
    if (el.value) inst = new Mobox(el.value, options)
  })

  onBeforeUnmount(() => {
    inst?.destroy()
    inst = null
  })

  return {
    el,
    show: (data?: MoboxSceneData) => inst?.show(data),
    hide: () => inst?.hide(),
    toggle: () => inst?.toggle(),
    get instance() {
      return inst
    },
  }
}
