import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: '初',
			component: () => import('@/views/Home/index.vue')
		}
	]
})

export default router
