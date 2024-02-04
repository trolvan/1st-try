import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		vueJsx(),
		AutoImport({
			resolvers: [
				ElementPlusResolver(),
				IconsResolver({ enabledCollections: ['ep'] })
			],
			dts: 'types/auto-imports.d.ts'
		}),
		Components({
			resolvers: [
				ElementPlusResolver(),
				IconsResolver({ enabledCollections: ['ep'] }),
			],
			dts: 'types/components.d.ts'
		}),
		ElementPlus({ useSource: true }),
		Icons({ compiler: 'vue3', autoInstall: true }),
		createSvgIconsPlugin({
			iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
			symbolId: '[name]'
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'_buttons': fileURLToPath(new URL('./src/components/Buttons', import.meta.url))
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				// 引入全局样式工具
				additionalData: '@use "@/styles/tools/main.scss" as *;'
			}
		}
	}
})
