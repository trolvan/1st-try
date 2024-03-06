import {defineStore, storeToRefs} from 'pinia'
import {useColorMode} from '@vueuse/core'

export const useSystemStore = defineStore('system', {
	state: () => ({
		theme: useColorMode(),
		showSidebar: true,
		homePageIndex: Number(window.sessionStorage.getItem('homePageIndex') ?? -1)
	}),
	getters: {
	},
	actions: {
		setTheme(theme: string) {
			this.theme = theme
		},
		setHomePageIndex(index: number) {
			if(this.homePageIndex !== index) this.homePageIndex = index
			sessionStorage.setItem('homeIndex', this.homePageIndex.toString())
		}
	}
})

export const systemStateRefs = () => storeToRefs(useSystemStore())
