import clsx from "clsx";
import React from "react";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import HeaderMiddle from "~/components/Header/HeaderMiddle";
import HeaderTop from "~/components/Header/HeaderTop";
import { PATHS } from "~/constants/path";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header
      className={twMerge(
        clsx(
          "bg-primary-400 bg-opacity-60 w-full fixed top-0 left-0 z-50 after:absolute after:bottom-2/4 after:left-0 after:content-[''] after:w-full after:h-[1px] after:bg-white",
          pathname !== PATHS.HOME && "bg-primary-700 bg-opacity-100"
        )
      )}
    >
      <div className={clsx("container-fluid")}>
        <HeaderTop />
      </div>
      <div
        className={clsx(
          "container-fluid",
          pathname !== PATHS.HOME && "bg-white"
        )}
      >
        <HeaderMiddle />
      </div>
    </header>
  );
};

export default Header;
