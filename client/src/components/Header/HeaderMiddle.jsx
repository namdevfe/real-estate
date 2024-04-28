import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "~/constants/path";

const HeaderMiddle = () => {
  return (
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
  );
};

export default HeaderMiddle;
