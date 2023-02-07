import { createApp } from "vue";
import App from "./App.vue";
import { SetupCalendar } from "v-calendar";

import "v-calendar/dist/style.css";

const app = createApp(App);

app.use(SetupCalendar, {});

app.mount("#app");
