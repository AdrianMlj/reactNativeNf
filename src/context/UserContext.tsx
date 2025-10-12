import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types/ProfilingTypes';

export type UserContextValue = {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within UserProvider');
  }
  return ctx;
};
