<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useUserStore} from '@/stores/user'
import type {FormInstance} from 'element-plus'

const $router = useRouter()
const userStore = useUserStore()

const loginForm = reactive({
	username: '',
	password: '',
	noLogin: true // 近七天免登录
})
const rules = ref({
	username: [{ required: true, message: '用户名不能为空' }],
	password: [{ required: true, message: '密码不能为空' }]
})

const formRef = ref<FormInstance>()

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
	formRef.value?.validate((v: boolean) => {
		if (v) {
			userStore.login(loginForm)
			const path = $router.currentRoute.value.redirectedFrom?.path
          ?? $router.options.history.state.back?.toString()
          ?? '/'
			$router.replace({ path: path })
		}
	})
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
    <el-form :model="loginForm" class="login-form" ref="formRef" :rules="rules">
      <p class="login-title">Login</p>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" show-password v-model="loginForm.password" placeholder="密码" @keydown.enter="login" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
      <el-form-item prop="noLogin">
        <el-checkbox v-model="loginForm.noLogin">近七天免登录</el-checkbox>
      </el-form-item>
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
