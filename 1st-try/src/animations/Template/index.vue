<script setup lang="ts">
// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
const onBeforeEnter = (el) => {}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
const onEnter = (el, done) => {
	// 调用回调函数 done 表示过渡结束
	// 如果与 CSS 结合使用，则这个回调是可选参数
	done()
}

// 当进入过渡完成时调用。
const onAfterEnter = (el) => {}

// 当进入过渡在完成之前被取消时调用
const onEnterCancelled = (el) => {}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
const onBeforeLeave = (el) => {}

// 在离开过渡开始时调用
// 用这个来开始离开动画
const onLeave = (el, done) => {
	// 调用回调函数 done 表示过渡结束
	// 如果与 CSS 结合使用，则这个回调是可选参数
	done()
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
const onAfterLeave = (el) => {}

// 仅在 v-show 过渡中可用
const onLeaveCancelled = (el) => {}
</script>

<template>
  <transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @enter-cancelled="onEnterCancelled"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
      @leave-cancelled="onLeaveCancelled"
  >
    <slot />
  </Transition>
</template>

<!-- 尽量别用scoped 因为不会应用到slot内容上-->
<style lang="scss">

</style>
