import {defineStore, storeToRefs} from 'pinia'
import {$co} from '@/utils/CookiesOperator'
import dayjs from 'dayjs'

const userCookieKey = ['noLogin', 'username', 'latestLoginDate', 'loginState']
export const useUserStore = defineStore('user', {
	state: () => ({
		noLogin: Number(cookieOrSession('noLogin') ?? 0),
		loginState: Number(cookieOrSession('loginState') ?? 0),
		username: cookieOrSession('username'),
		latestLoginDate: cookieOrSession('latestLoginDate')
	}),
	getters: {
	},
	actions: {
		login(loginForm: any) {
			this.noLogin = 1
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
			userCookieKey.forEach(key => {
				$co.removeCookie(key)
				sessionStorage.removeItem(key)
			})
			this.$reset()
		}
	}
})

export const userStateRefs = () => storeToRefs(useUserStore())

function cookieOrSession(key: string) {
	return $co.getCookie(key) || sessionStorage.getItem(key)
}
