import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import legacyPlugin from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		vueJsx(),
		AutoImport({
			resolvers: [
				ElementPlusResolver()
			],
			imports: ['vue'],
			dts: 'types/auto-imports.d.ts',
			eslintrc: {
				enabled: false // 开启生成对应文件后可关闭  防止重复生成
			}
		}),
		Components({
			resolvers: [
				ElementPlusResolver({
					importStyle: 'sass'
				})
			],
			dts: 'types/components.d.ts'
		}),
		createSvgIconsPlugin({
			iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
			symbolId: '[name]'
		}),
		legacyPlugin({
			targets: ['Chrome 64', 'not IE 11', 'defaults'],
			modernPolyfills: true,
			additionalLegacyPolyfills: ['regenerator-runtime/runtime']
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
				additionalData: `
					@use "@/styles/tools/main.scss" as *;
				`
			}
		}
	},
	build: {
		target: 'es2015',
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		}
	}
})
