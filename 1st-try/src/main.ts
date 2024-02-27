import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/index.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from '@/router'
import {userStateRefs} from '@/stores/user'
import 'virtual:svg-icons-register'
import * as EPIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

// 全局全量导入element+图标
for (const [key, component] of Object.entries(EPIconsVue)) {
	app.component(`ep-${key.toLowerCase()}`, component)
}

const {noLogin, loginState} = userStateRefs()
router.beforeEach((to, from, next) => {
	if (noLogin.value) {
		next()
	} else if (to.meta.auth) {
		if (loginState.value > 0) {
			next()
		} else {
			next({
				path: '/login'
			})
		}
	} else {
		next()
	}
})
router.afterEach((to) => {
	if (to.meta.title) {
		document.title = to.meta.title as string
	}
})

app.mount('#app')
