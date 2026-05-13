"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getOrCreateUser, type FunnelUser } from "@/lib/auth";

interface UserContextType {
  user: FunnelUser | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FunnelUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small timeout to simulate actual auth check or wait for hydration
    const timeoutId = setTimeout(() => {
      const u = getOrCreateUser();
      setUser(u);
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
