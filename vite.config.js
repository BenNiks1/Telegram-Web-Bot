import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { loadEnv } from 'vite';
const env = loadEnv('develop', process.cwd());

// https://vitejs.dev/config/
export default {
	plugins: [vue()],
	test: {
		include: ['**/*.test.{js,ts}']
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		proxy: {
			'/api': {
				target: env.VITE_API_URL,
				ws: true,
				changeOrigin: true,
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "@/assets/style/main.scss";',
			},
		},
	},
};
