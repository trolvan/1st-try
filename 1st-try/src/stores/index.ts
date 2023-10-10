import {defineStore} from 'pinia'
import {$co} from '@/utils/CookiesOperator'
import dayjs from 'dayjs'

const userCookieKey = ['noLogin', 'username', 'latestLoginDate']
export const useUserStore = defineStore('user', {
	state: () => ({
		username: cookieOrSession('username'),
		latestLoginDate: cookieOrSession('latestLoginDate')
	}),
	getters: {
	},
	actions: {
		login(loginForm: object) {
			this.username = loginForm.username
			this.latestLoginDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
			const obj = {}
			userCookieKey.forEach(key => {
				const nl = loginForm.noLogin
				obj[key] = this[key] ?? loginForm[key]
				if (nl) {
					$co.setCookie(key, obj[key], 7)
				} else {
					sessionStorage.setItem(key, obj[key].toString())
				}
			})
		},
		logout() {
			this.$reset()
			userCookieKey.forEach(key => {
				$co.removeCookie(key)
				sessionStorage.removeItem(key)
			})
		}
	}
})

function cookieOrSession(key) {
	return $co.getCookie(key) || sessionStorage.getItem(key)
}