<!-- demo -->
<script setup>
import logger from '../utils/logger'

const appStore = useAppStore()

// 使用日志工具
const log = logger.getLogger('demo')

function testLogger() {
  log.info('这是来自渲染进程的日志信息')
  log.warn('这是来自渲染进程的警告信息')
  log.error('这是来自渲染进程的错误信息')
  window.$message.success('日志已发送到主进程')
}
</script>

<template>
  <div>
    demo
    <div>
      {{ appStore.loading }}
    </div>
    <n-button @click="testLogger">
      测试日志功能
    </n-button>
    <n-select />
    <test class="mt-10 flex" />
  </div>
</template>

<style scoped>

</style>
