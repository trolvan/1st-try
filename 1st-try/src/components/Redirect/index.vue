<script setup lang="ts">
import {RouterView} from 'vue-router'
</script>

<template>
<RouterView :key="$route.name || Math.random()"></RouterView>
</template>

<style scoped lang="scss">

</style>