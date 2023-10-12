<script setup lang="ts">
import Items from './Items.vue'
import {computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const $route = useRoute()
const $router = useRouter()

const showSidebar = ref(true)
const second = computed(() => {
	const [_r] = $router.options.routes.filter(item => {
		return item.path === $route.matched[0].path
	})
	return _r.children
})
const defaultActive = computed(() => $route.name)
function toggleSidebar() {
	showSidebar.value = !showSidebar.value
}
</script>

<template>
  <transition>
    <div :class="['sidebar-wp', showSidebar ? '' : 'only-btn']">
      <template v-if="showSidebar">
        <el-button  type="primary" class="m-2" @click="toggleSidebar">收起左侧菜单</el-button>
        <el-menu v-show="showSidebar" class="side-menu" mode="vertical" router :default-active="defaultActive" :collapse-transition="false">
          <template v-for="item in second">
            <template v-if="!item.meta.hidden">
              <items :item="item" :key="item.path" />
            </template>
          </template>
        </el-menu>
      </template>
      <div v-else class="expand-btn" @click="toggleSidebar">
        <el-icon><i-ep-arrow-right /></el-icon>
        <i class="el-icon-arrow-right" /></div>
    </div>
  </transition>
</template>

<style scoped src="./side-menu-style.scss"></style>
<style scoped lang="scss">
.sidebar-wp {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  background: #fff;
  &.only-btn {
    width: auto;
    position: fixed;
    background: transparent;
    top: 0;
    .expand-btn {
      background: wheat;
      border-radius: 0 50% 50% 0;
      padding: 8px;
      font-size: 16px;
      cursor: pointer;
      position: relative;
      left: -4px;
      top: 50%;
      margin-top: -8px;
      z-index: 999;
      transition: 0.4s;
      opacity: 0.4;
      &:hover {
        left: 0;
        opacity: 1;
        transition: 0.4s;
      }
    }
  }
  .side-menu {
    flex: 1 1 0;
  }
}
</style>