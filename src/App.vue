<template>
  <TheHeader />
  <main class="main">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import TheHeader from "@/layout/TheHeader.vue";
</script>

<style lang="scss">
.main {
  margin: 0 auto;
  padding: 20px;
  height: calc(100vh - 54px);
}
</style>
