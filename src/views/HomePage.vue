<template>
  <div>
    <h1>Добро пожаловать в Сервис FreshAuto</h1>
    <p>
      Сервис FreshAuto это современное оборудование для диагностики авто, и
      специалисты со стажем от 3х лет в авто-слесарных науках.
    </p>
    <RouterLink to="/calendar">Выбрать дату!</RouterLink>
    <p>Выберите свободную дату, и укажите какую услугу вы хотите получить.</p>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
<style lang="scss"></style>
