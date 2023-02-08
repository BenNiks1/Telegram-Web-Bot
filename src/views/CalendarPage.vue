<template>
  <section class="calendar">
    <UiBreadcrumps :items="breadcrumbs" />
    <div class="calendar__inner">
      <DatePicker
        v-model="date"
        mode="date"
        is-expanded
        title-position="right"
        locale="ru"
      />

      <UiButton
        type="primary"
        class="calendar__button"
        :disabled="!date"
        @click="nextStep"
      >
        Выбрать эту дату
      </UiButton>
    </div>
  </section>
</template>

<script setup>
import UiBreadcrumps from "@/components/UiBreadcrumps.vue";
import UiButton from "@/components/UiButton.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const date = ref(null);
const breadcrumbs = ref([
  { link: "/", name: "Главная" },
  { link: "/calendar", name: "Выбор даты" },
]);

watch(date, (value) => {
  console.log("date", value);
});

const nextStep = () => {
  store.commit("SET_DATE", date);

  router.push({
    name: "create",
  });
};
</script>
<style lang="scss" scoped>
.calendar {
  height: 100%;

  &__inner {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
  }

  &__button {
    height: 42px;
    margin-bottom: 25px;
    align-self: end;
  }
}
</style>