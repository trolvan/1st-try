<script setup lang="ts">
import {useUserStore} from '@/stores/user'
import {useRouter} from 'vue-router'

const userStore = useUserStore()
const $router = useRouter()
const hasLogin = computed(() => userStore.loginState > 0)

function log() {
	hasLogin.value && userStore.logout()
	$router.push('/login')
}
</script>

<template>
  <div class="fixed-header">
    <el-button class="log-btn" @click="log">{{ hasLogin ? '注销' : '去登录'}}</el-button>
  </div>
</template>

<style scoped lang="scss">
</style>
