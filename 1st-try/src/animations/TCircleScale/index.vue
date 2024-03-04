<script setup lang="ts">
const timeout = ref(null)
const onBeforeLeave = (el) => {
	const r = Math.hypot(window.innerWidth, window.innerHeight)
	el.style.clipPath = `circle(${r}px at 0 0)`
}

const onLeave = (el, done) => {
	const dur = 0.5
	el.style = `clip-path: circle(0 at 0 0);transition: ${dur}s ease-in;`
	timeout.value = window.setTimeout(() => {
		done()
		window.clearTimeout(timeout.value)
		timeout.value = null
	}, dur * 1000)
}
</script>

<template>
  <transition
      name="t-circle-scale"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
  >
    <slot />
  </transition>
</template>

<!-- 尽量别用scoped 因为不会应用到slot内容上-->
<style lang="scss">
.t-circle-scale {
  @at-root [class*=t-circle-scale-] {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    pointer-events: none;
  }
  &-enter-active {
    z-index: 11;
  }
  &-leave-active {
    z-index: 12;
  }
}
</style>
