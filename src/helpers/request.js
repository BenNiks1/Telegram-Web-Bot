export const request = async (url, params = {}, method = "GET", data) => {
  let options = {
    method,
  };
  url =
    process.env.VUE_APP_BASE_URL +
    url +
    "?" +
    new URLSearchParams(params).toString();
  if ("POST" === method.toLocaleUpperCase()) {
    options.body = JSON.stringify(data);
  }

  return await fetch(url, options).then((res) => res.json());
};
