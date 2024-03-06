<script setup lang="ts">
import {useUserStore} from '@/stores/user'
import {systemStateRefs, useSystemStore} from '@/stores/system'
import {useRouter} from 'vue-router'

const $props = defineProps({
	height: {
		type: String,
		default: '50px'
	}
})

const userStore = useUserStore()
const $router = useRouter()
const hasLogin = computed(() => userStore.loginState > 0)
const {homePageIndex} = systemStateRefs()
const pages = inject('pages', [])

const log = () => {
	hasLogin.value && userStore.logout()
	$router.push('/login')
}
const changeHomePage = (index: number) => {
	homePageIndex.value !== index && useSystemStore().setHomePageIndex(index)
}
</script>

<template>
  <div class="header-menu" :style="{ height }">
    <slot>
      <el-button class="log-btn" @click="log">{{ hasLogin ? '注销' : '去登录'}}</el-button>
      <el-dropdown :hide-on-click="false" @command="changeHomePage">
        <icon scon="framework" size="24" class="home-page-selector" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
                v-for="(page, pi) in pages"
                :key="page"
                :class="{current: pi === homePageIndex}"
                :command="pi"
            >{{ page }} <icon econ="select" class="selected-flag" /></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </slot>
  </div>
</template>

<style scoped lang="scss">
.log-btn {
  height: 100%;
  width: 72px;
  background: transparent;
  border: none;
  margin-left: auto;
}
.el-dropdown {
  &:focus-visible {
    outline: none;
  }
  .home-page-selector {
    height: 100%;
    padding: 0 8px;
  }
}
.el-dropdown-menu :deep(.el-dropdown-menu__item) {
  display: flex;
  padding-right: 8px;
  .selected-flag {
    margin-left: auto;
    padding-left: 8px;
    visibility: hidden;
  }
  &.current {
    color: $color-primary;
    cursor: default;
    .selected-flag {
      visibility: visible;
    }
    &:hover {
      background: transparent;
    }
  }
}
</style>
