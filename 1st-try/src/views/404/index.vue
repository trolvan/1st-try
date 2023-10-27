<script setup lang="ts">
import {useRouter} from 'vue-router'
import ItzelButton from '_buttons/ItzelButton/index.vue'

const $router = useRouter()
const buttons = [
	{ econ: IEpRefreshLeft, func: () => $router.back(), text: '返回上一级' },
	{ econ: IEpHouse, func: () => $router.push('/'), text: '返回首页', bind: { textColor: '#4096ef' } },
]
</script>

<template>
  <img src="./404.png" alt="404" />
  <div class="text-center mt-8 btns">
    <itzel-button
        v-for="btn in buttons"
        :key="btn.text"
        :econ="btn.econ || btn.ccon"
        v-bind="btn.bind"
        @click="btn.func"
    >{{ btn.text }}</itzel-button>
  </div>
</template>

<style scoped lang="scss">
img {
  display: block;
  margin: 0 auto;
  padding-top: 40px;
}
.btns .button--itzel + .button--itzel {
  margin-left: 32px;
}
</style>
