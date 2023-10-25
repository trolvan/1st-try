<script setup lang="ts">
import PageHeader from '../components/PageHeader/index.vue'
import {computed, defineAsyncComponent} from 'vue'
import {useRoute} from 'vue-router'

const $route = useRoute()
const withSidebar = computed(() => !$route.meta.hideSidebar)
const sidebarComp = computed(() => ($route.meta.sidebarComp as string) ?? 'Base')
const comps = import.meta.glob('../components/Sidebar/**/index.vue')
const Sidebar = defineAsyncComponent(comps[`../components/Sidebar/${sidebarComp.value}/index.vue`])
</script>

<template>
  <el-container class="main-container">
    <el-header class="page-header">
      <page-header />
    </el-header>
    <el-container class="page-container">
      <el-aside v-if="withSidebar" class="page-left">
        <component :is="Sidebar" />
      </el-aside>
      <el-main class="page-right">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.main-container {
  height: 100%;
  width: 100%;
  .page-header {
    height: 50px!important;
    background: wheat;
  }
  .page-container {
    height: calc(100% - 50px);
    overflow: auto;
  }
  .page-left {
    flex-shrink: 0;
    width: auto!important;
    box-shadow: 4px 2px 4px rgba(0,0,0,0.06);
  }
}
</style>
