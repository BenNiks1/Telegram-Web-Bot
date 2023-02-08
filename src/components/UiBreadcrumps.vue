<template>
  <nav class="breadcrumbs">
    <div
      v-for="(item, key) in items"
      :key="'beadcrumb-item-' + key"
      class="breadcrumbs__item"
    >
      <RouterLink v-if="item.link" :to="item.link" class="breadcrumbs__link">
        {{ item.name }}
      </RouterLink>
      <span v-else class="breadcrumbs__link breadcrumbs__link_default">
        {{ item.name }}
      </span>
    </div>
  </nav>
</template>

<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  &__item {
    position: relative;
    flex-shrink: 0;
    padding-right: 24px;

    &::after {
      top: 50%;
      right: 10px;
      position: absolute;
      display: block;
      width: 8px;
      height: 8px;
      border: solid rgba($base-color, 0.3);
      border-width: 1px 1px 0 0;
      transform: translateY(-50%) rotate(45deg);
    }

    &:not(:last-child) {
      &::after {
        content: "";
      }
    }
  }

  &__link {
    color: rgba($base-color, 0.3);
    transition: color $transition-duration;

    &:hover:not(&_default) {
      color: rgba($base-color, 1);
    }

    &_default {
      cursor: default;
    }
  }
}
</style>
