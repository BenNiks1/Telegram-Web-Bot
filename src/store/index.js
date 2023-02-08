import { createStore } from "vuex";

export default createStore({
  state: {
    date: "",
    service: "",
  },
  mutations: {
    SET_DATE(state, date) {
      state.date = date;
    },
  },
});
