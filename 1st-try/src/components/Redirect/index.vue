<script setup lang="ts">
import {RouterView} from 'vue-router'
</script>

<template>
<RouterView :key="$route.name"></RouterView>
</template>

<style scoped lang="scss">

</style>