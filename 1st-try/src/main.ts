import './styles/index.scss'

import {createApp} from 'vue'
import {createPinia, storeToRefs} from 'pinia'

import App from './App.vue'
import router from '@/router'
import {useUserStore} from '@/stores/user'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

const userStore = useUserStore()
const {noLogin, loginState} = storeToRefs(userStore)
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
