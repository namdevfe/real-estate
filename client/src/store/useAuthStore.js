import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      profile: null,
    }),
    {
      name: "rest",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter((item) => item[0] !== "profile")
        ),
    }
  )
);

export default useAuthStore;
