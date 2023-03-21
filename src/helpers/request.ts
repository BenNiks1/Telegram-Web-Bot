import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create();

// Добавление хедеров перед запросом

instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		config.headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		};

		return config;
	},
	(error) => {
		console.error('Error on request, ', error);
		return Promise.reject(error);
	}
);

const serviceDecorator = (config: AxiosRequestConfig) =>
	instance({ ...config, url: import.meta.env.VITE_POSTFIX_URL + config.url })
		.then((res) => res)
		.catch((error) => Promise.reject(error));

export default serviceDecorator;
