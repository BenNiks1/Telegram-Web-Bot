import { createStore } from "vuex";
import pocketbase from "@/helpers/pocketbase";

export default createStore({
  state: {
    date: "",
    service: "",
    busyDates: [],
  },
  mutations: {
    SET_DATE(state, date) {
      state.date = date;
    },
    STORE_DATES(state, dates) {
      state.busyDates = dates;
    }
  },
  getters:{
    getBusyDates(state) {
      return state.busyDates;
    }
  },
  actions: {
    async fetchDates({ commit }) {
      const busyDates = await pocketbase.getBusyDates();
      commit('STORE_DATES', busyDates);
    },
  }
});
