<script setup lang="ts">
const $props = defineProps({
	scon: {
		// 图标名 src/assets/icons下的文件名
		type: String
	},
	econ: {
		// element+ 图标
		type: null
	}
})
const symbolId: any = computed(() => $props.scon ? `#${$props.scon}` : '')
const econFormatter = (name: string) => `ep-${(name || 'eleme')['toLowerCase']()}`
</script>

<template>
  <el-icon v-bind="$attrs">
    <svg v-if="scon" aria-hidden="true">
      <use class="svg-use" :href="symbolId" />
    </svg>
    <component v-else :is="econFormatter(econ)" />
  </el-icon>
</template>

<style scoped lang="scss">
svg {
  vertical-align: -0.1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
