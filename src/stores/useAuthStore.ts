import { APIUrl } from "@/constants/apiUrl";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  apiUrl: string;
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
      apiUrl: APIUrl.QA,
      clientId: "",
      clientSecret: "",
      setAuthState: (apiUrl: string, clientId: string, clientSecret: string) =>
        set(() => ({
          apiUrl: apiUrl,
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
