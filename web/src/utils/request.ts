import axios from "axios";
import { Resp } from "@/types";

let request = axios.create({
  baseURL: "api/",
  timeout: 8000,
});

request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log("Error: " + error.message);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (res) {
    return res.data;
  },
  function (error) {
    console.log("Error: " + error.message);
    return Promise.reject(error);
  }
);

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Resp;
  }
}

export default request;
