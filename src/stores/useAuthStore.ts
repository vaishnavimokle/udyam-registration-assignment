import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  clientId: string;
  clientSecret: string;
  setAuthState: (
    clientId: string,
    clientSecret: string,
  ) => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    // persist(
    (set) => ({
      clientId: "",
      clientSecret: "",
      setAuthState: (clientId: string, clientSecret: string) =>
        set(() => ({
          clientId: clientId,
          clientSecret: clientSecret,
        })),
    }),
    {
      name: "auth-storage",
    }
    // )
  )
);

export default useAuthStore;
