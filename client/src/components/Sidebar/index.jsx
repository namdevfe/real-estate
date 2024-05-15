import clsx from "clsx";
import { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ADMIN_MENUS, MENU_TYPES } from "~/constants/navigation";
import { PATHS } from "~/constants/path";

const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState();

  const _onMenuChange = (menuId) => {
    setSelectedMenu(menuId);
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
        {ADMIN_MENUS.map((menu, index) => (
          <Fragment key={menu.id}>
            {/* TYPE SINGLE */}
            {menu.type === MENU_TYPES.SINGLE && (
              <li>
                <NavLink
                  end
                  to={menu.link}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 text-white text-nowrap capitalize transition-colors duration-300 hover:bg-primary-500 py-3 px-6 rounded",
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
                    className="flex items-center justify-between text-white text-nowrap capitalize transition-colors duration-300 hover:bg-primary-500 py-3 px-6 rounded cursor-pointer"
                    onClick={() => _onMenuChange(menu.id)}
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
                        selectedMenu === menu.id && "rotate-180"
                      )}
                    />
                  </div>
                </li>
                {selectedMenu === menu.id &&
                  menu.subMenus.map((subMenu) => (
                    <li key={subMenu.id}>
                      <NavLink
                        end
                        to={subMenu.link}
                        className={({ isActive }) =>
                          clsx(
                            "flex items-center gap-3 text-white text-nowrap capitalize transition-colors duration-300 hover:bg-primary-500 py-3 px-6 rounded",
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
          </Fragment>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
