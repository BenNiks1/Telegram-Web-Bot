<template>
  <li class="accordion__item">
    <div
      class="accordion__trigger"
      :class="{ accordion__trigger_active: visible }"
      @click="open"
    >
      <slot name="accordion-trigger"></slot>
    </div>

    <Transition name="accordion" @enter="setHeight" @after-leave="setHeight">
      <div class="accordion__content" v-show="visible">
        <ul class="accordion__content-list">
          <slot name="accordion-content"></slot>
        </ul>
      </div>
    </Transition>
  </li>
</template>

<script setup>
import { ref, inject, computed, onMounted } from "vue";

const count = inject("count");
const active = inject("active");

const index = ref(null);

const visible = computed(() => index.value === active.value);

const open = () => {
  if (visible.value) active.value = null;
  else active.value = index.value;
};

const setHeight = (el) => {
  el.style.height = el.scrollHeight + "px";
};

onMounted(() => {
  index.value = count.value++;
});
</script>

<style lang="scss" scoped>
.accordion {
  &__item {
    position: relative;
    cursor: pointer;
  }

  &__trigger {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 10px;
    border-bottom: 1px solid $color-border;
  }

  &__content {
    &-list {
      padding: 20px;
      list-style: none;
    }
  }

  &-enter-active,
  &-leave-active {
    will-change: height, opacity;
    transition: height 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
  }

  &-enter,
  &-leave-to {
    height: 0 !important;
    opacity: 0;
  }
}
</style>
