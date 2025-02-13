import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UdyamSessionState {
  sessionTxnId: string;
  setAuthState: (sessionTxnId: string) => void;
}

const useUdyamSessionStore = create<UdyamSessionState>()(
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

export default useUdyamSessionStore;
