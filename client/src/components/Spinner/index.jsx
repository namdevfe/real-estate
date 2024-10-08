import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const Spinner = ({ className = "" }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "h-8 w-8 animate-spin rounded-full border-current border-4 border-solid  border-e-transparent align-[-0.125em] text-primary-500 motion-reduce:animate-[spin_1.5s_linear_infinite]",
          className
        )
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
