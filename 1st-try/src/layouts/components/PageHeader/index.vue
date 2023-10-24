<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useSystemStore} from '@/stores/system'
import {useUserStore} from '@/stores/user'

const $router = useRouter()
const $route = useRoute()
const systemStore = useSystemStore()
const userStore = useUserStore()
const hasLogin = computed(() => userStore.loginState > 0)
const items = computed(() => $router.options.routes.filter(route => {
	return hasLogin.value ? !route.meta?.noMenu : !route.meta?.noMenu && route.meta?.auth !== true
}))
const current = computed(() => $route.matched[0].path)
const theme = computed(() => systemStore.theme)
const themeOptions = [
	{ label: '浅色', value: 'light' },
	{ label: '深色', value: 'dark' }
]
const showPopover = ref(false)
function handleChangeTheme(val: string) {
	systemStore.setTheme(val)
}
function logout() {
	userStore.logout()
	$router.replace('/login')
}
</script>

<template>
  <div class="header-wp">
    <el-menu class="header-menu" mode="horizontal" router :default-active="current">
      <el-menu-item v-for="item in items" :key="item.meta?.title" :index="item.path">{{ (item.meta as any)?.title }}</el-menu-item>
    </el-menu>
    <div class="header-right">
      <el-popover v-model:visible="showPopover" placement="left" popper-class="header-right-popover" transition="el-zoom-in-center">
        <template #reference>
          <el-icon size="20">
            <i-ep-more :class="['clickable func-list__icon', { active: showPopover }]" />
          </el-icon>
        </template>
        <ul class="func-list">
          <li @click="logout">
            <el-icon size="16" class="mr-2">
              <i-ep-switch-button v-if="hasLogin" />
              <i-ep-promotion v-else />
            </el-icon>
            {{ hasLogin ? '注销' : '去登录' }}
          </li>
          <li class="func-sub-list">
            <div class="func-sub-list__title">
              <el-icon size="16" class="mr-2"><i-ep-brush /></el-icon>皮肤主题
            </div>
            <div class="func-sub-list__item-wp">
              <div
                  v-for="t in themeOptions"
                  :key="t.label"
                  :class="['func-sub-list__item', { current: theme === t.value }]"
                  @click="handleChangeTheme(t.value)"
              >{{ t.label }}皮肤</div>
            </div>
          </li>
        </ul>
      </el-popover>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hover-style {
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    background: #f0f7ff;
    transition: 0.3s;
  }
}
.color-blue {
  color: #409EFF;
}
.header-wp {
  display: flex;
  align-items: center;
  .el-menu.header-menu {
    flex: 1 1 0;
    display: flex;
    text-align: right;
    background: transparent;
    .el-menu-item {
      height: 50px;
      line-height: 50px;
      color: #000!important;
      &:hover {
        background: rgba(255,255,255,0.45);
      }
      &.is-active {
        background: transparent;
      }
    }
  }
  .header-right {
    flex-shrink: 0;
    .el-tooltip__trigger {
      display: block;
    }
  }
}
.func-list__icon {
  transform: rotate(0deg);
  transition: 0.3s;
  &.active {
    color: #409EFF;
    transform: rotate(-90deg);
    transition: 0.3s;
  }
}
.header-right-popover.el-popover .func-list {
  li {
    padding: 8px 24px;
    &:not(.func-sub-list) {
      @extend .hover-style;
    }
    &.func-sub-list {
      cursor: default;
      .func-sub-list__title {
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        padding-bottom: 8px;
      }
      .func-sub-list__item-wp {
        margin-top: 4px;
        .func-sub-list__item {
          @extend .hover-style;
          padding: 8px 46px;
          margin: 0 -24px;
          &.current {
            color: #409EFF;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.header-right-popover.el-popover {
  padding: 8px 0;
}
</style>
