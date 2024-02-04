<script setup lang="ts">
import {computed} from 'vue'
const $props = defineProps({
	// prefix: {
	// 	type: String,
	// 	default: 'icon'
	// },
	icon: {
		// 图标名 src/assets/icons下的文件名
		type: String,
		required: true
	}
})
const symbolId = computed(() => `#${$props.icon}`)
</script>

<template>
  <el-icon v-bind="$attrs">
    <svg aria-hidden="true">
      <use class="svg-use" :href="symbolId" />
    </svg>
  </el-icon>
</template>

<style scoped lang="scss">
.svg-icon {
  vertical-align: -0.1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
