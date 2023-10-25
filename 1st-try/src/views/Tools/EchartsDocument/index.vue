<script setup lang="ts">
const src = new URL('/public/echartsDocuments/option.html', import.meta.url).href
</script>

<template>
  <iframe :src="src" title="echarts-doc"></iframe>
</template>

<style scoped lang="scss">
iframe {
  height: calc(100% + 2 * var(--el-main-padding));
  width: calc(100% + 2 * var(--el-main-padding) - 4px);
  border: none;
  display: block;
  margin: calc(0px - var(--el-main-padding));
  padding-left: 4px;
}
</style>
