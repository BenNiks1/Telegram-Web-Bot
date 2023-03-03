<template>
  <section class="order">
    <UiBreadcrumps :items="breadcrumbs" />

    <form class="form" @submit.prevent="submit">
      <div class="form__section">
        <h2 class="title">{{ title }}</h2>
        <div v-if="!isSubmit" class="form__user-data">
          <UiInput
            id="name"
            v-model="name.value"
            placeholder="Иванова Анастасия"
            :label="name.label"
            type="text"
            name="name"
            required
          />

          <UiInput
            id="phone"
            v-model="phone.value"
            placeholder="+7 (999) 888 77 66"
            :label="phone.label"
            type="text"
            name="phone"
            required
          />

          <UiInput
            id="mark"
            v-model="optionalData.mark.value"
            placeholder="Renault"
            :label="optionalData.mark.label"
            type="text"
            name="mark"
          />
          <UiInput
            id="model"
            v-model="optionalData.model.value"
            placeholder="Logan"
            :label="optionalData.model.label"
            type="text"
            name="model"
          />
          <UiInput
            id="carYear"
            v-model="optionalData.carYear.value"
            placeholder="2020"
            :label="optionalData.carYear.label"
            type="number"
            name="carYear"
          />
          <UiInput
            id="carNumber"
            v-model="optionalData.carNumber.value"
            placeholder="A123АA456"
            :label="optionalData.carNumber.label"
            type="text"
            name="carNumber"
          />
          <UiInput
            id="carMileage"
            v-model="optionalData.carMileage.value"
            placeholder="120000"
            :label="optionalData.carMileage.label"
            type="number"
            name="carMileage"
          />
          <UiInput
            id="comment"
            v-model="optionalData.comment.value"
            placeholder="Комментарий"
            :label="optionalData.comment.label"
            type="text"
            name="comment"
          />
        </div>

        <CheckoutCard v-else :checkout-data="checkoutData" />
      </div>

      <div v-if="!isSubmit" class="form__check">
        <UiButton
          style-type="primary"
          type="button"
          :disabled="isDisabled"
          @click="onCheck"
        >
          Продолжить
        </UiButton>
      </div>

      <div v-else class="form__submit">
        <UiButton style-type="secondary" type="button" @click="isSubmit = false">
          Назад
        </UiButton>
        <UiButton style-type="primary" type="submit">Подтвердить</UiButton>

        <p class="form__submit-description">
          Нажимая на кнопку "Подтвердить" вы даете согалсие на обработку персональных
          данных
        </p>
      </div>
    </form>
  </section>
</template>

<script setup>
import { UiBreadcrumps, UiButton, UiInput, CheckoutCard } from '@/components';
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { routes } from '@/helpers';
// import { postOrder } from '@/api';

const router = useRouter();
const route = useRoute();

const isSubmit = ref(false);

const phone = ref({ label: 'Телефон', value: null, isError: false });
const name = ref({ label: 'Фамилия и Имя', value: null, isError: false });
const optionalData = ref({
  mark: { label: 'Марка авто', value: null },
  model: { label: 'Модель авто', value: null },
  carYear: { label: 'Год выпуска', value: null },
  carNumber: { label: 'Госномер авто', value: null },
  carMileage: { label: 'Пробег, км', value: null },
  comment: { label: 'Комментарий', value: null },
});

const checkoutData = ref([]);
const breadcrumbs = ref([
  routes.main,
  routes.dc,
  routes.services,
  routes.calendar,
  routes.slots,
  routes.order,
]);

const title = computed(() => (isSubmit.value ? 'Чек' : 'Заполните данные'));
const isDisabled = computed(() => {
  // TODO: Кнопка не раздисейблится пока фокус не уйдёт с последнего инпута
  // Нельзя нажать на кнопку сразу после заполнения данных
  return !phone.value.value || !name.value.value;
});

const onCheck = () => {
  checkoutData.value = [phone.value, name.value, ...isEmpty(optionalData.value)];

  isSubmit.value = true;
};

const submit = async () => {
  const { mark, model, carYear, carNumber, carMileage, comment } = optionalData.value;
  const data = {
    client_name: name.value.value,
    client_phone: phone.value.value,
    car_mark: mark.value,
    car_model: model.value,
    car_year: carYear.value,
    car_number: carNumber.value,
    car_mileage: carMileage.value,
    comment: comment.value,
    services: [...route.query.services],
    ...route.query,
  };

  try {
    // await postOrder(data);
    console.log(data);
    router.push(routes.success.path);
  } catch (error) {
    console.error(error);
  }
};

const isEmpty = (data) => {
  return Object.entries(data)
    .map(([, value]) => value.value?.length && value)
    .filter((x) => x);
};
</script>

<style lang="scss">
.order {
  overflow-y: scroll;

  & .form {
    display: grid;
    grid-template-rows: 1fr minmax(100px, max-content);
    height: 100%;

    &__title {
      font-size: 16px;
      line-height: 24px;
      font-weight: bold;
    }

    &__section {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 20px;
    }

    &__user-data {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__radio-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
      position: relative;
      width: 100%;
      z-index: 10;

      &-inner {
        label {
          display: block;
          width: 100%;
          background-color: $white;
          border: 1px solid $color-border;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 2px 5px 0 rgb(151 165 193 / 20%),
            0 2px 10px 0 rgb(151 165 193 / 20%);
        }

        input[type='radio'] {
          display: none;
        }

        input[type='radio']:checked + label {
          background: $green;
          color: $white;
          border-color: $green2;
        }
      }
    }
    &__submit {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 30px;
    }

    &__check,
    &__submit {
      height: 100%;

      &-description {
        font-size: 12px;
        color: #a0a0a0;
        text-align: center;
      }
    }
  }
}
</style>
