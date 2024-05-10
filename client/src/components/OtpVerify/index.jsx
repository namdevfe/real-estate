import clsx from "clsx";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { twMerge } from "tailwind-merge";
import Button from "~/components/Button";
import Spinner from "~/components/Spinner";
import Title from "~/components/Title";

const OtpVerify = ({ className = "", onSuccess }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle change otp
  const handleOtpChange = (code) => {
    setOtp(code);
  };

  // Clear OTP
  const handleClearOtp = () => {
    if (!otp) return;
    setOtp("");
  };

  // Verify OTP and create account
  const handleVerifyOtp = () => {
    setIsLoading(true);
    // Verify OTP sent to phone number is registerd
    const confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((res) => {
        // User signed in successfully.
        onSuccess?.();
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log("🚀error---->", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={twMerge(clsx("relative", className))}>
      {isLoading && (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full h-full flex items-center justify-center bg-overlay-white-60">
          <Spinner />
        </div>
      )}
      {/* Title */}
      <div>
        <Title variant="h2">Verify your phone</Title>
        <p className="mt-2">
          We have sent the OTP to your phone number. Please check your phone
          number
        </p>
      </div>

      {/* Otp input */}
      <OtpInput
        value={otp}
        onChange={handleOtpChange}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle="!w-12 !h-12 px-0 rounded border-primary-500"
        shouldAutoFocus
      />

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          type="submit"
          className={clsx(otp.length < 6 && "bg-gray cursor-not-allowed")}
          onClick={handleVerifyOtp}
        >
          Confirm OTP
        </Button>
        <Button
          type="button"
          className={clsx(!otp && "bg-gray cursor-not-allowed")}
          onClick={handleClearOtp}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default OtpVerify;
