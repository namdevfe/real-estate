import clsx from "clsx";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Radio = (
  {
    label,
    id,
    inputClassName,
    containerClassName,
    error,
    options = [],
    defaultValue,
    ...inputProps
  },
  ref
) => {
  return (
    <div className={twMerge(clsx("flex flex-col gap-1", containerClassName))}>
      {label && (
        <label htmlFor={id} className="font-bold text-sm">
          {label}
        </label>
      )}
      {options.map((option) => (
        <div key={option?.value} className="flex items-center gap-2">
          <input
            type="radio"
            ref={ref}
            id={option?.value}
            value={option?.value}
            className={twMerge(
              clsx(
                "form-radio bg-input border-primary-900 focus:border-primary-500 cursor-pointer",
                error && "border-red-600",
                inputClassName
              )
            )}
            {...inputProps}
          />
          <label htmlFor={option?.value} className="cursor-pointer">
            {option?.label}
          </label>
        </div>
      ))}

      {error && <small className="text-red-600 min-h-6">{error}</small>}
    </div>
  );
};

export default forwardRef(Radio);
