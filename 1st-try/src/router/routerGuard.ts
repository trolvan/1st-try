import router from './index'
import CookiesOperator from '../utils/CookiesOperator'

const $co = new CookiesOperator()
router.beforeEach((to, from, next) => {
	if ($co.getCookie('noLogin')) {
		next()
	} else if (to.meta.auth) {
		if (pinia.state.user.username) {
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