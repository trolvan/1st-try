<script setup lang="ts">
const introduceText = '首先这是一段介绍文字。\n然后这是一段用来介绍这个页面是用来干什么的文字。'
let intervalTimer: number
let flag = 1
const typedText = ref(introduceText[0])
const isTypedAll = computed(() => typedText.value.length === introduceText.length)

onBeforeUnmount(() => {
	window.clearInterval(intervalTimer)
})
intervalTimer = window.setInterval(() => {
	typedText.value = typedText.value.concat(introduceText[flag])
	flag++
	if (flag === introduceText.length) window.clearInterval(intervalTimer)
}, 150)

function fullTyped() {
	if (!isTypedAll.value) {
		window.clearInterval(intervalTimer)
		typedText.value = introduceText
	}
}
</script>

<template>
  <div class="introduction">
    <img class="introduction-img" src="" alt="introduction image">
    <div :class="['introduction-txt', { typing: !isTypedAll }]" @click="fullTyped">
      <div class="placeholder">{{ introduceText }}</div>
      <div class="typing-text">{{ typedText }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.introduction {
  background: linear-gradient(to top, rgba(255, 255, 255, 0.25) 10%, rgba(255, 255, 255, 0.01));
  display: flex;
  border-radius: 4px;
  &-img {
    min-width: 300px;
    min-height: 150px;
  }
  &-txt {
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
      &::after {
        content: '';
        display: inline-block;
        height: 18px;
        width: 1px;
        border-left: 1px solid #fff;
        animation: shineLine 1.1s infinite;
        vertical-align: top;
      }
    }
    .placeholder, .typing-text {
      white-space: pre-wrap;
      line-height: 20px;
    }
    &.typing {
      cursor: pointer;
      .typing-text::after {
        animation-play-state: paused;
      }
    }
  }
}
@keyframes shineLine {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50.1% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
