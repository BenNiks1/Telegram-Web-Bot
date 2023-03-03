<template>
  <ul class="accordion">
    <slot></slot>
  </ul>
</template>

<script setup>
import { ref, provide } from 'vue';

const count = ref(0);
const active = ref(null);

provide('count', count);
provide('active', active);
</script>

<style lang="scss" scoped>
.accordion {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
