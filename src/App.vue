<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { getPosts } from "@/api/getPosts";

onMounted(async () => {
  try {
    const response = await getPosts();
    console.log("response", response);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <!-- <nav>
    <RouterLink to="/">Список</RouterLink>
    <RouterLink to="/create">Создать</RouterLink>
  </nav> -->
  <RouterView />
</template>

<style>
/* @import "@/assets/style/main.scss"; */
</style>
