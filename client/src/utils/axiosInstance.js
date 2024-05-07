import axios from "axios";
import { BASE_URL } from "~/constants/environtment";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Thêm một bộ đón chặn request
axiosInstance.interceptors.request.use(
  function (config) {
    // Get accessToken from localStorage
    const accessToken = JSON.parse(localStorage.getItem("rest"))?.state?.token
      ?.accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
axiosInstance.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response.data;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  }
);

export default axiosInstance;
