import axiosInstance from "~/utils/axiosInstance";

const authService = {
  register(payload = {}) {
    return axiosInstance.post("/auth/register", payload);
  },
  login(payload = {}) {
    return axiosInstance.post("/auth/login", payload);
  },
  getProfile() {
    return axiosInstance.get("/auth/profile");
  },
};

export default authService;
