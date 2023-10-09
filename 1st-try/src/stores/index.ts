import {defineStore} from 'pinia'
import {$co} from '@/utils/CookiesOperator'

export const useUserStore = defineStore('user', {
	state: () => ({
		username: $co.getCookie('username') ?? '',
		latestLoginDate: $co.getCookie('latestLoginDate') ?? ''
	}),
	getters: {
	},
	actions: {
		login(username) {
			this.username = username
			this.latestLoginDate = new Date().toLocaleDateString()
		},
		logout() {
			this.$reset()
		}
	}
})