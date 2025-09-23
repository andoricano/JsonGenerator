import React, { createContext, useContext } from "react";
import { headerStore, canvasStore, logicStore } from "./stores/HeaderStore";
import { footerStore } from "./stores/FooterStore";


interface AppStores {
  headerStore: typeof headerStore;
  canvasStore: typeof canvasStore;
  logicStore: typeof logicStore;
  footerStore: typeof footerStore; 
}

const AppContext = createContext<AppStores | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppContext.Provider value={{ headerStore, canvasStore, logicStore,footerStore }}>
      {children}
    </AppContext.Provider>
  );
}

export function useStores(): AppStores {
  const context = useContext(AppContext);
  if (!context) throw new Error("useStores must be used within AppProvider");
  return context;
}