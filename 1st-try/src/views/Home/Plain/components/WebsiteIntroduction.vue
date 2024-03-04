<script setup lang="ts">
import { introduceText } from '@/views/Home/homeData'

let intervalTimer: number
let flag = 1
const typedText = ref(introduceText[0])
const isTypedAll = computed(() => typedText.value.length === introduceText.length)
const contentRef = ref(null)
const wpRef = ref(null)

onMounted(() => {
	const content = contentRef.value
	if (content && wpRef.value) {
		wpRef.value.style.height = `${content?.offsetHeight}px`
		const _width = wpRef.value.clientWidth
		const paddingX = wpRef.value?.offsetLeft
		contentRef.value.style = `width: ${_width + paddingX * 2}px;padding: 0 ${paddingX}px;left: ${paddingX * -1}px;`
	}
})
onBeforeUnmount(() => {
	window.clearInterval(intervalTimer)
})
intervalTimer = window.setInterval(() => {
	typedText.value = typedText.value.concat(introduceText[flag])
	flag++
	if (flag === introduceText.length) window.clearInterval(intervalTimer)
}, 100)

function fullTyped() {
	if (!isTypedAll.value) {
		window.clearInterval(intervalTimer)
		typedText.value = introduceText
	}
}
</script>

<template>
  <div class="introduction-wp" ref="wpRef">
    <div class="introduction" ref="contentRef">
      <img class="introduction-img" src="" alt="introduction image">
      <div :class="['introduction-txt', { typing: !isTypedAll }]" @click="fullTyped">
        <div class="placeholder">{{ introduceText }}</div>
        <div class="typing-text">{{ typedText }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$bgSideColor: rgba(#000, 0.05);
.introduction-wp {
  position: relative;
  .introduction {
    position: absolute;
    display: flex;
    background: linear-gradient(180deg, $bgSideColor, transparent 20%, transparent 80%, $bgSideColor);
    box-sizing: border-box;
    .introduction-img {
      min-width: 300px;
      min-height: 200px;
    }
    .introduction-txt {
      flex: 1;
      padding: 16px;
      line-height: 18px;
      position: relative;
      .placeholder {
        visibility: hidden;
      }
      .typing-text {
        position: absolute;
        top: 16px;
        left: 16px;
      }
      .placeholder, .typing-text {
        white-space: pre-wrap;
        line-height: 20px;
      }
      &.typing {
        cursor: pointer;
      }
    }
  }
}
</style>
