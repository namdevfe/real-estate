import React from "react";

const BannerSection = () => {
  return (
    <section className="h-screen min-h-[700px] max-h-[1080px] bg-primary-400 bg-opacity-60 relative">
      {/* Content */}
      <div className="container h-full flex items-center justify-center">
        {/* Textbox */}
        <div className="text-center m-w-[696px]">
          <h1 className="text-h1 capitalize font-semibold">
            Find Your Dream Home
          </h1>
          <p className="text-xl text-primary-50 mt-6">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Proin sodales ultrices nulla blandit
            volutpat.
          </p>
        </div>

        {/* Advance search */}
      </div>

      {/* Banner image */}
      <picture className="w-full h-full object-cover absolute top-0 left-0 z-[-1]">
        <source media="(max-width:992px)" srcSet="/img/banner-tablet.jpg" />
        <img
          src="/img/banner.jpg"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </picture>
    </section>
  );
};

export default BannerSection;
