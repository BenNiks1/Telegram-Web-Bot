import { createStore } from 'vuex';

export default createStore({
	state: {
		// common data
		date: new Date(),
		serviceList: [],
		master: {},
		dc: {},

		// notification
		message: '',
		type: '',
		duration: 3000,
	},
	getters: {
		getUserDate(state) {
			return state.date;
		},
		getServiceList(state) {
			return state.serviceList;
		},
		getDC(state) {
			return state.dc;
		},
		getMaster(state) {
			return state.master;
		},
	},
	mutations: {
		SET_DATE(state, date) {
			state.date = date;
		},
		SET_SERVICE_LIST(state, serviceList) {
			state.serviceList = serviceList;
		},
		SET_DC(state, dc) {
			state.dc = dc;
		},
		SET_MASTER(state, master) {
			state.master = master;
		},

		SET_NOTIFICATION(state, { message, type, duration }) {
			if (!message && type === 'error') {
				state.message = 'Что-то пошло не так. Попробуйте позже.';
				state.type = type;
				state.duration = duration || 3000;
			} else if (!message && type === 'success') {
				state.message = 'Данные успешно обновлены!';
				state.type = type;
				state.duration = duration || 3000;
			} else {
				state.message = message;
				state.type = type;
				state.duration = duration || 3000;
			}
		},
	},
	actions: {},
	modules: {},
});
