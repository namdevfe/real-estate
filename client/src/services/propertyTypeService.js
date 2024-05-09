import axiosInstance from "~/utils/axiosInstance";

const propertyTypeService = {
  create(payload = {}) {
    return axiosInstance.post("/property-type", payload);
  },
};

export default propertyTypeService;
