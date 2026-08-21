"use client";

/**
 * TopbarMenuContext
 * -----------------
 * Provides the open/close state of the topbar mega-menu to any component
 * in the layout tree (SiteHeader, MainNav, LiveTicker) without prop drilling.
 */

import { createContext, useContext, useState, ReactNode } from "react";

interface TopbarMenuContextValue {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const TopbarMenuContext = createContext<TopbarMenuContextValue>({
  menuOpen: false,
  setMenuOpen: () => {},
});

export function TopbarMenuProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <TopbarMenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </TopbarMenuContext.Provider>
  );
}

export function useTopbarMenu() {
  return useContext(TopbarMenuContext);
}
