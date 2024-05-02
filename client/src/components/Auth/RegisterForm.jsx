import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Radio from "~/components/Radio";
import Spinner from "~/components/Spinner";
import { ACCOUNT_OPTIONS } from "~/constants/general";
import { FIELDS, MESSAGE, REGEX } from "~/constants/validate";
import authService from "~/services/authService";

const RegisterForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const payload = { ...data };
    try {
      // Call Api Register
      const res = await authService.register(payload);

      // Thông báo đăng ký thành công
      if (res.statusCode === 201) {
        toast.success(res.data.message);
      }
    } catch (error) {
      // Thông báo đăng ký thất bại
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
        {isSubmitting && (
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full h-full flex items-center justify-center bg-overlay-white-60">
            <Spinner />
          </div>
        )}
        <Input
          label="Name"
          id="name"
          placeholder="Enter your name"
          {...register(FIELDS.NAME, {
            required: MESSAGE.NAME,
          })}
          error={errors?.name?.message}
        />
        <Input
          containerClassName="mt-4"
          label="Phone"
          id="phone"
          placeholder="Enter your phone"
          {...register(FIELDS.PHONE, {
            required: MESSAGE.PHONE,
            pattern: {
              value: REGEX.PHONE.value,
              message: REGEX.PHONE.message,
            },
          })}
          error={errors?.phone?.message}
        />
        <Input
          type="password"
          label="Password"
          id="password"
          placeholder="Enter your password"
          containerClassName="mt-4"
          {...register(FIELDS.PASSWORD, {
            required: MESSAGE.PASSWORD,
          })}
          error={errors?.password?.message}
        />
        <Radio
          containerClassName="mt-4"
          label="Type account"
          options={ACCOUNT_OPTIONS}
          {...register(FIELDS.ROLE, {
            required: MESSAGE.ROLE,
          })}
          error={errors?.role?.message}
        />

        {/* Submit button */}
        <Button type="submit" className="py-2 mt-6 w-full">
          Register
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
