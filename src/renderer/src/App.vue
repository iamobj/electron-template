<script setup>
import { dateZhCN, zhCN } from 'naive-ui'
// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <n-dialog-provider>
        <div>
          <router-view />
        </div>
        <message-provider />
        <dialog-provider />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
