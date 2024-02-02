import axios from 'axios'
import { ElNotification } from 'element-plus'

const request = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
	(config) => config,
	(err) => Promise.reject(err)
)

//响应拦截器
request.interceptors.response.use(
	(response) => response,
	(err) => ErrorMessage(err)
)

function ErrorMessage(err: any) {
	const errorMessageMap: any = {
		400: '请求错误', 401: '请求错误', 404: '请求地址错误', 408: '请求超时',
		500: '服务器内部错误', 501: '服务未实现', 502: '网关错误', 503: '服务不可用',
		504: '网关超时', 505: 'HTTP版本不受支持'
	}
	ElNotification({
		title: 'Error',
		message: `${errorMessageMap[err?.response?.status] || '请求失败'}\nurl：${err?.config?.url || ''}`,
		type: 'error',
		customClass: 'pre-wrap'
	})
	return Promise.reject(err)
}

export default request
