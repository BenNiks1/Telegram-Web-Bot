<template>
  <div>
    <nav>
      <RouterLink to="/">Главная</RouterLink>
    </nav>

    <DatePicker v-model="date" mode="date" />
    <button @click="nextStep">Выбрать эту дату</button>
    <!-- <br />
    <RouterLink :to="{ name: 'create', query: { date } }">
      
    </RouterLink> -->
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const date = ref(null);

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
<style lang="scss"></style>
