import { createStore } from 'vuex';

export default createStore({
  state: {
    date: new Date(),
    serviceCenter: {},
    services: [],
    dc: {},
    master: {},
    name: '',
    phone: '',
    hasApplied: false, // Чтобы потом перейти на страницу успеха
  },
  mutations: {
    SET_DATE(state, date) {
      state.date = date;
    },
    STORE_DATES(state, dates) {
      state.busyDates = dates;
    },
    CHANGE_APPLICATION_STATE(state, data) {
      state.hasApplied = data;
    },
    STORE_SERVICES(state, services) {
      state.services = services;
    },
    SET_DC(state, dc) {
      state.dc = dc;
    },
    SET_MASTER(state, master) {
      state.master = master;
    },
    SET_SERVICE_CENTER(state, serviceCenter) {
      state.serviceCenter = serviceCenter;
    },
    SET_USER_NAME(state, name) {
      state.name = name;
    },
    SET_USER_PHONE(state, phone) {
      state.phone = phone;
    },
  },
  getters: {
    getBusyDates(state) {
      return state.busyDates;
    },
    getUserDate(state) {
      return state.date;
    },
    getServices(state) {
      return state.services;
    },
    getDC(state) {
      return state.dc;
    },
    getMaster(state) {
      return state.master;
    },
    getServiceCenter(state) {
      return state.serviceCenter;
    },
    getUserData(state) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Europe/Moscow',
      };
      const date = new Intl.DateTimeFormat('en-US', options).format(state.date);
      return {
        name: state.name,
        phone: state.phone,
        service: state.service.name,
        date,
      };
    },
    getUserDataForServer(state) {
      return {
        name: state.name,
        tel: state.phone,
        service: state.service.id,
        date: state.date,
      };
    },
    getApplicationState(state) {
      return state.hasApplied;
    },
  },
  actions: {
    // async fetchDates({ commit }) {
    //   const busyDates = await pocketbase.getBusyDates();
    //   commit('STORE_DATES', busyDates);
    // },
    // async applyUser({ commit }, userData) {
    //   // TODO: Убрать когда подтянем данные из Телеги
    //   if (!userData?.chatId) userData.chatId = 111111;
    //   try {
    //     await pocketbase.createRecord(userData);
    //     commit('CHANGE_APPLICATION_STATE', true);
    //   } catch (error) {
    //     commit('CHANGE_APPLICATION_STATE', false);
    //   }
    // },
    // async fetchServices({ commit }) {
    //   const services = await pocketbase.getServices();
    //   commit('STORE_SERVICES', services);
    // },
  },
});
