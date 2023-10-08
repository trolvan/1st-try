import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/login',
			name: 'login',
			meta: { title: '关' },
			component: () => import('@/views/Login/index.vue')
		},
		{
			path: '/',
			name: 'home',
			meta: { title: '始', auth: true },
			component: () => import('@/views/Home/index.vue')
		}
	]
})

export default router
