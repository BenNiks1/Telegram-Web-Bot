<template>
  <component
    :is="componentTag"
    v-bind="$attrs"
    :disabled="disabled || loading"
    :class="['button', classes]"
  >
    <div v-if="counter" class="button__counter">
      {{ counter }}
    </div>
    <span class="button__text">
      <slot />
    </span>
    <span class="button__icon">
      <slot name="icon" />
    </span>
    <!-- Слот для вложенных меню и других элементов, которые не относятся к тексту кнопки -->
    <slot name="miscContent" />
  </component>
</template>

<script>
// import UiLoading from "~/components/ui/UiLoading.vue";

export default {
  name: "UiButton",

  components: {
    // UiLoading,
  },

  props: {
    size: {
      type: String,
      default: "md",
      validator: (value) => {
        // Значение должно соответствовать одной из этих строк
        return ["xs", "sm", "md", "lg"].includes(value);
      },
    },

    type: {
      type: String,
      default: "base",
      validator: (value) => {
        // Значение должно соответствовать одной из этих строк
        return [
          "base",
          "primary",
          "secondary",
          "secondary-grey",
          "black",
          "white",
          "gray",
          "gray-bg",
          "icon-sided-text",
        ].includes(value);
      },
    },

    plain: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },

    iconLeft: {
      type: Boolean,
      default: false,
    },

    counter: {
      type: Number,
      default: 0,
    },

    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: null,
    },
  },

  computed: {
    classes() {
      const classes = {
        button_plain: this.plain,
        button_icon: this.icon,
        button_shadow: this.shadow,

        "button_icon-left": this.iconLeft,

        "button_full-width": this.fullWidth,

        "is-readonly": this.readonly || this.loading,
        "is-disabled": this.disabled,
      };
      return [
        classes,
        `button_${this.size}`,
        this.type ? `button_${this.type}` : "",
      ];
    },

    /**
     * Тег для компонента
     * @type {string}
     */
    componentTag() {
      const hasTo = "to" in this.$attrs;
      const hasHref = "href" in this.$attrs;

      return this.tag
        ? this.tag
        : hasTo
        ? "nuxt-link"
        : hasHref
        ? "a"
        : "button";
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  background-color: transparent;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: $font-size-base;
  line-height: $font-lh-base;
  white-space: nowrap;
  text-decoration: none;
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
  border: 1px solid $color-border;
  color: $base-color;
  box-sizing: border-box;
  transition: all $transition-duration;

  &:hover:not(:disabled),
  &:active:not(:disabled) {
    border-color: $green;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &__counter,
  &__text,
  &__icon {
    position: relative;
  }

  &__counter {
    background-color: $green;
    color: $white;
    padding: 0 5px;
    margin-right: 5px;
    height: 15px;
    min-width: 15px;
    font-size: 10px;
    line-height: 9px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
  }

  &__icon {
    line-height: 0;
    margin-left: 10px;

    &:empty {
      display: none;
    }
  }

  &_primary {
    background-color: $green;
    border-color: $green;
    color: $white;
    transition: all $transition-duration;

    &.nuxt-link-exact-active,
    &.nuxt-link-active {
      color: $white;
    }

    &:active:not(:disabled),
    &:hover:not(:disabled) {
      background-color: #4ec88e;
      border-color: #4ec88e;
    }
  }

  &_secondary {
    background-color: transparent;
    border-color: $green;
    color: $green;

    &.nuxt-link-exact-active,
    &.nuxt-link-active {
      color: $green;
    }

    &:hover:not(:disabled) {
      background-color: transparent;
      border-color: #4ec88e;
      color: #4ec88e;
    }

    &:disabled {
      border-color: $color-border;
      color: $base-color;
    }
  }

  &_secondary-grey {
    background-color: transparent;
    border-color: $gray-dark-deep;
    color: $base-color;

    &:hover:not(:disabled) {
      background-color: transparent;
      border-color: $base-color;
      color: $base-color;
    }

    &:disabled {
      border-color: $color-border;
      color: $base-color;
    }
  }

  &_plain {
    padding: 0;
    background-color: transparent;
    border: 0;
  }

  &_black {
    color: $base-color;

    &:hover:not(:disabled) {
      background-color: transparent;
      border-color: $green;
      color: $green;
    }
  }

  &_gray {
    background-color: $gray;
    border-color: transparent;
    color: $color-text-secondary;

    &:hover:not(:disabled) {
      border-color: transparent;
      background-color: #f1f1f1;
      color: $green;
    }
  }

  &_gray-bg {
    background-color: transparent;
    border-color: $color-text-secondary;
    color: $color-text-secondary;

    &:hover:not(:disabled) {
      background-color: transparent;
      border-color: $green;
      color: $green;
    }
  }

  &_white {
    border-color: transparent;
    background-color: $white;
    color: $base-color;

    &:hover:not(:disabled) {
      border-color: transparent;
      background-color: $gray;
      color: $base-color;
    }
  }

  &_shadow {
    box-shadow: 0 4px 20px rgba(15, 16, 17, 0.1);
  }

  &_icon-left {
    flex-direction: row-reverse;
  }

  &_icon-left & {
    &__icon {
      margin: 0 5px 0 0;
    }
  }

  &_icon.button_icon-sided-text {
    width: 100%;
  }

  &_icon-sided-text {
    border: none;
    display: flex;
    justify-content: flex-start;
    column-gap: 15px;
  }

  &_icon-sided-text & {
    &__text {
      order: 2;
    }

    &__icon {
      border: 1px solid $color-border;
      border-radius: 50%;
      order: 1;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all $transition-duration;
    }
  }

  &_icon-sided-text:hover & {
    &__icon {
      border-color: $green;
    }
  }

  &_sm.button_icon-sided-text & {
    &__icon {
      width: 25px;
      height: 25px;

      * {
        max-width: 15px;
      }
    }
  }

  &_md.button_icon-sided-text & {
    &__icon {
      width: 35px;
      height: 35px;
    }
  }

  &_icon.button_lg.button_icon-sided-text {
    width: 100%;
  }

  &_lg.button_icon-sided-text & {
    &__icon {
      width: 45px;
      height: 45px;
    }
  }

  &_lg {
    padding: 14px 24px;
    border-radius: 16px;
  }

  &_lg & {
    &__icon {
      margin: 0 0 0 8px;
    }
  }

  &_lg.button_icon-left & {
    &__icon {
      margin: 0 8px 0 0;
    }
  }

  &_sm {
    padding: 5px 10px;
  }

  &_icon {
    padding: 0;
    width: 35px;
    height: 35px;
    border-radius: 50%;

    &.button_lg {
      width: 50px;
      height: 50px;
    }

    &.button_xs {
      width: 25px;
      height: 25px;
    }

    &.button_outlined {
      color: $color-text-secondary;
    }

    &.nuxt-link-exact-active,
    &.nuxt-link-active {
      color: $color-text-secondary;
    }
  }

  &_icon & {
    &__icon {
      display: flex;
      justify-content: center;
      align-content: center;
      margin: 0;
    }
  }

  &_full-width {
    width: 100%;
  }
}
</style>
