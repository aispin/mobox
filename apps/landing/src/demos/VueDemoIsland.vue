<script setup lang="ts">
import { ref } from 'vue'
import { Mobox } from '@mobox/vue'

const open = ref(false)
</script>

<template>
  <h3>@mobox/vue</h3>
  <p>
    Vue 3 适配组件，v-model:open 双向绑定，
    Teleport 到 body，内部同样复用 @mobox/core。
  </p>
  <button class="btn btn-primary" @click="open = true">用 Vue 组件打开</button>
  <Mobox v-model:open="open" effect="flip">
    <h2 class="mobox-title">Vue 3.5 适配版</h2>
    <p class="mobox-cont">
      这个弹窗由 <b>@mobox/vue</b> 渲染——你现在看到的整个页面是 React 应用，
      这里是一个 Vue Island。
    </p>
    <div class="mobox-actions">
      <button class="mobox-btn mobox-btn-ghost" data-mobox-close>关闭</button>
      <button class="mobox-btn mobox-btn-primary" data-mobox-close>知道了</button>
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
