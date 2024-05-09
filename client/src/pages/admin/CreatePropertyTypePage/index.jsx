import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import Input from "~/components/Input";
import InputFile from "~/components/InputFile";
import TextArea from "~/components/TextArea";
import Title from "~/components/Title";
import { UPLOAD_PRESET_NAME } from "~/constants/environtment";
import { FIELDS, MESSAGE } from "~/constants/validate";
import cloudinaryService from "~/services/cloudinaryService";
import propertyTypeService from "~/services/propertyTypeService";

const CreatePropertyTypePage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const imageFileList = watch(FIELDS.PROPERTY_TYPE_IMAGE);

  // Upload image
  const uploadImage = async (files) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const imageList = [];
      for (let file of files) {
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET_NAME);

        // Call Api upload image to cloudinary
        const res = await cloudinaryService.uploadImage(formData);
        if (res.status === 200) {
          const { public_id: id, secure_url: url } = res.data || {};
          imageList.push({ id, url });
        }

        setImages(imageList);
      }
    } catch (error) {
      console.log("🚀error---->", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit form
  const createPropertyType = async (data) => {
    try {
      const payload = { ...data, image: data?.image?.[0]?.url };

      // Call Api
      const res = await propertyTypeService.create(payload);
      if (res?.statusCode === 201 || res?.propertyType?.id) {
        // Toast notification
        toast.success(res.message || "Success");

        // Reset form
        reset();

        setImages([]);
      }
    } catch (error) {
      toast.error(error.response?.message);
    }
  };

  useEffect(() => {
    if (
      imageFileList &&
      imageFileList instanceof FileList &&
      imageFileList.length > 0
    ) {
      uploadImage(imageFileList);
    }
  }, [imageFileList]);

  useEffect(() => {
    if (images.length > 0) {
      setValue("image", images);
    }
    if (images.length === 0) setValue("image", []);
  }, [images.length]);

  return (
    <main className="flex-1 pt-9 px-[30px] overflow-y-scroll h-screen">
      {/* Title */}
      <Title>Create property type</Title>

      {/* Form Create */}
      <form
        className="mt-8 flex flex-col gap-4"
        onSubmit={handleSubmit(createPropertyType)}
      >
        <Input
          label="Property Name"
          id="name"
          placeholder="Property type name..."
          {...register(FIELDS.PROPERTY_TYPE_NAME, {
            required: MESSAGE.PROPERTY_TYPE_NAME,
          })}
          error={errors?.name?.message}
        />

        <TextArea
          label="Description"
          placeholder="Property type description..."
          inputClassName="resize-none"
          id="description"
          {...register(FIELDS.PROPERTY_TYPE_DESCRIPTION, {
            required: MESSAGE.PROPERTY_TYPE_DESCRIPTION,
          })}
          rows={6}
          error={errors?.description?.message}
        />

        <InputFile
          label="Upload Image"
          id="image"
          {...register(FIELDS.PROPERTY_TYPE_IMAGE, {
            validate: (value) =>
              value?.length > 0 || MESSAGE.PROPERTY_TYPE_IMAGE,
          })}
          error={errors?.image?.message}
          isLoading={isLoading}
          images={images}
          setImages={setImages}
        />

        <div className="mt-8">
          <Button type="submit" className="w-full">
            Create
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreatePropertyTypePage;
