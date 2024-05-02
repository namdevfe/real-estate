import { create } from "zustand";

const useAppStore = create((set) => ({
  isShowModal: false,
  contentModal: null,
  handleShowModal: (contentModal) => set({ isShowModal: true, contentModal }),
  handleCloseModal: () => set({ isShowModal: false, contentModal: null }),
}));

export default useAppStore;
