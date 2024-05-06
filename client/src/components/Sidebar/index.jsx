import clsx from "clsx";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ADMIN_MENUS, MENU_TYPES } from "~/constants/navigation";
import { PATHS } from "~/constants/path";

const Sidebar = () => {
  const [isToggleDropdown, setIsToggleDropdown] = useState(false);

  // Events handling
  const toggleDropdown = () => {
    setIsToggleDropdown(!isToggleDropdown);
  };

  return (
    <aside className="bg-primary-700 w-sidebar h-screen px-4">
      {/* Logo */}
      <Link
        to={PATHS.DASHBOARD}
        className="flex items-center justify-center py-6"
      >
        <img src="/img/logo-rest.svg" alt="logo-rest" />
      </Link>

      {/* Menus */}
      <ul className="flex flex-col gap-2">
        {ADMIN_MENUS.map((menu) => (
          <React.Fragment key={menu.id}>
            {/* TYPE SINGLE */}
            {menu.type === MENU_TYPES.SINGLE && (
              <li>
                <NavLink
                  end
                  to={menu.link}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 text-white capitalize transition-colors duration-300 hover:bg-primary-500 py-3 px-6 rounded",
                      isActive && "bg-primary-500"
                    )
                  }
                >
                  <img src={menu.icon} alt="" />
                  {menu.title}
                </NavLink>
              </li>
            )}

            {/* TYPE PARENT */}
            {menu.type === MENU_TYPES.PARENT && (
              <>
                <li>
                  <div
                    className="flex items-center justify-between text-white capitalize transition-colors duration-300 hover:bg-primary-500 py-3 px-6 rounded cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <span className="flex items-center gap-2">
                      <img src={menu.icon} alt="" />
                      {menu.title}
                    </span>

                    <img
                      src="/img/icon-arrow-down.svg"
                      alt="icon-arrow-down"
                      className={clsx(
                        "transition-transform duration-300",
                        isToggleDropdown && "rotate-180"
                      )}
                    />
                  </div>
                </li>
                {isToggleDropdown &&
                  menu.subMenus.map((subMenu) => (
                    <li key={subMenu.id}>
                      <NavLink
                        end
                        to={subMenu.link}
                        className={({ isActive }) =>
                          clsx(
                            "flex items-center gap-3 text-white capitalize transition-colors duration-300 hover:bg-primary-500 py-3 px-6 rounded",
                            isActive && "bg-primary-500"
                          )
                        }
                      >
                        {subMenu.title}
                      </NavLink>
                    </li>
                  ))}
              </>
            )}
          </React.Fragment>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
