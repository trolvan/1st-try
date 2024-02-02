<script setup lang="ts">
import {computed} from 'vue'

const $prop = defineProps({
	// element+ icon
	econ: {
		default: IEpPointer
	},
	// 自定义icon
	ccon: {
		type: String,
		default: ''
	},
	iconSize: {
		type: Number,
		default: 16
	},
	textSize: {
		type: Number,
		default: 14
	},
	textColor: {
		type: String,
		default: '#37474f'
	},
	borderColor: {
		type: String,
		default: ''
	},
	borderWidth: {
		type: String,
		default: ''
	}
})

const btnStyle = computed(() => ({
	color: $prop.textColor,
	fontSize: $prop.textSize + 'px'
}))
</script>

<template>
  <a class="button--itzel clickable text-center" :style="btnStyle">
    <span class="button__border" :style="{ borderColor, borderWidth }"></span>
    <span class="button__icon" :style="{ fontSize: iconSize + 'px' }">
      <i v-if="ccon" :class="ccon" />
      <el-icon v-else>
        <component :is="econ" />
      </el-icon>
    </span>
    <span class="button__text"><slot>example</slot></span>
  </a>
</template>

<style scoped lang="scss">
.button--itzel {
  display: inline-block;
  text-decoration: none;
  min-width: 76px;
  padding: 12px;
  overflow: hidden;
  position: relative;
  .button__border, .button__icon {
    transition: transform 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }
  .button__border {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid;
    border-radius: inherit;
    transform: translateY(100%) translateY(-2px);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    box-sizing: border-box;
  }
  .button__icon {
    position: absolute;
    top: 100%;
    left: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    transform: translateX(-50%);
  }
  .button__text {
    display: block;
    transition: transform 0.3s, opacity 0.3s;
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }
  &:hover {
    .button__border {
      transform: translate(0);
    }
    .button__icon {
      transition-delay: 0.1s;
      transform: translate(-50%, -100%);
    }
    .button__text {
      opacity: 0;
      transform: translate(0, -50%);
      transition-delay: 0s;
    }
  }
}
</style>
