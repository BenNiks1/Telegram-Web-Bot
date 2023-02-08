<template>
  <header class="header">
    <div class="header__circle-left" />
    <div class="header__circle-right" />

    <div />
    <RouterLink to="/"
      ><InlineSvg
        class="header__logo"
        :src="require('@/assets/static/svg/logo.svg')"
    /></RouterLink>

    <address class="header__contact">
      <a href="/">
        <InlineSvg
          class="header__contact-icon"
          :src="require('@/assets/static/svg/location.svg')"
        />
      </a>

      <a href="/">
        <InlineSvg
          class="header__contact-icon"
          :src="require('@/assets/static/svg/phone.svg')"
        />
      </a>
    </address>
  </header>
</template>

<script setup>
import InlineSvg from "vue-inline-svg";
import { RouterLink } from "vue-router";
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 15px;
  background-color: $white;

  &__circle {
    &-left,
    &-right {
      position: absolute;
      width: 202px;
      height: 202px;
      background: linear-gradient(
        139.25deg,
        rgba(176, 255, 217, 0.1) 16.68%,
        rgba(35, 210, 127, 0.1) 52.26%
      );
      border-radius: 50%;
    }

    &-left {
      left: -65px;
      top: 185px;
    }

    &-right {
      right: -85px;
      top: -40px;
    }
  }

  &__logo {
    margin-left: 52px;
  }

  &__contact {
    display: flex;
    align-items: center;
    gap: 10px;

    &-icon {
      display: block;
    }
  }

  // &__logo {

  // }
}
</style>
