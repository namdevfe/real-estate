import React from "react";

const HeaderTop = () => {
  return (
    <div className="h-header-top flex items-center justify-between">
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
        <a
          href="tel:+84377813805"
          className="flex items-center gap-3 relative 
              before:content-[''] before:w-[1px] before:h-10 before:bg-white before:absolute before:left-[-28px]"
        >
          <img src="/img/icon-phone.svg" alt="icon-phone" />
          <span className="text-sm">0377-813-805</span>
        </a>
      </div>
    </div>
  );
};

export default HeaderTop;
