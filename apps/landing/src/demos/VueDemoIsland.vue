<script setup lang="ts">
import { inject, ref } from 'vue'
import { Mobox } from '@mobox/vue'
import type { MsgKey } from '../lib/i18n'

const t = inject<(key: MsgKey) => string>('mobox-t')!
const open = ref(false)
</script>

<template>
  <h3>@mobox/vue</h3>
  <p>{{ t('demos.vue.desc') }}</p>
  <button class="btn btn-primary" @click="open = true">{{ t('demos.vue.btn') }}</button>
  <Mobox v-model:open="open" effect="flip">
    <h2 class="mobox-title">{{ t('demos.vue.dialogTitle') }}</h2>
    <p class="mobox-cont" v-html="t('demos.vue.dialogP')" />
    <div class="mobox-actions">
      <button class="mobox-btn mobox-btn-ghost" data-mobox-close>{{ t('effects.close') }}</button>
      <button class="mobox-btn mobox-btn-primary" data-mobox-close>{{ t('effects.gotit') }}</button>
    </div>
  </Mobox>
</template>

<style scoped>
h3 {
  margin: 0;
  font-size: 1.15rem;
}

p {
  margin: 0;
  color: var(--text-dim);
  font-size: 0.95rem;
}
</style>
