import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const Title = ({ variant = "h1", children, className = "" }) => {
  // let variantClass = "";
  switch (variant) {
    case "h1":
      return (
        <h1
          className={twMerge(clsx("text-3xl font-bold capitalize", className))}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={twMerge(clsx("text-3xl font-bold capitalize", className))}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={twMerge(clsx("text-3xl font-bold capitalize", className))}
        >
          {children}
        </h3>
      );
  }
};

export default Title;
