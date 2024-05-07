import axiosInstance from "~/utils/axiosInstance";

const roleService = {
  getRoles() {
    return axiosInstance.get("/role");
  },
};

export default roleService;
