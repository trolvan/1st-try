<script setup lang="ts">
import {$ct} from '@/utils/CommonTools'

const codeRain = ref()
let intervalTimer: number

onMounted(() => {
	rainCode()
})
onBeforeUnmount(() => {
	window.clearInterval(intervalTimer)
})

function rainCode() {
	const canvas = codeRain.value
	const ctx = canvas.getContext('2d')
	canvas.width = canvas.scrollWidth
	canvas.height = canvas.scrollHeight
	const colWidth = 50
	const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
	const arr = Array(Math.ceil(canvas.width / colWidth)).fill(0)
	intervalTimer = window.setInterval(() => {
		ctx.fillStyle = 'rgba(0,0,0,0.1)'
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = 'rgba(0, 255, 0, 0.35)'
		arr.forEach((item, index) => {
			ctx.fillText(str[$ct.randomNum([0, str.length - 1])], index * colWidth, item + 15)
			arr[index] = item > canvas.height || item > 10000 * Math.random() ? 0 : item + 15
		})
	}, 50)
}
</script>

<template>
  <canvas ref="codeRain"></canvas>
</template>

<style scoped lang="scss">

</style>
