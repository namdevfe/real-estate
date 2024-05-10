import clsx from "clsx";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import Input from "~/components/Input";
import OtpVerify from "~/components/OtpVerify";
import Radio from "~/components/Radio";
import Spinner from "~/components/Spinner";
import auth from "~/config/fireBaseConfig";
import { ROLES } from "~/constants/general";
import { FIELDS, MESSAGE, REGEX } from "~/constants/validate";
import authService from "~/services/authService";
import useAuthStore from "~/store/useAuthStore";

const RegisterForm = () => {
  const roles = useAuthStore((state) => state.roles);
  const roleOptions = roles
    ?.filter((role) => role?.code !== ROLES.ADMIN)
    ?.map((item) => ({
      label: item?.value,
      value: item?.code,
    }));
  const [isShowOtpVerify, setIsShowOtpVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  // Handle recaptcha verify
  const handleRecaptchaVerifier = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-verifier",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
          },
        }
      );
    }
  };

  // Handle send OTP
  const handleSendOTP = (phoneNumber) => {
    setIsLoading(true);
    handleRecaptchaVerifier();
    const recaptchaVerifier = window.recaptchaVerifier;

    // Format phone number
    const phoneNumberFormatted = `+84 ${phoneNumber.slice(1)}`;
    signInWithPhoneNumber(auth, phoneNumberFormatted, recaptchaVerifier)
      .then((res) => {
        window.confirmationResult = res;
        toast.success(
          `The OTP code that has been sent to your phone number is ${phoneNumber}`
        );
        setIsShowOtpVerify(true);
      })
      .catch((error) => {
        // Error: SMS not sent
        toast.error("Something went wrongs. Please try again !");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handle register
  const handleRegister = async (data) => {
    try {
      const payload = { ...data };

      // // Call Api Register
      const res = await authService.register(payload);

      // Success
      if (res.statusCode === 201) {
        toast.success(res?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // Handle submit
  const onSubmit = async (data) => {
    if (data?.roleCode !== ROLES.USER) {
      handleSendOTP(data?.phone);
    } else {
      handleRegister(data);
    }
  };

  return (
    <>
      <form
        className={clsx("p-4", isShowOtpVerify && "hidden")}
        onSubmit={handleSubmit(onSubmit)}
      >
        {isLoading && (
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full h-full flex items-center justify-center bg-overlay-white-60">
            <Spinner />
          </div>
        )}

        <div id="recaptcha-verifier" />
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
          label="Type account (Optional)"
          options={roleOptions}
          {...register(FIELDS.ROLE)}
          error={errors?.role?.message}
          defaultValue={ROLES.USER}
        />

        {/* Submit button */}
        <Button type="submit" className="py-2 mt-6 w-full">
          Register
        </Button>
      </form>

      {isShowOtpVerify && (
        <OtpVerify
          className="absolute top-2/4 -translate-y-2/4 left-0 w-full p-6 bg-white flex flex-col items-center justify-center gap-6 text-center rounded-md "
          onSuccess={handleSubmit(handleRegister)}
        />
      )}
    </>
  );
};

export default RegisterForm;
