<script setup lang="ts">
import {onBeforeUnmount, ref} from 'vue'
import request from '@/utils/Request'
import dayjs from 'dayjs'

const date = ref('')
const text = ref('')
request({ url: '/api/test', method: 'get' }).then((resp: any) => {
	text.value = resp.data
}).catch((e: Error) => {
	console.log(e)
})
const timeout = window.setInterval(() => {
	date.value = dayjs().format('HH:mm:ss')
}, 1000)
onBeforeUnmount(() => window.clearInterval(timeout))
</script>

<template>
<div>{{ text }}</div>
  <div>{{ date }}</div>
</template>

<style scoped lang="scss">

</style>
