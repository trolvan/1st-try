class CookiesOperator {
	/**
	 * @description 添加cookie 或 根据键名更新对应cookie
	 * @param cname cookie键名
	 * @param cVal cookie键值
	 * @param dVal 存在时间
	 * @param dType 时间类型 默认为日
	 */
	setCookie(cname:string, cVal:any, dVal:number, dType?:string) {
		const d:Date = new Date()
		switch (dType) {
		case 'y': // 年
			d.setFullYear(d.getFullYear() + dVal)
			break
		case 'M': // 月
			d.setMonth(d.getMonth() + dVal)
			break
		case 'd': // 日
			d.setTime(d.getTime() + dVal * 24 * 60 * 60 * 1000)
			break
		case 'h': // 时
			d.setTime(d.getTime() + dVal * 60 * 60 * 1000)
			break
		case 'm': // 分
			d.setTime(d.getTime() + dVal * 60 * 1000)
			break
		case 's': // 秒
			d.setTime(d.getTime() + dVal * 1000)
			break
		default: // 默认为日
			d.setTime(d.getTime() + dVal * 24 * 60 * 60 * 1000)
		}
		const expires = 'expires=' + d.toLocaleTimeString()
		document.cookie = `${cname}=${cVal}; ${expires}`
	}
	/**
	 * @description 根据键名获取cookie对应值
	 */
	getCookie(cname: string) {
		const name:string = cname + '='
		const cArray:string[] = document.cookie.split('; ')
		const cookie = cArray.find((item) => {
			return item.startsWith(name)
		})
		return cookie ? cookie.substring(name.length, cookie.length) : ''
	}
	/**
	 * @description 根据键名去除对应cookie
	 */
	removeCookie(cname:string) {
		document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
	}
}

export const $co = new CookiesOperator()
export default CookiesOperator
