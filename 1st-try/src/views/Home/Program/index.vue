<script setup lang="ts">
import CodeRainBg from '@/views/Home/Program/components/CodeRainBg.vue'
import HeaderMenu from '@/views/Home/publicComps/HeaderMenu/index.vue'
import WebsiteIntroduction from '@/views/Home/Program/components/WebsiteIntroduction.vue'
import ToolsSelector from '@/views/Home/Program/components/ToolsSelector.vue'

const theme = 'dark'
defineExpose({
	theme
})
</script>

<template>
  <div class="container">
    <code-rain-bg class="bg-animate" />
    <header-menu />
    <scrollbar>
      <div class="container-mainly">
        <website-introduction />
        <tools-selector class="mt-6" />
        <website-introduction />
        <tools-selector class="mt-6" /><website-introduction />
        <tools-selector class="mt-6" />
      </div>
    </scrollbar>
  </div>
</template>

<style scoped lang="scss" src="./program.scss"></style>
