<template>
  <section class="order">
    <UiBreadcrumps :items="breadcrumbs" />

    <form class="form" @submit.prevent="submit">
      <div class="form__section">
        <h2 class="form__title">Выберите услугу</h2>
        <div class="form__radio-buttons">
          <div
            v-for="(button, key) in radioButtons"
            :key="'radio-btn-group' + key"
            class="form__radio-buttons-inner"
          >
            <input
              :id="button.value"
              type="radio"
              :name="button.value"
              :value="button.value"
              v-model="checked"
            />
            <label :for="button.value"> {{ button.name }} </label>
          </div>
        </div>
      </div>

      <div class="form__section">
        <h2 class="form__title">Заполните данные</h2>
        <div class="form__user-data">
          <UiInput
            id="name"
            v-model="name"
            placeholder="Иванова Анастасия"
            label="Фамилия и Имя"
            type="text"
            name="name"
          />

          <UiInput
            id="phone"
            v-model="phone"
            placeholder="+7 (999) 888 77 66"
            label="Телефон"
            type="text"
            name="phone"
          />
        </div>
      </div>

      <div class="form__submit">
        <UiButton type="primary">Подтвердить</UiButton>
        <p class="form__submit-description">
          Нажимая на кнопку "Подтвердить" вы даете согалсие на обработку
          персональных данных
        </p>
      </div>
    </form>
  </section>
</template>

<script setup>
import UiBreadcrumps from "@/components/UiBreadcrumps.vue";
import UiButton from "@/components/UiButton.vue";
import UiInput from "@/components/UiInput.vue";
import { ref, watch, computed } from "vue";
// import { useStore } from "vuex";

// const store = useStore();
const checked = ref("");
const phone = ref(null);
const name = ref("");
const breadcrumbs = ref([
  { link: "/", name: "Главная" },
  { link: "/calendar", name: "Выбор даты" },
  { link: "/create", name: "Заказ" },
]);
const radioButtons = ref([
  { value: "elevator", name: "Подъемник" },
  { value: "washing", name: "Мойка" },
  { value: "oil", name: "Замена масла" },
]);

watch(checked, (value) => {
  console.log("asdasdasd", value);
});

const formData = computed(() => {
  const formData = new FormData();
  formData.append("name", this.name);
  formData.append("phone_number", this.tel);
  return formData;
});

const submit = () => {
  console.log("formData", formData);
};
</script>

<style lang="scss">
.order {
  & .form {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    // gap: 20px;
    // height: 100%;

    &__title {
      font-size: 16px;
      line-height: 24px;
      font-weight: bold;
    }

    &__section {
      display: flex;
      flex-direction: column;
      gap: 15px;
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

        input[type="radio"] {
          display: none;
        }

        input[type="radio"]:checked + label {
          background: $green;
          color: $white;
          border-color: $green2;
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
}
</style>