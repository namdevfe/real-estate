import clsx from "clsx";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = (
  { label, id, inputClassName, containerClassName, error, ...inputProps },
  ref
) => {
  return (
    <div className={twMerge(clsx("flex flex-col gap-1", containerClassName))}>
      {label && (
        <label htmlFor={id} className="font-bold text-sm">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={twMerge(
          clsx(
            "form-input rounded-md bg-input border-primary-900 focus:border-primary-500",
            error && "border-red-600",
            inputClassName
          )
        )}
        {...inputProps}
      />
      {error && <small className="text-red-600 min-h-6">{error}</small>}
    </div>
  );
};

export default forwardRef(Input);
