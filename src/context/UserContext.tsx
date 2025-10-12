import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types/ProfilingTypes';

export type UserContextValue = {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  hasCompletedProfiling: boolean;
  setHasCompletedProfiling: (completed: boolean) => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [hasCompletedProfiling, setHasCompletedProfiling] = useState(false);
  
  return (
    <UserContext.Provider value={{ 
      userProfile, 
      setUserProfile, 
      hasCompletedProfiling, 
      setHasCompletedProfiling 
    }}>
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
