import React from "react";
import useAppStore from "~/store/useAppStore";

const Modal = () => {
  // Init hooks
  const handleCloseModal = useAppStore((state) => state.handleCloseModal);

  // Events handling
  const contentModal = useAppStore((state) => state.contentModal);
  const onCloseModal = () => {
    handleCloseModal("");
  };

  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 bg-overlay-80 z-[900] flex items-center justify-center"
      onClick={onCloseModal}
    >
      {contentModal}
    </div>
  );
};

export default Modal;
