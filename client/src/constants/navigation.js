import { PATHS } from "~/constants/path";

export const NAVIGATIONS = [
  {
    text: "Home",
    path: PATHS.HOME,
  },
  {
    text: "About Us",
    path: PATHS.ABOUT_US,
  },
  {
    text: "Our Agents",
    path: PATHS.OUR_AGENTS,
  },
  {
    text: "Properties",
    path: PATHS.PROPERTIES,
  },
  {
    text: "Gallery",
    path: PATHS.GALLERY,
  },
  {
    text: "Blog",
    path: PATHS.BLOG,
  },
  {
    text: "Contact Us",
    path: PATHS.CONTACT_US,
  },
  {
    text: "Search",
    path: PATHS.SEARCH,
  },
];

export const MENU_TYPES = {
  SINGLE: "single",
  PARENT: "parent",
};

export const ADMIN_MENUS = [
  {
    id: 1,
    icon: "/img/icon-dashboard.svg",
    title: "Dashboard",
    link: PATHS.DASHBOARD,
    type: MENU_TYPES.SINGLE,
  },
  {
    id: 2,
    icon: "/img/icon-home.svg",
    title: "Property Type",
    type: MENU_TYPES.PARENT,
    subMenus: [
      {
        id: 1,
        title: "Create Property Type",
        link: PATHS.CREATE_PROPERTY_TYPE,
      },
      {
        id: 2,
        title: "Manage Property Type",
        link: PATHS.MANAGE_PROPERTY_TYPE,
      },
    ],
  },
];

export const ACCOUNT_OPTIONS = [
  {
    id: 1,
    name: "Admin dashboard",
    code: "R1",
    path: PATHS.DASHBOARD,
  },
  {
    id: 2,
    name: "Owner dashboard",
    code: "R2",
    path: PATHS.OWNER_DASHBOARD,
  },
  {
    id: 3,
    name: "Agent dashboard",
    code: "R3",
    path: PATHS.AGENT_DASHBOARD,
  },
  {
    id: 4,
    name: "Profile",
    code: "R4",
    path: PATHS.PROFILE,
  },
];
