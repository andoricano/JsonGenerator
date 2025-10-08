import React, { createContext, useContext } from "react";
import { appStore } from "./stores/AppStore";
import { mainStore } from "./stores/MainStore";


interface AppStores {
  appStore: typeof appStore;
  mainStore: typeof mainStore; 
}

const AppContext = createContext<AppStores | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppContext.Provider value={{ appStore, mainStore }}>
      {children}
    </AppContext.Provider>
  );
}

export function useStores(): AppStores {
  const context = useContext(AppContext);
  if (!context) throw new Error("useStores must be used within AppProvider");
  return context;
}