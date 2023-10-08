import './styles/index.scss'

import {createApp, computed} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from '@/router'
import {$co} from '@/utils/CookiesOperator'
import {useUserStore} from '@/stores'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

const userStore = useUserStore()
const username = computed(() => userStore.username)
router.beforeEach((to, from, next) => {
	if ($co.getCookie('noLogin')) {
		next()
	} else if (to.meta.auth) {
		if (username.value) {
			next()
		} else {
			next({
				path: 'login'
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
