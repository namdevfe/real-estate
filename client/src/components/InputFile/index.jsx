import clsx from "clsx";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { IoMdCloudUpload } from "react-icons/io";
import Spinner from "~/components/Spinner";
import { IoCloseOutline } from "react-icons/io5";

const InputFile = (
  {
    label,
    id,
    inputClassName,
    containerClassName,
    error,
    isLoading = false,
    images = [],
    setImages,
    ...inputProps
  },
  ref
) => {
  const _onDeleteImage = (e, id) => {
    e?.preventDefault();
    if (id) {
      setImages?.((prev) => prev?.filter((image) => image?.id !== id));
    }
  };
  return (
    <div className={twMerge(clsx("flex flex-col gap-1", containerClassName))}>
      {label && <span className="font-bold text-sm">{label}</span>}
      <input type="file" id={id} ref={ref} className="hidden" {...inputProps} />
      <label
        htmlFor={id}
        className={clsx(
          "bg-input cursor-pointer flex flex-col items-center justify-center py-10 px-4 border border-dashed relative",
          error && "border-red-500"
        )}
      >
        {/* Case: Upload image */}
        {!isLoading && images.length === 0 && (
          <>
            <div className="text-5xl text-gray-light">
              <IoMdCloudUpload />
            </div>
            <small className="text-xs text-primary-900">
              Only Support image with JPEG, JPG, PNG.
            </small>
          </>
        )}

        {/* Case: Uploading to cloudinary */}
        {isLoading && <Spinner />}

        {/* Case: Uploaded success and display images */}
        {!isLoading && images.length > 0 && (
          <div className="grid grid-cols-4 gap-4 w-full h-full">
            {images.map(({ id, url }) => (
              <figure
                key={id}
                className="col-span-1 cursor-auto relative"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <span
                  className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-white cursor-pointer text-primary-500"
                  onClick={(e) => _onDeleteImage(e, id)}
                >
                  <IoCloseOutline size={20} />
                </span>
                <img src={url} alt="property-type-image" />
              </figure>
            ))}
          </div>
        )}
      </label>
      {error && <small className="text-red-600 min-h-6">{error}</small>}
    </div>
  );
};

export default forwardRef(InputFile);
