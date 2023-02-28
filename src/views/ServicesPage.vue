<template>
  <section class="services">
    <UiBreadcrumps :items="breadcrumbs" />
    <div class="services__inner">
      <h1 class="services__title">Выберите услугу:</h1>

      <ul class="type-list" v-if="!showServices">
        <li class="type-list__item" @click="showServices = true">
          Обслуживание и ремонт автомобиля
        </li>
        <li class="type-list__item">Кузовные работы и покраска</li>
        <li class="type-list__item">Диагностика авто перед покупкой</li>
      </ul>

      <UiAccordion v-if="showServices">
        <AccordionItem
          v-for="([type, services], index) in Object.entries(services)"
          :key="index"
          class="services-accordion"
        >
          <template #accordion-trigger>
            <h3 class="services-accordion__title">
              {{ type }} <span>{{ numWord(services.length, numWords) }}</span>
            </h3>
          </template>
          <template #accordion-content>
            <div
              v-for="service in services"
              :key="service.id"
              @click="nextPage"
              class="services-accordion__content"
            >
              <b> {{ service.name }}</b>
              <p><b>Цена:</b> {{ formatNums(service.price) || "9999" }}</p>
            </div>
          </template>
        </AccordionItem>
      </UiAccordion>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { getServicesList } from "@/api";
import UiBreadcrumps from "@/components/UiBreadcrumps.vue";
import UiAccordion from "@/components/UiAccordion/UiAccordion.vue";
import AccordionItem from "@/components/UiAccordion/AccordionItem.vue";
import { routes, numWord, formatNums } from "@/helpers";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const services = ref({});
const showServices = ref(false);
const numWords = ref(["услуга", "услуги", "услуг"]);
const breadcrumbs = ref([routes.main, routes.dc, routes.services]);

const router = useRouter();
const store = useStore();

onMounted(async () => {
  try {
    // const { data: res } = await getServicesList();

    const arr = {
      data: [
        {
          external_id: "cd68f60b-3020-49f8-9b38-510fb932499b",
          id: 1,
          name: "Замена масла ДВС",
          price: 1000,
          type: "ТО",
        },
      ],
    };

    sortServices(arr.data, "type");
  } catch (err) {
    console.error(err);
  }
});

// Вынести отдельно
const sortServices = (list, sortBy) => {
  list.forEach((item) => {
    if (services.value?.[item[sortBy]]?.length) {
      services.value[item[sortBy]] = [...services.value[item[sortBy]], item];
    } else services.value[item[sortBy]] = [item];
  });
};

const nextPage = () => {
  store.commit("SET_USER_SERVICE", "Замена масла ДВС");
  router.push(routes.calendar.path);
};
</script>
<style lang="scss" scoped>
.services {
  height: 100%;

  &__title {
    margin: 10px 0 20px;
    font-size: 22px;
    line-height: 30px;
    font-weight: 500;
  }

  .type-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 1;

    &__item {
      box-sizing: border-box;
      text-align: center;
      width: 100%;
      padding: 20px;
      background-color: $white;
      box-shadow: 0 0 10px 4px $shadow-color;
      border-radius: 10px;
      border: 1px solid #ebebeb;
      transition: 0.3s;

      &:active {
        background-color: $green;
        border-color: $green;
        color: $white;
        transition: all $transition-duration;
      }
    }
  }
  &-accordion {
    &__content {
      display: block;
      margin-left: 20px;
      padding: 0 0 10px 20px;
      border-bottom: 1px solid $color-border;
    }

    &__title {
      font-size: 20px;
      font-weight: bold;

      span {
        font-size: 16px;
        font-weight: normal;
        color: $color-text-secondary-contrast;
      }
    }
  }
}
</style>
