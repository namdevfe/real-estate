export const FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
  NAME: "name",
  PHONE: "phone",
  ROLE: "roleCode",
  PROPERTY_TYPE_NAME: "name",
  PROPERTY_TYPE_DESCRIPTION: "description",
  PROPERTY_TYPE_IMAGE: "image",
};

export const MESSAGE = {
  EMAIL: "Email is required",
  PASSWORD: "Password is required",
  NAME: "Name is required",
  PHONE: "Phone is required",
  PROPERTY_TYPE_NAME: "Property Type Name is required",
  PROPERTY_TYPE_DESCRIPTION: "Property Type Description is required",
  PROPERTY_TYPE_IMAGE: "Property Type Image is required",
};

export const REGEX = {
  PHONE: {
    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
    message: "Invalid phone number",
  },
};
