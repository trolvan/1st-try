import './styles/index.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from '@/router'
import {userStateRefs} from '@/stores/user'
import 'virtual:svg-icons-register'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

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
