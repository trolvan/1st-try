<script setup lang='ts'>
import { computed } from 'vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const username = computed(() => userStore.username)
</script>

<template>
<div>
  welcom--{{ username }}
</div>
</template>

<style scoped lang='scss'>
div {
  color: #f00;
}
</style>