<script setup lang="ts">
import ToolsSelector from '@/views/Home/Plain/components/ToolsSelector.vue'
import WebsiteIntroduction from '@/views/Home/Plain/components/WebsiteIntroduction.vue'
import HeaderMenu from '@/views/Home/publicComps/HeaderMenu/index.vue'
</script>

<template>
<div class="container plain">
  <header-menu />
  <div class="container-mainly">
    <website-introduction />
    <tools-selector class="mt-4" />
  </div>
</div>
</template>

<style scoped lang="scss" src="./plain.scss"></style>
