<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import { useRouter } from 'vue-router'
import {ElForm, ElFormItem, ElCard, ElButton} from 'element-plus'
import {$co} from '@/utils/CookiesOperator'

const $router = useRouter()

const loginForm = ref({
	username: 'admin',
	password: '123'
})
const nlnsd = ref(true) // 近七天免登录

onMounted(() => {
	window.addEventListener('keypress', handleKeyPress)
})
onUnmounted(() => {
	window.removeEventListener('keypress', handleKeyPress)
})

function login() {
	// const data = loginForm.value
	// toLogin(data).then(successResponse => {
	// 	if (successResponse.data.code === 200) {
	// _this.$store.commit('login', _this.loginForm)
	const path = $router.currentRoute.value.redirectedFrom.path
	$router.replace({ path: path === '/' ? '/' : (path || '/') })
	nlnsd.value && $co.setCookie('noLogin', true, 7)
	// 	}
	// })
	// 	.catch(failResponse => {
	// 		console.log(failResponse)
	// 	})
}
function handleKeyPress(e: any) {
	if (e.code === 'Enter') {
		login()
	}
}
</script>

<template>
  <el-card class="login-card">
    <el-form :model="loginForm" class="login-form">
      <p class="login-title">Login</p>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username" placeholder="用户名"/>
      </el-form-item>
      <el-form-item>
        <el-input type="password" show-password v-model="loginForm.password" placeholder="密码" @keydown.enter="login" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
      <el-checkbox v-model="nlnsd">近七天免登录</el-checkbox>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
.login-card {
  width: 400px;
  margin: 0 auto;
  position: relative;
  top: 200px;
  .login-title {
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 16px;
    margin-top: 0;
    text-align: center;
    margin-bottom: 16px;
  }
  .el-button {
    width: 100%;
  }
}
</style>