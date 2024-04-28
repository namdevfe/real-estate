import React from "react";
import HeaderMiddle from "~/components/Header/HeaderMiddle";
import HeaderTop from "~/components/Header/HeaderTop";

const Header = () => {
  return (
    <header className="bg-primary-400 bg-opacity-60 w-full fixed top-0 left-0 z-50 after:absolute after:bottom-2/4 after:left-0 after:content-[''] after:w-full after:h-[1px] after:bg-white">
      <div className="container-fluid ">
        <HeaderTop />
        <HeaderMiddle />
      </div>
    </header>
  );
};

export default Header;
