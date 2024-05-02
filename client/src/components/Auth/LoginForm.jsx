import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Spinner from "~/components/Spinner";
import { FIELDS, MESSAGE, REGEX } from "~/constants/validate";
import authService from "~/services/authService";
import useAppStore from "~/store/useAppStore";
import useAuthStore from "~/store/useAuthStore";

const LoginForm = () => {
  // Inits
  const setToken = useAuthStore((state) => state.setToken);
  const handleCloseModal = useAppStore((state) => state.handleCloseModal);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  // Events handling
  const onSubmit = async (data) => {
    try {
      // Prepare payload
      const payload = { ...data };

      // Call api login
      const res = await authService.login(payload);

      if (res?.statusCode === 200) {
        // Successful notification
        toast.success(res?.message);

        // Get accessToken save to local storage using zustand/persist middleware
        const { accessToken } = res?.data || {};
        setToken(accessToken);

        // Close modal when finished all
        handleCloseModal();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage || "Login failed. Please try again.");
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
      {isSubmitting && (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full h-full flex items-center justify-center bg-overlay-white-60">
          <Spinner />
        </div>
      )}
      <Input
        label="Phone"
        id="phone"
        placeholder="Enter your phone"
        {...register(FIELDS.PHONE, {
          required: MESSAGE.PHONE,
          pattern: { value: REGEX.PHONE.value, message: REGEX.PHONE.message },
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
      />

      {/* Submit button */}
      <Button type="submit" className="py-2 mt-6 w-full">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
