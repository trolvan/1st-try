<script setup lang='ts'>
import {useSystemStore, systemStateRefs} from '@/stores/system'
import {$ct} from '@/utils/CommonTools'
import TCircleScale from '@/animations/TCircleScale/index.vue'

const homeTheme = ref('light')
const { homePageIndex, theme } = systemStateRefs()
const pages: any[] = Object.values(import.meta.glob('/src/views/Home/*/index.vue'))

let PageComponent = computed(() => {
	return defineAsyncComponent({
		loader: pages[homePageIndex.value]
	})
})

provide('pages', pages.map(p => {
	const pathArr = p.name.split('/')
	return pathArr[pathArr.length - 2]
}))

const getRandomPageIndex = () => {
	return pages.length > 1 ? $ct.randomNum([0, pages.length - 1]) : 0
}
const hpi:number = homePageIndex.value < 0 ? getRandomPageIndex() : homePageIndex.value
useSystemStore().setHomePageIndex(hpi)

const setHomeTheme = (v, ov) => {
	ov && document.documentElement.classList.remove(ov)
	v && document.documentElement.classList.add(v)
}

watch(homeTheme, (v, ov) => {
	setHomeTheme(v, ov)
})

onBeforeMount(() => {
	setHomeTheme(theme.value, homeTheme.value)
})
onBeforeUnmount(() => {
	(homeTheme.value !== theme.value) && setHomeTheme(theme.value, homeTheme.value)
})
</script>

<template>
  <t-circle-scale>
    <div class="animate-wp" :data-theme="homeTheme || 'light'" :key="homePageIndex">
      <component :is="PageComponent" :ref="(el) => homeTheme = el?.theme || 'light'" />
    </div>
  </t-circle-scale>
</template>

<style scoped lang='scss'>
.animate-wp {
  height: 100%;
  overflow: auto;
}
</style>
