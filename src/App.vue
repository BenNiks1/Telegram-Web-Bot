<template>
  <Calendar />

  <DatePicker v-model="date" />
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";
import { getPosts } from "@/api/getPosts";

export default {
  components: {
    Calendar,
    DatePicker,
  },
  data() {
    return {
      date: new Date(),
    };
  },
  async mounted() {
    console.log("env", process.env.VUE_APP_BASE_URL);
    try {
      const res = await getPosts();
      console.log("response", res);
    } catch (err) {
      console.log("error", err);
    }
  },
};
</script>

<style></style>
