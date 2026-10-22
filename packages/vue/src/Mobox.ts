import {
  Teleport,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'
import { Mobox as MoboxCore, type MoboxInstance, type MoboxOptions } from '@aifire/mobox-core'

export interface MoboxVueProps {
  open?: boolean
  effect?: string
  closeOnOverlay?: boolean
  closeOnEsc?: boolean
  lockScroll?: boolean
  trapFocus?: boolean
  autoDestroy?: boolean
  hideNullValues?: boolean
}

/**
 * Vue 3 adapter for MOBOX. Render-function component (no SFC compiler needed).
 *
 * <Mobox v-model:open="visible" effect="liquid">...</Mobox>
 */
export const Mobox = defineComponent({
  name: 'Mobox',
  props: {
    open: { type: Boolean, default: false },
    effect: { type: String, default: 'zoom' },
    closeOnOverlay: { type: Boolean, default: undefined },
    closeOnEsc: { type: Boolean, default: undefined },
    lockScroll: { type: Boolean, default: undefined },
    trapFocus: { type: Boolean, default: undefined },
    autoDestroy: { type: Boolean, default: undefined },
    hideNullValues: { type: Boolean, default: undefined },
  },
  emits: ['update:open', 'opened', 'closed'],
  setup(props, { emit, slots }) {
    const root = ref<HTMLElement>()
    let inst: MoboxInstance | null = null

    onMounted(() => {
      if (!root.value) return
      const {
        closeOnOverlay,
        closeOnEsc,
        lockScroll,
        trapFocus,
        autoDestroy,
        hideNullValues,
      } = props
      const boxOptions: MoboxOptions = {
        ...(closeOnOverlay !== undefined && { closeOnOverlay }),
        ...(closeOnEsc !== undefined && { closeOnEsc }),
        ...(lockScroll !== undefined && { lockScroll }),
        ...(trapFocus !== undefined && { trapFocus }),
        ...(autoDestroy !== undefined && { autoDestroy }),
        ...(hideNullValues !== undefined && { hideNullValues }),
      }
      inst = new MoboxCore(root.value, {
        ...boxOptions,
        effect: props.effect,
        onOpened: () => emit('opened'),
        onClosed: () => {
          emit('closed')
          emit('update:open', false)
        },
      })
      if (props.open) inst.show()
    })

    watch(
      () => props.open,
      (value) => {
        if (value) inst?.show()
        else inst?.hide()
      },
    )

    onBeforeUnmount(() => {
      inst?.dispose()
      inst = null
    })

    return () =>
      h(Teleport, { to: 'body' }, [
        h(
          'div',
          {
            ref: root,
            class: 'mobox',
            'data-effect': props.effect,
            inert: !props.open,
          },
          [
            h('div', { class: 'mobox-overlay' }),
            h('div', { class: 'mobox-inner', role: 'dialog', 'aria-modal': 'true' }, [
              slots.default?.(),
              h('button', {
                type: 'button',
                class: 'mobox-icon-close',
                'data-mobox-close': true,
                'aria-label': 'Close',
              }),
            ]),
          ],
        ),
      ])
  },
})
