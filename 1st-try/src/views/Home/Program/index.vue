<script setup lang="ts">
import CodeRainBg from './componenets/CodeRainBg.vue'
import FixedHeader from './componenets/FixedHeader.vue'
import WebsiteIntroduction from './componenets/WebsiteIntroduction.vue'
import ToolsSelector from './componenets/ToolsSelector.vue'
</script>

<template>
  <div class="container">
    <code-rain-bg class="bg-animate" />
    <fixed-header />
    <div class="container-mainly">
      <website-introduction />
      <tools-selector class="mt-6" />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./program.scss">
</style>
