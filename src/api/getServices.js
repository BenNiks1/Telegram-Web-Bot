import request from "@/helpers/request";

export const getDCList = (params) =>
  request({ url: "/api/widget/dealers", params });

export const getServicesList = (params) =>
  request({ url: "/api/widget/services", params });
