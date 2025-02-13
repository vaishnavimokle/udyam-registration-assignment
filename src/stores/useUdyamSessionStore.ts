import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  sessionTxnId: string;
  setAuthState: (sessionTxnId: string) => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    // persist(
    (set) => ({
      sessionTxnId: "",
      setAuthState: (sessionTxnId: string) =>
        set(() => ({
          sessionTxnId: sessionTxnId,
        })),
    }),
    {
      name: "auth-storage",
    }
    // )
  )
);

export default useAuthStore;
