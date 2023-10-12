<script setup lang='ts'>
import {useUserStore} from '@/stores/user'
import {storeToRefs} from 'pinia'
const userStore = useUserStore()
const { username } = storeToRefs(userStore)
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