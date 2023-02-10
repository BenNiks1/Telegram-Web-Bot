<template>
  <section class="success">
    <div class="success__inner">
      <InlineSvg
        class="success-icon"
        :src="require('@/assets/static/svg/diagnostics.svg')"
      />
      <h1 class="success__title">Поздравляем!</h1>
      <p class="success__description">Вы записались в Сервис FreshAuto!</p>
    </div>
    <UiButton class="success__button" type="primary" @click="onClose">
      Вернуться в Telegram
    </UiButton>
  </section>
</template>
<script setup>
import UiButton from "@/components/UiButton.vue";
import InlineSvg from "vue-inline-svg";

const ts = window.Telegram.WebApp;

const onClose = () => {
  ts.close();
};
</script>
<style lang="scss" scoped>
.success {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  height: 100%;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__title {
    font-size: 24px;
    line-height: 30px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  &__description {
    text-align: center;
    color: #2b2b2b;
  }

  &__button {
    height: 42px;
    margin-bottom: 25px;
    align-self: end;
  }
}
</style>
