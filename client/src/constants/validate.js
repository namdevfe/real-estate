export const FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
  NAME: "name",
  PHONE: "phone",
  ROLE: "role",
};

export const MESSAGE = {
  EMAIL: "Email is required",
  PASSWORD: "Password is required",
  NAME: "Name is required",
  PHONE: "Phone is required",
  ROLE: "Role is required",
};

export const REGEX = {
  PHONE: {
    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
    message: "Invalid phone number",
  },
};
