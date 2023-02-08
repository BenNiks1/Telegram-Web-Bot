import { request } from "@/helpers";

export const getPosts = (params) =>
  request("/posts", { ...params, _limit: 5, _sort: "id", _order: "desc" });
