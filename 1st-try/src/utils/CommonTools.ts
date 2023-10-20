class CommonTools {
	/**
	 * @description 生成随机整数
	 * @param range 长度为1的数组  随机范围为 0 ~ arr[0]
	 * @param range 长度为2的数组  随机范围为 arr[0] ~ arr[1]
	 * @param range 长度为2其两个元素相等的数组  随机范围为 0 ~ 1
	 * @param range 长度不为1或2的数组  随机范围为 0 ~ 1
	 * @param range 含有min和max的对象  随机范围为 min ~ max
	 * @param range 可转换为数字的字符  随机范围为 0 ~ str
	 * @param range 非上述情况或为空  随机范围为 0 ~ 1
	 */
	randomNum(range?: any): number {
		const base = Math.random()
		let result: number = 0
		let ra: any
		if (Array.isArray(range) && range.length > 0) {
			// 排除非数字并去重
			const arr = Array.from(new Set(range.filter(item => !isNaN(item)).map(item => Number(item))))
			ra = arr.length > 2 || arr.length === 0 ? [0, 1] : arr
		} else if (typeof range === 'object') {
			ra = Array.from(new Set([Number(range.min ) || 0, Number(range.max ) || 0]))
		} else {
			ra = Number(range) && Number(range) !== 0 ? [0, Number(range)] : [0, 1]
		}
		if (ra.length === 1) {
			ra = ra[0] === 0 ? [0, 1] : [0, ra[0]]
		}
		const sortedArr = ra.sort((a: number, b: number) => (a - b)) // 排序
		const [min, max] = sortedArr
		result = Math.floor(base * (max - min + 1) + min)
		return result
	}

	/**
	 * @description 获取元素长度
	 * @param target 目前支持 num、str、bool、obj、arr、Set、Map类型
	 */
	getLength(target: any): number|void {
		if (typeof target === 'string' || Array.isArray(target)) {
			return  target.length
		} else if (typeof target === 'number') {
			return target.toString().length
		} else if (typeof target === 'boolean') {
			return  1
		} else if (target instanceof Map || target instanceof Set) {
			return target.size
		} else if (typeof target === 'object') {
			let count = 0
			for (const key in target) {
				if (Object.prototype.hasOwnProperty.call(target, key)) {
					count++
				}
			}
			return count
		} else {
			console.error('此方法目前不支持获取目标元素的长度' )
		}
	}

	/**
	 * @description 深克隆
	 */
	deepClone(obj: any): any {
		if(obj === null) return null
		if(typeof obj !== 'object') return obj
		if(obj.constructor===Date) return new Date(obj)
		if(obj.constructor === RegExp) return new RegExp(obj)
		const newObj = new obj.constructor ()  //保持继承链
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {   //不遍历其原型链上的属性
				const val = obj[key]
				newObj[key] = typeof val === 'object' ? this.deepClone(val) : val // 使用arguments.callee解除与函数名的耦合
			}
		}
		return newObj
	}
}

export const $ct = new CommonTools()
export default CommonTools
