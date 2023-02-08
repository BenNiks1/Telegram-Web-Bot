<template>
  <section class="introduction">
    <div class="introduction__header">
      <h1 class="introduction__title">
        Добро пожаловать в
        <span class="introduction__title-additional">Сервис FreshAuto</span>
      </h1>
      <p class="introduction__description">
        Сервис FreshAuto это современное оборудование для диагностики авто, и
        специалисты со стажем от 3х лет в авто-слесарных науках.
      </p>
    </div>

    <div class="introduction__button">
      <UiButton type="primary" @click="nextPage">Выбрать дату!</UiButton>
      <p class="introduction__button-description">
        Выберите свободную дату, и укажите какую услугу вы хотите получить.
      </p>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import UiButton from "@/components/UiButton.vue";
const router = useRouter();

const nextPage = () => {
  router.push("/calendar");
};
</script>
<style lang="scss" scoped>
.introduction {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__title {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 24px;
    line-height: 30px;
    font-weight: 500;

    &-additional {
      font-weight: bold;
    }
  }

  &__description {
    text-align: center;
    color: #2b2b2b;
  }

  &__button {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    &-description {
      font-size: 12px;
      color: $gray-dark2;
      text-align: center;
    }
  }
}
</style>
