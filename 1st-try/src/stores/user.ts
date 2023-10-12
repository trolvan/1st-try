import {defineStore} from 'pinia'
import {$co} from '@/utils/CookiesOperator'
import dayjs from 'dayjs'

const userCookieKey = ['noLogin', 'username', 'latestLoginDate', 'loginState']
export const useUserStore = defineStore('user', {
	state: () => ({
		loginState: parseInt(cookieOrSession('loginState') ?? '0'),
		username: cookieOrSession('username'),
		latestLoginDate: cookieOrSession('latestLoginDate')
	}),
	getters: {
	},
	actions: {
		login(loginForm: any) {
			this.username = loginForm.username
			this.latestLoginDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
			this.loginState = 1
			const obj: any = {}
			userCookieKey.forEach((key: string) => {
				const nl = loginForm.noLogin
				obj[key] = (this as any)[key] ?? loginForm[key]
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

function cookieOrSession(key: string) {
	return $co.getCookie(key) || sessionStorage.getItem(key)
}