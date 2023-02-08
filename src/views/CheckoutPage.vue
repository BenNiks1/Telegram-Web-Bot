<template>
  <section class="checkout">
    <UiBreadcrumps :items="breadcrumbs" />

    <div class="checkout__inner">
      <div class="wrapper">
        <h1 class="checkout__title">Ваша запись в Сервис FreshAuto!</h1>
        <dl class="check">
          <div class="check-wrapper">
            <dt>Дата и время</dt>
            <dd class="check-data">12.12.2023 17:00</dd>
          </div>

          <div class="check-wrapper">
            <dt>Услуга</dt>
            <dd class="check-data">Замена масла</dd>
          </div>

          <div class="check-wrapper">
            <dt>ФИО</dt>
            <dd class="check-data">Иванова Анастасия</dd>
          </div>

          <div class="check-wrapper">
            <dt>Телефон</dt>
            <dd class="check-data">+7 (999) 888 77 66</dd>
          </div>
        </dl>
      </div>

      <div class="checkout__submit">
        <UiButton type="primary" @click="nextPage">Подтвердить</UiButton>
        <p class="checkout__submit-description">
          Нажимая на кнопку "Подтвердить" вы даете согалсие на обработку
          персональных данных
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import UiBreadcrumps from "@/components/UiBreadcrumps.vue";
import UiButton from "@/components/UiButton.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const breadcrumbs = ref([
  { link: "/", name: "Главная" },
  { link: "/calendar", name: "Выбор даты" },
  { link: "/create", name: "Заказ" },
  { link: "/checkout", name: "Чек" },
]);

const nextPage = () => {
  router.push("/success");
};
</script>

<style lang="scss" scoped>
.checkout {
  height: 100%;

  &__inner {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    max-height: 550px;
    height: 100%;
  }

  &__title {
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    margin: 15px 0;
    text-align: center;
  }

  & .check {
    display: flex;
    flex-direction: column;
    position: relative;
    grid-gap: 15px;
    width: 100%;
    margin-bottom: 20px;
    background-color: $white;
    border-radius: 10px;
    z-index: 10;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
    padding: 20px;

    &-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      grid-gap: 10px;
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      letter-spacing: -0.01em;
      color: $gray-dark;
    }

    &-data {
      font-size: 15px;
      line-height: 20px;
      letter-spacing: -0.01em;
      color: $base-color;

      &.total-price,
      &.total-price--green,
      &.total-price--gray {
        font-size: 24px;
        line-height: 32px;
        font-weight: 700;
        white-space: nowrap;
      }
    }
  }

  &__submit {
    margin-top: auto;
    &-description {
      font-size: 12px;
      color: #a0a0a0;
      text-align: center;
    }
  }
}
</style>
