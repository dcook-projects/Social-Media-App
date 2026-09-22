import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import type { CompleteUser } from '@/types/Types';


type AuthContextType = {
    user: CompleteUser;
    isLoading: boolean;
}

const INITIAL_USER = {
    id: "",
    username: "",
    email: "",
    bio: "",
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: true,
}

const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CompleteUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

  }, []);

  const value = {
    user: user,
    isLoading: isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useUserContext() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("The context is undefined");
    }

    return context;
}