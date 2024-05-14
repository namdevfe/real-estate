import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { PATHS } from "~/constants/path";
import useAuthStore from "~/store/useAuthStore";
import { IoIosLogOut } from "react-icons/io";
import { IoCaretDown } from "react-icons/io5";
import { ACCOUNT_OPTIONS } from "~/constants/navigation";

const HeaderTop = () => {
  const { profile, roles, handleLogout } = useAuthStore();
  const { avatar, name, userRoles } = profile || {};
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const accountOptionRef = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Event handling
  const handleCloseDropdown = () => {
    setIsShowDropdown(false);
  };

  const onLogout = (e) => {
    e?.stopPropagation();
    handleLogout?.();
    toast.success("Logout successfully");
    handleCloseDropdown();
    navigate(PATHS.HOME);
  };

  const onToggleDropdown = (e) => {
    e?.stopPropagation();
    setIsShowDropdown(!isShowDropdown);
  };

  // Close account option dropdown when click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!accountOptionRef.current?.contains(e.target)) handleCloseDropdown();
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [pathname]);

  return (
    <div
      className={twMerge(
        clsx("h-header-top flex items-center justify-between")
      )}
    >
      {/* Email address */}
      <a
        href="mailto:example@gmail.com"
        className="flex items-center gap-3 text-sm"
      >
        <img src="/img/icon-email.svg" alt="icon-email" />
        <span className="font-bold">Email us at: </span> example@gmail.com
      </a>

      <div className="flex items-center shrink-0 gap-14">
        {/* Socials media */}
        <ul className="flex items-center">
          <li>
            <a href="#" className="flex p-3">
              <img src="/img/icon-facebook.svg" alt="icon-facebook" />
            </a>
          </li>
          <li>
            <a href="#" className="flex p-3">
              <img src="/img/icon-dribble.svg" alt="icon-dribble" />
            </a>
          </li>
          <li>
            <a href="#" className="flex p-3">
              <img src="/img/icon-linkedin.svg" alt="icon-linkedin" />
            </a>
          </li>
          <li>
            <a href="#" className="flex p-3">
              <img src="/img/icon-instagram.svg" alt="icon-instagram" />
            </a>
          </li>
          <li>
            <a href="#" className="flex p-3">
              <img src="/img/icon-behance.svg" alt="icon-behance" />
            </a>
          </li>
        </ul>

        {/* Phone number */}
        <a
          href="tel:+84377813805"
          className="flex items-center gap-3 relative 
              before:content-[''] before:w-[1px] before:h-10 before:bg-white before:absolute before:left-[-28px] before:cursor-default"
        >
          <img src="/img/icon-phone.svg" alt="icon-phone" />
          <span className="text-sm">0377-813-805</span>
        </a>

        {/* Logged */}
        {profile && (
          <div
            className=" cursor-pointer p-2 transition-colors hover:bg-primary-400 relative before:content-[''] before:w-[1px] before:h-10 before:bg-white before:absolute before:left-[-28px] before:top-2/4 before:-translate-y-2/4 before:cursor-default"
            onClick={onToggleDropdown}
            ref={accountOptionRef}
          >
            {/* Informations */}
            <div className="flex items-center gap-2 justify-between">
              {/* Avatar */}
              <div className="flex w-8 h-8 overflow-hidden rounded-full">
                <img
                  src={
                    avatar ||
                    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="avatar-image"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <span className="text-sm">Hi, {name || "User"}</span>
              <IoCaretDown
                className={clsx(
                  "transition-transform",
                  isShowDropdown && "rotate-180"
                )}
              />
            </div>

            {/* Dropdown menus */}
            {isShowDropdown && (
              <ul
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full right-0 w-full z-[51] bg-white overflow-hidden py-4 text-primary-900"
              >
                {ACCOUNT_OPTIONS.map(
                  ({ id, name, code, path }) =>
                    userRoles?.some((role) => role?.roleCode === code) && (
                      <li key={id}>
                        <Link
                          to={path}
                          className="p-2 flex transition-colors hover:bg-primary-200"
                        >
                          {name}
                        </Link>
                      </li>
                    )
                )}

                <li>
                  <div
                    className="p-2 flex items-center justify-between transition-colors hover:bg-primary-200"
                    onClick={onLogout}
                  >
                    Logout
                    <IoIosLogOut size={24} />
                  </div>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderTop;
