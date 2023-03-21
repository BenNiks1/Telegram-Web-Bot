import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Calendar, DatePicker } from 'v-calendar';
import SetupCalendar from 'v-calendar';
import { createHead } from '@vueuse/head';

import notification from './plugins/notification';

import 'v-calendar/dist/style.css';
const head = createHead();
const app = createApp(App);

app.use(router);
app.use(store);
app.use(head);
app.use(notification);
app.use(SetupCalendar, {});


app.component('VCalendar', Calendar);
app.component('DatePicker', DatePicker);

app.mount('#app');
