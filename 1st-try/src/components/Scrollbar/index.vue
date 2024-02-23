<script setup lang="ts">
const $props = defineProps({
	always: {
		type: Boolean,
		default: true
	}
})

const attrs = { ...useAttrs(), always: $props.always }
</script>

<template>
<el-scrollbar v-bind="attrs">
  <slot />
</el-scrollbar>
</template>

<style scoped lang="scss">
:deep(.el-scrollbar__thumb):active {
  background-color: rgba($scrollbarThumbActiveColor, $scrollbarHoverOpacity);
}
</style>
