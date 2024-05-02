import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import authService from "~/services/authService";

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      profile: null,
      setToken: (token) => set(() => ({ token })),
      getProfile: async () => {
        const res = await authService.getProfile();
        if (res?.data) {
          set(() => ({ profile: res?.data }));
        }
      },
    }),
    {
      name: "rest",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            (item) => item[0] === "token" || item[0] === "profile"
          )
        ),
    }
  )
);

export default useAuthStore;
