import {defineStore, storeToRefs} from 'pinia'

export const useSystemStore = defineStore('system', {
	state: () => ({
		theme: window.sessionStorage.getItem('theme') ?? 'light',
		showSidebar: true,
		homePageIndex: window.sessionStorage.getItem('homePageIndex') ?? -1
	}),
	getters: {
	},
	actions: {
		setTheme(theme: string) {
			this.theme = theme
			window.sessionStorage.setItem('theme', theme)
			document.getElementsByTagName('body')[0].setAttribute('data-theme', theme)
		}
	}
})

export const systemStateRefs = () => storeToRefs(useSystemStore())
