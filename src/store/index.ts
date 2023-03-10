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
	},
	getters: {
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
	},
	mutations: {
		SET_DATE(state, date) {
			state.date = date;
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
	actions: {},
	modules: {},
});
