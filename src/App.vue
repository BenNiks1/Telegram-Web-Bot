<template>
  <TheHeader />
  <main class="main">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { getPosts } from "@/api/getPosts";
import TheHeader from "@/layout/TheHeader.vue";

onMounted(async () => {
  try {
    const response = await getPosts();
    console.log("response", response);
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss">
.main {
  margin: 0 auto;
  padding: 20px;
  height: calc(100vh - 54px);
}
</style>
