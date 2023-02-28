import request from "@/helpers/request";

export const getDCList = (params) => request({ url: "/dealers", params });

export const getServicesList = (params) =>
  request({ url: "/services", params });
