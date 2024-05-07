import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import authService from "~/services/authService";
import roleService from "~/services/roleService";

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      profile: null,
      roles: null,
      setToken: (token) => set(() => ({ token })),
      getProfile: async () => {
        const res = await authService.getProfile();
        if (res?.data) {
          set(() => ({ profile: res?.data }));
        } else {
          set(() => ({ profile: null }));
        }
      },
      getRoles: async () => {
        const res = await roleService.getRoles();
        if (res?.roles?.length > 0) {
          set(() => ({ roles: res?.roles }));
        } else {
          set(() => ({ roles: null }));
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
