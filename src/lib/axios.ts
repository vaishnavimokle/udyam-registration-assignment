import Axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import * as https from "https";
import { API_URL } from "@/config";
import useAuthStore from "@/stores/useAuthStore";

const defaultIntercepteor = (config: InternalAxiosRequestConfig) => {
  const authStore = useAuthStore.getState();
  config.headers["client_id"] = authStore.clientId
  config.headers["client_secret"] = authStore.clientSecret;
  return config;
};

export const axios = Axios.create({
  baseURL: API_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

axios.interceptors.request.use(defaultIntercepteor);

axios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const data: any = response.data
    return data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error("API exception: " + message);

    return Promise.reject(error);
  }
);
