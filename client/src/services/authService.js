import axiosInstance from "~/utils/axiosInstance";

const authService = {
  register(payload = {}) {
    return axiosInstance.post("/auth/register", payload);
  },
  login(payload = {}) {
    return axiosInstance.post("/auth/login", payload);
  },
};

export default authService;
