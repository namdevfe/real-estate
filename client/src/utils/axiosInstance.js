import axios from "axios";
import { BASE_URL } from "~/constants/environtment";
import authService from "~/services/authService";
import useAuthStore from "~/store/useAuthStore";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("rest"))?.state?.token
      ?.accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = JSON.parse(localStorage.getItem("rest"))?.state?.token
      ?.refreshToken;
    if (
      (error?.response?.status === 403 || error?.response?.status === 401) &&
      !originalRequest._retry &&
      !!refreshToken
    ) {
      originalRequest._retry = true;
      try {
        const res = await authService.refreshToken({
          refreshToken,
        });

        if (Object.keys(res?.data).length > 0) {
          useAuthStore.setState((prev) => ({
            ...prev,
            token: res.data,
          }));
          originalRequest.headers.Authorization = `Bearer ${res.data?.accessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (error) {
        localStorage.removeItem("rest");
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
