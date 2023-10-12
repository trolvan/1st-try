import { createRouter, createWebHashHistory } from 'vue-router'

const routes = []
const rf: any = import.meta.glob('@/router/*.ts', {eager: true})
for (const key in rf) {
	routes.push(rf[key].default)
}

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/login',
			name: 'login',
			meta: { title: '入口', noMenu: true },
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
