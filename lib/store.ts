import { create } from "zustand";

interface UserStore {
  session: string | null;
  setSession: (session: string | null) => void;
}

const useStore = create<UserStore>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));

export default useStore;
