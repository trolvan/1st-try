<script setup lang='ts'>
import {systemStateRefs} from '@/stores/system'
import {$ct} from '@/utils/CommonTools'

const { homePageIndex } = systemStateRefs()
const pages: any[] = Object.values(import.meta.glob('/src/views/Home/*/index.vue'))
if (Number(homePageIndex.value) < 0) {
	homePageIndex.value = pages.length > 1 ? $ct.randomNum([0, pages.length - 1]) : 0
	sessionStorage.setItem('homeIndex', homePageIndex.value.toString())
}
const PageComponent = defineAsyncComponent(pages[homePageIndex.value])
</script>

<template>
  <page-component />
</template>

<style scoped lang='scss'>
</style>
