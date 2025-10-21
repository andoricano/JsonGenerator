import { createContext, useContext, ReactNode } from "react";
import { useStoreLogic } from "./stores/AppStore";

const AppContext = createContext<ReturnType<typeof useStoreLogic> | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const store = useStoreLogic();


  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppStore must be used within AppProvider");
  return context;
}