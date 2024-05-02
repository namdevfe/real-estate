import clsx from "clsx";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import LoginForm from "~/components/Auth/LoginForm";
import RegisterForm from "~/components/Auth/RegisterForm";
import { MODAL_TYPES } from "~/constants/general";

const Auth = () => {
  const [modalType, setModalType] = useState(MODAL_TYPES.LOGIN);
  const _onTabChange = (type) => {
    setModalType(type);
  };
  return (
    <div
      className="min-w-[448px] max-w-[448px] bg-white text-primary-900 px-2 py-6 rounded-md relative"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold text-center">Wellcome to REST</h2>

      {/* Tabs */}
      <ul className="flex items-center h-[56px] border-b border-primary-900">
        <li
          className={twMerge(
            clsx(
              "h-full w-fit px-4 flex items-center justify-center cursor-pointer border-b-4 border-transparent",
              modalType === MODAL_TYPES.LOGIN && "border-primary-500"
            )
          )}
          onClick={() => _onTabChange(MODAL_TYPES.LOGIN)}
        >
          Sign in
        </li>
        <li
          className={twMerge(
            clsx(
              "h-full w-fit px-4 flex items-center justify-center cursor-pointer border-b-4 border-transparent",
              modalType === MODAL_TYPES.REGISTER && " border-primary-500"
            )
          )}
          onClick={() => _onTabChange(MODAL_TYPES.REGISTER)}
        >
          New account
        </li>
      </ul>

      {/* Login/Register form */}
      {modalType === MODAL_TYPES.LOGIN && <LoginForm />}
      {modalType === MODAL_TYPES.REGISTER && <RegisterForm />}
    </div>
  );
};

export default Auth;
