import clsx from "clsx";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Button from "~/components/Button";
import LoginForm from "~/components/Auth";
import { MODAL_TYPES } from "~/constants/general";
import { NAVIGATIONS } from "~/constants/navigation";
import { PATHS } from "~/constants/path";
import useAppStore from "~/store/useAppStore";
import useAuthStore from "~/store/useAuthStore";

const HeaderMiddle = () => {
  const { pathname } = useLocation();
  const handleShowModal = useAppStore((state) => state.handleShowModal);
  const token = useAuthStore((state) => state.token);

  const showModal = (e) => {
    handleShowModal(<LoginForm />);
  };

  return (
    <div
      className={twMerge(
        clsx(
          "h-header-middle flex items-center justify-between",
          pathname !== PATHS.HOME && "bg-white"
        )
      )}
    >
      {/* Logo */}
      <Link to={PATHS.HOME} className="flex shrink-0">
        {pathname === PATHS.HOME ? (
          <img src="/img/logo-rest.svg" alt="logo-rest" />
        ) : (
          <img src="/img/logo-rest-blue.svg" alt="logo-rest" />
        )}
      </Link>

      <div className="flex items-center">
        {/* Navbar */}
        <ul className="flex items-center">
          {NAVIGATIONS.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  twMerge(
                    clsx(
                      "px-6 py-3 text-sm uppercase text-white text-nowrap",
                      isActive && "font-semibold",
                      pathname !== PATHS.HOME && "text-primary-900"
                    )
                  )
                }
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Call to action */}
        {pathname === PATHS.HOME && !!token && (
          <Button variant="outlined">Add Listing</Button>
        )}

        {pathname === PATHS.HOME && !token && (
          <Button variant="outlined" onClick={showModal}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderMiddle;
