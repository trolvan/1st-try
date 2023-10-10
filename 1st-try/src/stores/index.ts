import {defineStore} from 'pinia'
import {$co} from '@/utils/CookiesOperator'
import dayjs from 'dayjs'

export const useUserStore = defineStore('user', {
	state: () => ({
		username: $co.getCookie('username') ?? '',
		latestLoginDate: $co.getCookie('latestLoginDate') ?? ''
	}),
	getters: {
	},
	actions: {
		login(username: string) {
			this.username = username
			this.latestLoginDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
		},
		logout() {
			this.$reset()
		}
	}
})