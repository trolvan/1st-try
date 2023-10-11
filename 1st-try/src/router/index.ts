import { createRouter, createWebHistory } from 'vue-router'

const routes = []
const rf: RF = import.meta.glob('@/router/*.ts', {eager: true})
for (const key in rf) {
	routes.push(rf[key].default)
}
interface RF {
	[key: string]: any
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/login',
			name: 'login',
			meta: { title: '入口' },
			component: () => import('@/views/Login/index.vue')
		},
		{
			path: '/',
			name: 'home',
			meta: { title: '首页', auth: true },
			component: () => import('@/views/Home/index.vue')
		},
		...routes
	]
})

export default router
