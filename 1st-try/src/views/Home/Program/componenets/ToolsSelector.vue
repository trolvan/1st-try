<script setup lang="ts">
import { useRouter } from 'vue-router'

const toolList = ref(Array(12).fill({}).map((t, i) => ({ name: `demo工具-${i + 1}`, scon: 'tool', path: '/tools/fontCutter' })))
const focusIndex = ref(-1)
const router = useRouter()
const focusTool = (index: number) => {
	focusIndex.value = index
}
const routeToTool = (path: string) => {
	router.push(path)
}
</script>

<template>
  <div class="tool-dev">
    <div class="tool-dev_header">
      <icon size="16px" scon="cmd" />
      <span class="ml-2">1st-try\home\fake-cmd.exe</span>
      <span class="fake-buttons">
        <icon econ="minus" />
        <icon scon="reduction" />
        <icon econ="close" />
      </span>
    </div>
    <div class="tool-dev_content">
      <el-row type="flex" class="tool-list" :gutter="8">
        <el-col v-for="(tool, ti) in toolList" :key="tool.name" :span="3">
          <div :class="['tool-item', {focusing: focusIndex === ti}]" @click="focusTool(ti)" @dblclick="routeToTool(tool.path)" title="双击跳转">
            <icon :size="24" :econ="tool.econ" :scon="tool.scon" />
            <div class="mt-1">{{ tool.name }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tool-dev {
  &_header {
    background: #fff;
    color: #000;
    display: flex;
    align-items: center;
    border-radius: 2px 2px 0 0;
    padding-left: 12px;
    line-height: 30px;
    .fake-buttons {
      font-size: 16px;
      margin-left: auto;
      &>.el-icon, &>svg {
        padding: 10px;
        &:hover {
          background: rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
      }
    }
  }
  &_content {
    border: 1px solid rgba(255, 255, 255, 0.24);
    background: #000;
    padding: 8px 12px;
    height: 300px;
    overflow: auto;
    .tool-list {
      flex-wrap: wrap;
      .tool-item {
        text-align: center;
        padding: 12px;
        margin-bottom: 8px;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: default;
        &:hover {
          border-color: rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.12);
          transition: .2s;
        }
        &.focusing {
          border-color: rgba(255, 255, 255, 0.32);
          background: rgba(255, 255, 255, 0.24);
          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        }
        &, &:hover, &.focusing, &.focusing:hover {
          transition: .2s;
        }
      }
    }
  }
}
</style>
