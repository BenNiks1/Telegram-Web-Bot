import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import { Calendar, DatePicker } from 'v-calendar';
import SetupCalendar from 'v-calendar';

import 'v-calendar/dist/style.css';

const app = createApp(App);
app.use(router);
app.use(store);

app.use(SetupCalendar, {});
app.component('VCalendar', Calendar);
app.component('DatePicker', DatePicker);

app.mount('#app');
