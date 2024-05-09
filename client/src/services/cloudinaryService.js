import axios from "axios";
import { CLOUDINARY_UPLOAD_URL } from "~/constants/environtment";

const cloudinaryService = {
  uploadImage(images) {
    return axios.post(CLOUDINARY_UPLOAD_URL, images);
  },
};

export default cloudinaryService;
