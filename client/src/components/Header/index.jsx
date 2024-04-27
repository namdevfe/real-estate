import React from "react";
import { Link } from "react-router-dom";
import HeaderTop from "~/components/Header/HeaderTop";
import { PATHS } from "~/constants/path";

const Header = () => {
  return (
    <header className="bg-primary-400 w-full fixed top-0 left-0 after:absolute after:bottom-2/4 after:left-0 after:content-[''] after:w-full after:h-[1px] after:bg-white">
      <div className="container-fluid ">
        {/* Header top */}
        <HeaderTop />

        {/* Header Middle */}
        <div className="h-header-middle flex items-center justify-between">
          {/* Logo */}
          <Link to={PATHS.HOME} className="flex shrink-0">
            <img src="/img/logo-rest.svg" alt="logo-rest" />
          </Link>

          {/* Navbar */}
          <div className="flex items-center">
            <ul className="flex items-center">
              <li>
                <a
                  href="#"
                  className="px-6 py-3 text-sm uppercase text-white text-nowrap"
                >
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-6 py-3 text-sm uppercase text-white text-nowrap"
                >
                  ABOUT US
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-6 py-3 text-sm uppercase text-white text-nowrap"
                >
                  OUR AGENTS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-6 py-3 text-sm uppercase text-white text-nowrap"
                >
                  PROPERTIES
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-6 py-3 text-sm uppercase text-white text-nowrap"
                >
                  GALLERY
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-6 py-3 text-sm uppercase text-white text-nowrap"
                >
                  BLOG
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-6 py-3 text-sm uppercase text-white text-nowrap"
                >
                  CONTACT US
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-6 py-3 text-sm uppercase text-white text-nowrap"
                >
                  SEARCH
                </a>
              </li>
            </ul>

            {/* Call to action */}
            <button
              type="button"
              className="px-6 py-3 capitalize text-white text-nowrap font-medium border border-primary-50 rounded"
            >
              Add Listing
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
