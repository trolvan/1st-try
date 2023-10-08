import {defineStore} from 'pinia'

export const useUserStore = defineStore('users', {
	state: () => ({
		username: ''
	})
	// gutters: {},
	// actions: {}
})