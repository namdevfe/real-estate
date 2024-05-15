const ADMIN_PATH = "/admin";
const PROPERTY_TYPE_PATH = ADMIN_PATH + "/property-type";
const PROPERTY_PATH = ADMIN_PATH + "/property";

export const PATHS = {
  // Public path
  HOME: "/",
  ABOUT_US: "/about-us",
  OUR_AGENTS: "/our-agents",
  PROPERTIES: "/properties",
  GALLERY: "/gallery",
  BLOG: "/blog",
  CONTACT_US: "/contact-us",
  SEARCH: "/search",

  // Admin path
  DASHBOARD: ADMIN_PATH,
  CREATE_PROPERTY_TYPE: PROPERTY_TYPE_PATH + "/create",
  MANAGE_PROPERTY_TYPE: PROPERTY_TYPE_PATH + "/manage",
  CREATE_PROPERTY: PROPERTY_PATH + "/create",
  MANAGE_PROPERTY: PROPERTY_PATH + "/manage",

  // User path
  PROFILE: "/profile",

  // Owner path
  OWNER_DASHBOARD: "/owner-dashboard",

  // Agent path
  AGENT_DASHBOARD: "/agent-dashboard",

  // Page not found
  NOT_FOUND: "*",
};
