const cr = [
	{ name: 'fontCutter', title: '裁字', auth: false }
]
const tools = {
	path: '/tools',
	name: 'tools',
	redirect: `/tools/${cr[0].name}`,
	meta: { title: '工具' },
	component: () => import('@/components/Redirect/index.vue'),
	children: cr.map(child => {
		const fn = child.name.substring(0, 1).toUpperCase() + child.name.substring(1)
		return {
			path: child.name,
			name: child.name,
			meta: { title: child.title, auth: child.auth },
			component: () => import(`@/views/Tools/${fn}/index.vue`)
		}
	})
}
export default tools