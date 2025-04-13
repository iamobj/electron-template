<!--  -->
<script setup>
import { mainWindowConstants } from '@/common/configs/constants'
import sider from './sider.vue'

const collapsed = ref(false)

function handleUpdateCollapsed(flag) {
  collapsed.value = flag
}
</script>

<template>
  <div>
    <n-layout class="h-vh w-vw">
      <n-layout-header class="bg-$app-nav-bg" :style="`height: ${mainWindowConstants.titleHeight}px;-webkit-app-region: drag;`" />
      <n-layout has-sider :style="`height: calc(100vh - ${mainWindowConstants.titleHeight}px);`">
        <n-layout-sider show-trigger collapse-mode="width" :collapsed-width="66" class="bg-$app-nav-bg" :width="mainWindowConstants.sidebarWidth" :collapsed="collapsed" @update:collapsed="handleUpdateCollapsed">
          <sider />
        </n-layout-sider>
        <n-layout class="bg-$app-nav-bg pb-8 pr-8">
          <div class="h-full border-rd-6 bg-white p-8">
            <router-view />
          </div>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<style scoped></style>
