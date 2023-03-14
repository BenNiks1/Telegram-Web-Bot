import { App } from 'vue';

interface NotificationData {
	type: NotificationType;
	message?: string;
	duration?: number;
}

type NotificationType = 'error' | 'success';

export default {
	install: (app: App) => {
		const notification = (options: NotificationData) => {
			app.config.globalProperties.$store.commit('SET_NOTIFICATION', options);
		};

		app.provide('notification', notification);
	},
};
