import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SubscribeType } from "@/store/user/typing";

const LOCAL_KEY = "user-store";

interface rateLimit {
  remain: number;
  success: boolean;
  reset: number;
}

export interface UserStore {
  email: string;
  updateEmail: (email: string) => void;

  inviteCode: string;
  updateInviteCode: (inviteCode: string) => void;

  sessionToken: string | null;
  sessionTokenExpiry: number | null;
  validateSessionToken: () => boolean;
  updateSessionToken: (sessionToken: string) => void;

  clearData: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      email: "",
      inviteCode: "",
      sessionToken: null,
      sessionTokenExpiry: 0,
      subscription: undefined,

      updateEmail(email: string) {
        set((state) => ({ email }));
      },

      updateInviteCode(inviteCode: string) {
        set((state) => ({ inviteCode }));
      },

      updateSessionToken(sessionToken: string) {
        set((state) => ({ sessionToken }));
        // Set sessionTokenExpiry to be current time + 3 days
        set((state) => ({
          sessionTokenExpiry: Date.now() + 3 * 24 * 60 * 60 * 1000
        }))
      },

      /**
       * 本地检验
       * sessionToken是否存在或者过期
       * 后端中间件需要二次效验
       */
      validateSessionToken() {
        const sessionToken = get().sessionToken;
        const sessionTokenExpiry = get().sessionTokenExpiry;
        if (!sessionToken || !sessionTokenExpiry) {
          return false;
        }
      
        const now = Date.now();
        return now < sessionTokenExpiry;
      },

      clearData() {
        set((state) => ({
          sessionTokenExpiry: 0,
          sessionToken: null,
          email: "",
        }));
      },
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    }
  )
);
