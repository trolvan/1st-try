<script setup lang="ts">
defineProps({
	item: {
		type: Object,
		default: () => ({})
	}
})
</script>

<template>
  <div>
    <template v-if="item.children && item.children.length && !item.meta.onlyOneLayer">
      <el-sub-menu :index="item.path">
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
        <template v-for="itemChild in item.children" :key="itemChild.path">
          <items :item="itemChild" />
        </template>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="item.path">{{ item.meta.title }}</el-menu-item>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>