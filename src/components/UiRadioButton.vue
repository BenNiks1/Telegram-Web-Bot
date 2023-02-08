<!-- <template>
  <div
    v-for="(button, key) in buttons"
    :key="'radio-btn-group' + key"
    class="radio-btn-group"
  >
    <div class="radio">
      <input
        :id="button.value"
        v-bind="$attrs"
        type="radio"
        :name="button.value"
        :value="button.value"
        @input="inputChange"
      />
      <label :for="button.value"> {{ button.name }} </label>
    </div>
  </div>
</template> -->

<template>
  <label class="wrapper flex items-center">
    {{ label }}
    <input
      class="checkbox"
      type="radio"
      :checked="isChecked"
      :value="value"
      @change="$emit('change', $event.target.value)"
    />
    <span class="checkmark"></span>
  </label>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  label: { type: String, default: "", required: true },
  modelValue: { default: "" },
  value: { type: String, default: undefined },
});

const isChecked = computed(() => props.modelValue == props.value);
</script>

<style lang="scss" scoped>
.radio-btn-group {
  display: flex;

  .radio {
    margin: 0 0.25rem;

    label {
      background: #fff;
      border: 1px solid #ddd;
      padding: 0.5rem 1.25rem;
      border-radius: 5px;
      cursor: pointer;
      color: #444;
      transition: box-shadow 400ms ease;

      &:hover {
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
          0 2px 10px 0 rgba(0, 0, 0, 0.12);
      }
    }

    input[type="radio"] {
      display: none;
    }

    input[type="radio"]:checked + label {
      background: #2196f3;
      color: #fff;
      border-color: #2196f3;
    }
  }
}
</style>
