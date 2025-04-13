<!-- 侧边栏 -->
<script setup>
import {
  BorderAll as DemoIcon,
  SmartHome as HomeIcon,
} from '@vicons/tabler'
import { RouterLink } from 'vue-router'
import logo from '../../../../resources/icon.png'

const route = useRoute()

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = reactive([
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'home',
        },
      },
      {
        default: () => '首页',
      },
    ),
    key: 'home',
    icon: renderIcon(HomeIcon),
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'demo',
        },
      },
      {
        default: () => 'demo',
      },
    ),
    key: 'demo',
    icon: renderIcon(DemoIcon),
  },
])
const activeKey = computed(() => route.meta.leftMenuSelectedKey)
</script>

<template>
  <div class="h-full flex flex-shrink-0 flex-col overflow-hidden">
    <div class="text-center" style="-webkit-app-region: drag;">
      <n-image class="mt-8" preview-disabled height="48" width="48" :src="logo" />
    </div>
    <n-scrollbar class="flex-1">
      <n-menu class="menu" :value="activeKey" :collapsed-width="65" :options="menuOptions" />
    </n-scrollbar>
  </div>
</template>

<style scoped>
:deep(.menu) {
  .n-menu-item-content:not(.n-menu-item-content--disabled):not(.n-menu-item-content--selected):hover::before {
    background-color: rgba(16,24,40,4%);
  }
}
</style>
