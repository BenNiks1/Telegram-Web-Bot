import axios from "axios";

const instance = axios.create();

// Добавление хедеров перед запросом

instance.interceptors.request.use(
  (config) => {
    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    console.error("Error on request, ", error);
    return Promise.reject(error);
  }
);

const serviceDecorator = (config) =>
  instance({ ...config, url: process.env.VUE_APP_POSTFIX_URL + config.url })
    .then((res) => res)
    .catch((error) => console.error(error));

export default serviceDecorator;
