<!-- 空组件，用来全局挂载 message  -->
<script setup>
const message = useMessage()
window.$message = message
</script>

<template>
  <div />
</template>

<style scoped>

</style>
