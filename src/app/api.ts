import axios from "axios";
export const apiRoot = axios.create({
  baseURL: "http://64.227.142.153/api",
  // baseURL: "http://139.59.41.179/api",
});
