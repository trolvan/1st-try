<script setup lang="ts">
import { useRouter } from 'vue-router'
import { toolList } from '@/views/Home/homeData'

const router = useRouter()
const routeToTool = (path: string) => {
	router.push(path)
}
</script>

<template>
  <el-card shadow="never">
    <el-row type="flex" class="tool-list" :gutter="8">
      <el-col v-for="tool in toolList" :key="tool.name" :span="4">
        <div class="tool-item-wp">
          <div class="tool-item text-center" @click="routeToTool(tool.path)">
            <icon :size="24" :econ="tool.econ" :scon="tool.scon" />
            <div class="mt-1 tool-name">{{ tool.name }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">
.el-card :deep(.el-card__body) {
  padding: 8px 16px;
}
.tool-list {
  flex-wrap: wrap;
  .el-col {
    padding-top: 8px;
    padding-bottom: 8px;
    box-sizing: border-box;
    .tool-item-wp {
      height: 100%;
      max-width: 200px;
      margin: 0 auto;
      cursor: pointer;
      .tool-item {
        height: 100%;
        border: 1px solid transparent;
        border-radius: 4px;
        padding: 8px;
        box-sizing: border-box;
        background: linear-gradient(180deg, rgba($color-info, 0.12), rgba($color-info, 0.01));
        transition: 0.4s;
      }
      &:hover .tool-item {
        border-color: rgba(#000, 0.16);
        box-shadow: 0 8px 8px rgba(#000, 0.08);
        transform: perspective(100px) rotateX(5deg) translateY(-8px);
        transition: 0.4s;
      }
    }
  }
}
</style>
