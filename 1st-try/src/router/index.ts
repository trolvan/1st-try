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
		...routes,
		{ path: '/:pathMatch(.*)', meta: { noMenu: true }, redirect: '/404' },
		{
			path: '/404',
			name: '404',
			meta: { title: '404', noMenu: true },
			component: () => import('@/views/404/index.vue')
		}
	]
})

export default router
