import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...restProps
}) => {
  // Define variants class
  let variantClass = "";
  switch (variant) {
    case "primary":
      variantClass =
        "px-6 py-3 capitalize text-white text-nowrap font-medium rounded bg-primary-500";
      break;
    case "outlined":
      variantClass =
        "px-6 py-3 capitalize text-white text-nowrap font-medium border border-primary-50 rounded bg-transparent";
  }

  return (
    <button
      type="button"
      className={twMerge(clsx(variantClass, className))}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
