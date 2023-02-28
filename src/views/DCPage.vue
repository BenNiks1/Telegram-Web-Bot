<template>
  <section class="dc">
    <UiBreadcrumps :items="breadcrumbs" />
    <div class="dc__inner">
      <h1 class="dc__title">Выберите сервисный центр:</h1>

      <UiAccordion>
        <AccordionItem
          v-for="([city, services], index) in Object.entries(services)"
          :key="index"
        >
          <template #accordion-trigger>
            <h3 class="dc-accordion__title">
              {{ city }}: <span>{{ numWord(services.length, numWords) }}</span>
            </h3>
          </template>
          <template #accordion-content>
            <RouterLink
              v-for="service in services"
              :key="service.id"
              :to="routes.services.path"
              class="dc-accordion__content"
            >
              <b>{{ service.city }} - {{ service.name }}</b>
              <p>Цена: {{ service.address || "-" }}</p>
              <p>
                Часы работы с {{ service.work_time_start }} до
                {{ service.work_time_end }}
              </p>
            </RouterLink>
          </template>
        </AccordionItem>
      </UiAccordion>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDCList } from "@/api";
import UiBreadcrumps from "@/components/UiBreadcrumps.vue";
import UiAccordion from "@/components/UiAccordion/UiAccordion.vue";
import AccordionItem from "@/components/UiAccordion/AccordionItem.vue";
import { routes, numWord } from "@/helpers";
import { RouterLink } from "vue-router";

const numWords = ref(["филиал", "филиала", "филиалов"]);
const services = ref({});
const breadcrumbs = ref([routes.main, routes.dc]);

onMounted(async () => {
  try {
    const { data: res } = await getDCList();

    sortServices(res.data, "city");
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
</script>
<style lang="scss" scoped>
.dc {
  height: 100%;

  &__title {
    margin: 10px 0;
    font-size: 22px;
    line-height: 30px;
    font-weight: 500;
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
